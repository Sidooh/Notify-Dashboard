import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { IMAGES } from 'constants/images';
import moment from 'moment';
import { useNotificationQuery } from 'features/notifications/notificationsAPI';
import { PrettyJSON, SectionError, SectionLoader, Status } from '@nabcellent/sui-react';


const Show = () => {
    const {id} = useParams();

    const {data: notification, error, isLoading, isSuccess, isError} = useNotificationQuery(String(id));

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notification) return <SectionLoader/>;

    let hasError = notification.status !== Status.COMPLETED;

    console.log(notification);

    let destinationIcon;

    if (notification.channel === "MAIL") {
        destinationIcon = "far fa-paper-plane";
    } else if (notification.channel === "SMS") {
        destinationIcon = "fas fa-paper-plane";
    } else {
        destinationIcon = "fab fa-slack";
    }

    return (
        <>
            <div className="card mb-3">
                <div className="bg-holder d-none d-lg-block bg-card"
                     style={{
                         backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_4})`,
                         opacity: 0.7
                     }}/>
                <div className="card-body position-relative">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className={'m-0'}>Notification Details: #{notification?.id}</h5>
                        <div className={'text-end'}>
                            <small>Channel</small>
                            <h4 className={'m-0'}>{notification?.channel.toUpperCase()}</h4>
                        </div>
                    </div>
                    <p className="fs--1">{moment(notification?.created_at)
                        .format("MMMM Do YYYY, h:mm A")}</p>
                    <div><strong className="me-2">Status: </strong>
                        <div className={`badge rounded-pill badge-soft-${hasError ? 'danger'
                            : 'success'} fs--2`}>
                            {notification?.status || 'failed'}
                            <span className={`fas fa-${hasError ? "xmark" : "check"} ms-1`}
                                  data-fa-transform="shrink-2"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-lg-7">
                    <div className="card h-lg-100 mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6 mb-4">
                                    <h5 className="mb-3 fs-0">Destination</h5>
                                    <b><i className={destinationIcon}/> {notification.destination}</b>
                                </div>
                                <div className="col-6 mb-4">
                                    <h5 className="mb-3 fs-0">Event Type</h5>
                                    <p className="mb-0 fs--1">{notification.event_type}</p>
                                </div>

                                <div className="col-12 mb-4">
                                    <hr/>
                                    <h5 className="mb-3 fs-0">Message</h5>
                                    <p className="mb-0 fs--1">{notification.content}</p>
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
                                    {
                                        notification.notifiables?.length ? notification.notifiables.map((cb: any, i: number) => {
                                            return (
                                                <div key={`cb-${i}`}>
                                                    <PrettyJSON id="json-pretty" data={cb} theme={{
                                                        main: 'background-color:rgb(39, 46, 72);max-height:20rem',
                                                        key: 'color:red',
                                                        string: 'color: rgb(188, 208, 247);',
                                                        boolean: 'color:rgb(180, 200, 24);',
                                                    }}/>
                                                </div>
                                            );
                                        }) : <PrettyJSON id="json-pretty" data={{message: 'No callback :('}}
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
        </>
    );
};

export default memo(Show);