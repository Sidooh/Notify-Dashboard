import { Fragment, memo } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
    useCheckNotificationMutation,
    useNotificationQuery,
    useRetryNotificationMutation
} from 'features/notifications/notificationsAPI';
import { PhoneChip, SectionError, SectionLoader, Status, StatusChip, Sweet, toast } from '@nabcellent/sui-react';
import CardBgCorner from 'components/CardBgCorner';
import { Col, Dropdown, Row } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';
import { logger } from 'utils/logger';
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { FaCrosshairs } from "react-icons/fa6";

const Show = () => {
    const { id } = useParams();

    const { data: notification, error, isLoading, isSuccess, isError } = useNotificationQuery(String(id));
    const [retryNotification, result] = useRetryNotificationMutation();
    const [checkNotification] = useCheckNotificationMutation();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notification) return <SectionLoader/>;

    logger.log(notification);

    let destinationIcon, destination: any = notification.destination;
    if (notification.channel === "MAIL") {
        destinationIcon = "far fa-envelope";
        destination = <a href={`mailto:${destination}`}>{destination}</a>
    } else if (notification.channel === "SMS") {
        destinationIcon = "fas fa-comment-sms";
        destination = <PhoneChip phone={destination}/>
    } else {
        destinationIcon = "fab fa-slack";
    }

    const queryNotification = async (action: 'retry' | 'check-notification') => {
        let options: any = {
            backdrop: `rgba(0, 0, 150, 0.4)`,
            showLoaderOnConfirm: true,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            allowOutsideClick: () => !Sweet.isLoading()
        };

        const queryError = (res: any, titleText: string) => toast({
            titleText,
            text: res?.error?.data?.message || res?.error.error,
            icon: 'error',
            timer: 7
        });

        if (action === 'retry') {
            options.title = 'Retry Transaction';
            options.text = 'Are you sure you want to retry this transaction?';
            options.preConfirm = async () => {
                const res = await retryNotification(notification.id) as any;

                if (res?.data?.id) toast({ titleText: 'Retry Successful!', icon: 'success' });
                if (res?.error) await queryError(res, 'Retry Error');
            };
        }
        if (action === 'check-notification') {
            options.title = 'Check Notification';

            if (notification?.id) {
                options.text = 'Are you sure you want to check this notification?';
            } else {
                options.input = 'number';
                options.inputAttributes = { placeholder: 'Notification ID' };
            }

            options.preConfirm = async () => {
                const res = await checkNotification(notification.id) as any;

                if (res?.data?.id) toast({ titleText: 'Check Notification Complete!', icon: 'success' });
                if (res?.error) await queryError(res, 'Check Notification Error!');
            };
        }

        await Sweet.fire(options);
    };

    const notificationDropdownItems = [];
    if (notification.status === Status.FAILED) {
        notificationDropdownItems.push(
            <Dropdown.Item as="button" onClick={() => queryNotification('retry')}>
                <GrRotateRight size={17}/>&nbsp; Retry
            </Dropdown.Item>
        );
    }

    if (notification.status === Status.PENDING) {
        notificationDropdownItems.push(
            <Dropdown.Item as="button" onClick={() => queryNotification('check-notification')}>
                <GrRotateLeft/>&nbsp; Check Notification
            </Dropdown.Item>
        );
    }

    return (
        <>
            <div className="card mb-3">
                <CardBgCorner corner={4}/>
                <Row className="card-body position-relative">
                    <Col className="d-flex flex-column justify-content-between">
                        <h5 className={'m-0'}>Notification Details: #{notification?.id}</h5>
                        <p className="fs--1">{moment(notification?.created_at).format("MMMM Do YYYY, h:mm A")}</p>
                        <div className="d-flex align-items-center justify-content-between">
                            <StatusChip status={notification?.status}/>
                        </div>
                    </Col>
                    <Col className={'text-end'}>
                        <small>Channel</small>
                        <h4>
                            <i className={destinationIcon}/> {notification?.channel.toUpperCase()}
                        </h4>

                        {notificationDropdownItems.length > 0 && (
                            <Dropdown>
                                <Dropdown.Toggle size={'sm'} as={'a'} className={'cursor-pointer'}>
                                    <FaCrosshairs className={'btn btn-danger p-1 rounded-circle'}/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {notificationDropdownItems.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Col>
                </Row>
            </div>
            <div className="row g-3">
                <div className="col-lg-7">
                    <div className="card h-lg-100 mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6 mb-4">
                                    <h5 className="mb-3 fs-0">Destination</h5>
                                    <b>{destination}</b>
                                </div>
                                <div className="col-6 mb-4">
                                    <h5 className="mb-3 fs-0">Event Type</h5>
                                    <p className="mb-0 fs--1">{notification.event_type}</p>
                                </div>

                                <div className="col-12 mb-4">
                                    <hr/>
                                    <h5 className="mb-3 fs-0">Message</h5>
                                    <p className="mb-0 fs--1" style={{ whiteSpace: 'pre-line' }}>
                                        {notification.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="card h-lg-100 mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 mb-4 mb-lg-0">
                                    <h5 className="mb-3 fs-0">Callbacks</h5>
                                    <div style={{ maxHeight: '25rem', overflowY: 'auto' }}>
                                        {notification.notifiables?.length ? notification.notifiables.map((cb: any, i: number) => (
                                            <div key={`cb-${i}`}>
                                                <JSONPretty id="json-pretty" data={cb} theme={{
                                                    main: 'background-color:rgb(39, 46, 72);max-height:20rem',
                                                    key: 'color:red',
                                                    string: 'color: rgb(188, 208, 247);',
                                                    boolean: 'color:rgb(180, 200, 24);',
                                                }}/>
                                            </div>
                                        )) : <JSONPretty id="json-pretty" data={{ message: 'No callback :(' }}
                                                         theme={{
                                                             main: 'background-color:rgb(39, 46, 72);max-height:20rem',
                                                             key: 'color:red',
                                                             string: 'color: rgb(188, 208, 247);',
                                                             boolean: 'color:rgb(180, 200, 24);',
                                                         }}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Show);