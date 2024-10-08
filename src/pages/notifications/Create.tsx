import { memo, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import TomSelect from 'tom-select';
import * as yup from 'yup';
import { IMAGES } from 'constants/images';
import { useStoreNotificationMutation } from 'features/notifications/notificationsAPI';
import { useGetAllAccountsQuery, useGetAllUsersQuery } from 'features/accounts/accountsAPI';
import { LoadingButton, toast } from '@nabcellent/sui-react';
import { Notification } from '../../utils/types';
import ValidationErrors from 'components/ValidationErrors';
import { Card, Col, Form, Row } from 'react-bootstrap';
import ReactQuill from "react-quill";
import JSONPretty from "react-json-pretty";
import 'react-quill/dist/quill.bubble.css';
import { FaPaperPlane } from "react-icons/fa6";

type DestinationOptionsType = { value: string, text: string }

const CHANNELS = ['SLACK', 'SMS', 'MAIL', 'APP'];

const EVENT_TYPES = [
    'AIRTIME_PURCHASE', 'AIRTIME_PURCHASE_FAILURE',
    'UTILITY_PAYMENT', 'UTILITY_PAYMENT_FAILURE',
    'VOUCHER_PURCHASE', 'VOUCHER_REFUND',
    'WITHDRAWAL_PAYMENT', 'WITHDRAWAL_FAILURE',
    'REFERRAL_INVITE', 'REFERRAL_JOINED',
    'SUBSCRIPTION_PAYMENT',
    'MERCHANT_PAYMENT',
    'PAYMENT_FAILURE',
    'ERROR_ALERT',
    'STATUS_UPDATE',
    'SP_REQUEST_FAILURE',
    'TEST', 'DEFAULT'
];

const validationSchema = yup.object({
    channel: yup.string().oneOf(CHANNELS).required(),
    event_type: yup.string().oneOf(EVENT_TYPES).required().default('DEFAULT'),
    send_to_all: yup.bool().oneOf([true, false]),
    destination: yup.array().when('channel', {
        is: 'sms',
        then: schema => schema.of(yup.number()),
    }).when('channel', {
        is: 'mail',
        then: schema => schema.of(yup.string().email('Kindly check that all destinations are valid emails!'))
    }).when('send_to_all', {
        is: false,
        then: schema => schema.min(1).ensure()
    }),
    content: yup.string().required('Please provide a message!')
});

const Create = memo(() => {
    const [destinationSelectEl, setDestinationSelectEl] = useState<any>(null);
    const [isTomSelectInstance, setIsTomSelectInstance] = useState(false);
    const [content, setContent] = useState("")
    const [channel, setChannel] = useState("SMS")

    const { data: accounts, isSuccess: accIsSuccess } = useGetAllAccountsQuery();
    const { data: users, isSuccess: usersIsSuccess } = useGetAllUsersQuery();

    const [storeNotification, result] = useStoreNotificationMutation();

    useEffect(() => {
        if (destinationSelectEl) {
            if (!isTomSelectInstance) {
                new TomSelect(destinationSelectEl, {
                    persist: true,
                    create: true,
                    createOnBlur: true,
                    selectOnTab: true,
                    placeholder: 'Select destination...',
                    plugins: { remove_button: { title: 'Remove this destination', } },
                    onInitialize: () => setIsTomSelectInstance(true),
                });
            } else if (accIsSuccess && accounts && destinationSelectEl?.tomselect) {
                const instance = destinationSelectEl.tomselect;

                instance.clear();
                instance.clearOptions();
                instance.addOptions(accounts.map(account => ({ value: account.phone, text: account.phone })));
            }
        }

        if (result.isSuccess) {
            formik.resetForm();

            if (destinationSelectEl) destinationSelectEl.tomselect.clear();

            toast({ titleText: `Notification sent!`, icon: "success" });
        }
    }, [accIsSuccess, accounts, result, destinationSelectEl, isTomSelectInstance]);

    const formik = useFormik<Partial<Notification & { send_to_all: boolean }>>({
        initialValues: {
            channel: "SMS",
            event_type: "DEFAULT",
            destination: [],
            content: "",
            send_to_all: false
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            if (values.send_to_all) {
                values.destination = Object.keys(destinationSelectEl.tomselect.options)
            }

            await storeNotification(values).unwrap();
        },
    });

    const updateDestinations = (channel:string) => {
        const updateDestinationsOptions = (newOptions: DestinationOptionsType[]) => {
            const instance = destinationSelectEl.tomselect;

            instance.clear(true);
            instance.clearOptions();
            instance.addOptions(newOptions);
        };

        if (channel === 'SMS') {
            if (accIsSuccess && accounts) {
                updateDestinationsOptions(accounts.map(account => ({ value: account.phone, text: account.phone })));
            }
        } else {
            if (usersIsSuccess && users) {
                updateDestinationsOptions(users.map(user => ({ value: user.email, text: user.email })));
            }
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className="row g-3 mb-3 justify-content-center">
            {result.isError && <Col md={12}>
                <Row className={'justify-content-center'}>
                    <Col md={10}>
                        <Card><Card.Body><ValidationErrors errors={result.error}/></Card.Body></Card>
                    </Col>
                </Row>
            </Col>}
            <div className="col-md-5 ps-lg-2">
                <div className="card h-lg-100">
                    <div className="bg-holder bg-card"
                         style={{ backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_5})` }}/>
                    <div className="card-body position-relative">
                        <label className="form-label" htmlFor="exampleFormControlInput1">Channel</label>
                        <select className="form-select" name={'channel'} value={formik.values.channel}
                                onChange={(e) => {
                                    formik.setFieldValue("channel", e.target.value, true);

                                    if (destinationSelectEl && isTomSelectInstance) updateDestinations(e.target.value);}
                                }>
                            {CHANNELS.sort().map((channel, i) => (
                                <option key={i} value={String(channel)}>{channel.toUpperCase()}</option>
                            ))}
                        </select>
                        <small
                            className={'text-danger'}>{formik.touched.channel && formik.errors.channel}</small>
                    </div>
                </div>
            </div>
            <div className="col-md-5 ps-lg-2">
                <div className="card h-lg-100">
                    <div className="bg-holder bg-card"
                         style={{ backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_5})` }}/>
                    <div className="card-body position-relative">
                        <label className="form-label" htmlFor="exampleFormControlInput1">Event Type</label>
                        <select className="form-select" value={formik.values.event_type} name={'event_type'}
                                onChange={formik.handleChange}>
                            {EVENT_TYPES.sort()
                                .map((type, i) => <option key={i} value={String(type)}>{type}</option>)}
                        </select>
                        <small
                            className={'text-danger'}>{formik.touched.event_type && formik.errors.event_type}</small>
                    </div>
                </div>
            </div>
            <div className="col-md-10 mb-3 ps-lg-2">
                <div className="card h-lg-100">
                    <div className="bg-holder bg-card"
                         style={{ backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_1})` }}/>
                    <div className="card-body position-relative">
                        <div className="mb-3">
                            <Form.Check type='switch' id='checkedSwitch'
                                        label={(
                                            <span>Send to all <b>{formik.values.channel === 'SMS' ? accounts?.length : users?.length}</b> accounts</span>
                                        )}
                                        name={'send_to_all'} onChange={formik.handleChange}
                                        checked={formik.values.send_to_all}/>
                            <small
                                className={'text-danger'}>{formik.touched.send_to_all && formik.errors.send_to_all}</small>
                        </div>
                        {formik.values.send_to_all && (
                            <JSONPretty id="json-pretty" className={'mb-3'}
                                        data={Object.keys(destinationSelectEl.tomselect.options)}
                                        theme={{
                                            main: 'background-color:rgb(39, 46, 72);max-height:20rem',
                                            key: 'color:red',
                                            string: 'color: rgb(188, 208, 247);',
                                            boolean: 'color:rgb(180, 200, 24);',
                                        }}/>
                        )}
                        <div className={`mb-3 ${formik.values.send_to_all && 'collapse'}`}>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Destination(s)</label>
                            <select className="form-select" multiple ref={el => setDestinationSelectEl(el)} size={1}
                                    name="destination" value={formik.values.destination} onChange={formik.handleChange}/>
                            <small
                                className={'text-danger'}>{formik.touched.destination && formik.errors.destination}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="exampleFormControlInput1">Message</label>
                            <ReactQuill theme="bubble" className={'form-control px-0'}
                                        placeholder={'Compose your notification here...'}
                                        value={content} onChange={(value, delta, source, editor) => {
                                setContent(value)

                                formik.setFieldValue("content", editor.getText())
                            }}/>
                            <small className={'text-danger'}>{formik.touched.content && formik.errors.content}</small>
                        </div>

                        <div className="text-end">
                            <LoadingButton type={'submit'} size="sm" loading={result.isLoading} loadingPosition="end"
                                           onClick={() => formik.submitForm()} disabled={!formik.dirty}
                                           endIcon={<FaPaperPlane/>}>Send</LoadingButton>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export default Create;