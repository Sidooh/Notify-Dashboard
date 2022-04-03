import { Telegram } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import TomSelect from 'tom-select';
import * as yup from 'yup';
import AlertError from '../../components/AlertError';
import { IMAGES } from '../../constants';
import { useStoreNotificationMutation } from '../../features/notifications/notificationsAPI';
import { useGetAllAccountsQuery, useGetAllUsersQuery } from '../../app/services/accountsAPI';
import { toast } from '../../helpers/utils';
import sortBy from 'lodash.sortby';

type DestinationOptionsType = { value: string, text: string }

const CHANNELS = ['slack', 'sms', 'mail', 'app'];

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
    destination: yup.array().min(1).ensure().when('channel', {
        is: 'sms',
        then: schema => schema.of(yup.number()),
    }).when('channel', {
        is: 'mail',
        then: schema => schema.of(yup.string().email('Kindly check that destinations are valid emails!'))
    }).required(),
    content: yup.string().required('Please provide a message!')
});

const Create = () => {
    const [destinationSelectEl, setDestinationSelectEl] = useState<any>(null);
    const [isTomSelectInstance, setIsTomSelectInstance] = useState(false);

    const {data: accounts, isSuccess: accIsSuccess} = useGetAllAccountsQuery();
    const {data: users, isSuccess: usersIsSuccess} = useGetAllUsersQuery();

    const [storeNotification, result] = useStoreNotificationMutation();

    useEffect(() => {
        if (destinationSelectEl) {
            if (!isTomSelectInstance) {
                new TomSelect(destinationSelectEl, {
                    options: [
                        {value: '254714611696', text: '254714611696'},
                        {value: '254780611696', text: '254780611696'},
                        {value: '254711414987', text: '254711414987'},
                        {value: '254733643843', text: '254733643843'},
                        {value: '254721309253', text: '254721309253'},
                        {value: '254110039317', text: '254110039317'},
                        {value: '254736388405', text: '254736388405'},
                    ],
                    persist: true,
                    create: true,
                    createOnBlur: true,
                    selectOnTab: true,
                    placeholder: 'Select destination...',
                    plugins: {remove_button: {title: 'Remove this destination',}},
                    onInitialize: () => setIsTomSelectInstance(true),
                });
            } else if (accIsSuccess && accounts) {
                const instance = destinationSelectEl.tomselect;

                instance.clear();
                instance.clearOptions();
                instance.addOptions(accounts.map(account => ({value: account.phone, text: account.phone})));
            }
        }
    }, [accIsSuccess, accounts, destinationSelectEl, isTomSelectInstance]);

    const formik = useFormik({
        initialValues: {
            channel: "sms",
            event_type: "DEFAULT",
            destination: [],
            content: "",
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            const notification = await storeNotification(values).unwrap();

            if (result.isSuccess) {
                formik.resetForm();

                if (destinationSelectEl) destinationSelectEl.tomselect.clear();

                toast({msg: `${notification.channel.toUpperCase()} notification sent!`, type: "success"});
            }
        },
    });

    const updateDestinations = () => {
        const updateDestinationsOptions = (newOptions: DestinationOptionsType[]) => {
            const instance = destinationSelectEl.tomselect;

            instance.clear();
            instance.clearOptions();
            instance.addOptions(newOptions);
        };

        if (formik.values.channel === 'sms') {
            if (accIsSuccess && accounts) {
                updateDestinationsOptions(accounts.map(account => ({value: account.phone, text: account.phone})));
            }
        } else {
            if (usersIsSuccess && users) {
                updateDestinationsOptions(users.map(user => ({value: user.email, text: user.email})));
            }
        }
    };

    const handleChannelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        formik.setFieldValue("channel", e.target.value, true);

        if (destinationSelectEl && isTomSelectInstance) updateDestinations();
    };

    return (
        <form onSubmit={formik.handleSubmit} className="row g-3 mb-3 justify-content-center">

            {result.isError && <AlertError error={result.error}/>}

            <div className="col-md-5 ps-lg-2">
                <div className="card h-lg-100">
                    <div className="bg-holder bg-card"
                         style={{backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_5})`}}/>
                    <div className="card-body position-relative">
                        <label className="form-label" htmlFor="exampleFormControlInput1">Channel</label>
                        <select className="form-select" name={'channel'} value={formik.values.channel}
                                onChange={handleChannelChange}>
                            {sortBy(CHANNELS).map((channel, i) => (
                                <option key={i} value={String(channel)}>{channel.toUpperCase()}</option>)
                            )}
                        </select>
                        <small
                            className={'text-danger'}>{formik.touched.channel && formik.errors.channel}</small>
                    </div>
                </div>
            </div>
            <div className="col-md-5 ps-lg-2">
                <div className="card h-lg-100">
                    <div className="bg-holder bg-card"
                         style={{backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_5})`}}/>
                    <div className="card-body position-relative">
                        <label className="form-label" htmlFor="exampleFormControlInput1">Event Type</label>
                        <select className="form-select" value={formik.values.event_type} name={'event_type'}
                                onChange={formik.handleChange}>
                            {sortBy(EVENT_TYPES)
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
                         style={{backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_1})`}}/>
                    <div className="card-body position-relative">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="exampleFormControlInput1">Destination(s)</label>
                            <select className="form-select" multiple ref={el => setDestinationSelectEl(el)}
                                    size={1} name="destination"
                                    value={formik.values.destination} onChange={formik.handleChange}/>
                            <small
                                className={'text-danger'}>{formik.touched.destination && formik.errors.destination}</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="exampleFormControlInput1">Message</label>
                            <textarea className={'form-control'} name="content" id="content" cols={30}
                                      rows={10}
                                      value={formik.values.content} placeholder={'Compose your message...'}
                                      onChange={formik.handleChange}/>
                            <small
                                className={'text-danger'}>{formik.touched.content && formik.errors.content}</small>
                        </div>

                        <div className="text-end">
                            <LoadingButton size="small" color="primary" loading={result.isLoading}
                                           loadingPosition="end"
                                           onClick={() => formik.submitForm()}
                                           endIcon={<Telegram/>} variant="contained">Send</LoadingButton>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default memo(Create);