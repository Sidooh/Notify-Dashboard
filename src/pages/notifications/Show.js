import React from 'react';
import {useParams} from 'react-router-dom';
import {IMAGES} from '../../constants';
import moment from 'moment';
import PageLoader from '../../components/PageLoader';
import DestinationChips from '../../components/DestinationChips';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import {useFetch} from '../../hooks';
import ErrorPage from '../../components/ErrorPage';

const Show = () => {
    const {id} = useParams();
    let {data: notification, loading, error} = useFetch(`https://hoodis-notify.herokuapp.com/api/notifications/${id}`);

    if (error) return <ErrorPage/>;

    let hasError;
    if (notification) {
        hasError = notification.channel === "sms" && notification.notifiable_id
                   ? notification.notifiable_id.data.some(recipient => recipient.status !== "success")
                   : notification.status !== "success";
    }

    return (
        <>
            {
                loading
                ? <PageLoader/> : (
                    <>
                        <div className="card mb-3">
                            <div className="bg-holder d-none d-lg-block bg-card"
                                 style={{
                                     backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_4})`,
                                     opacity: 0.7
                                 }}/>
                            <div className="card-body position-relative">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className={'m-0'}>Notification Details: #{notification.id}</h5>
                                    <div className={'text-end'}>
                                        <small>Channel</small>
                                        <h4 className={'m-0'}>{notification.channel.toUpperCase()}</h4>
                                    </div>
                                </div>
                                <p className="fs--1">{moment(notification.created_at)
                                    .format("MMMM Do YYYY, h:mm A")}</p>
                                <div><strong className="me-2">Status: </strong>
                                    <div className={`badge rounded-pill badge-soft-${hasError ? 'danger'
                                                                                              : 'success'} fs--2`}>
                                        {notification.status}<span className="fas fa-check ms-1"
                                                                   data-fa-transform="shrink-2"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-lg-4">
                                <div className="card h-lg-100 mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 mb-4 mb-lg-0">
                                                <h5 className="mb-3 fs-0">Provider</h5>
                                                <p className="mb-1 fs--1">{notification.provider}</p>
                                                <hr/>
                                                <h5 className="mb-3 fs-0">Destination(s)</h5>
                                                <DestinationChips notification={notification}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card h-lg-100 mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 mb-4 mb-lg-0">
                                                <h5 className="mb-3 fs-0">Message</h5>
                                                <p className="mb-0 fs--1">{notification.content}</p>
                                            </div>
                                            <div className="col-md-6 mb-4 mb-lg-0">
                                                <h5 className="mb-3 fs-0">Callback</h5>
                                                <JSONPretty id="json-pretty" data={notification.notifiable_id.data}
                                                            theme={{
                                                                main: 'background-color:rgb(39, 46, 72);max-height:20rem',
                                                                key: 'color:red',
                                                                string: 'color: rgb(188, 208, 247);',
                                                                boolean: 'color:rgb(180, 200, 24);',
                                                            }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Show;
