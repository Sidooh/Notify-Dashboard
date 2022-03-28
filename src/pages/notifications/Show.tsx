import React from 'react';
import {useParams} from 'react-router-dom';
import {IMAGES} from '../../constants';
import moment from 'moment';
import DestinationChips from '../../components/DestinationChips';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import Master from '../../layouts/Master';
import {SectionLoader} from '../../components/Loader';
import {useNotificationQuery} from '../../features/notifications/notificationsAPI';

const Show = () => {
    const {id} = useParams();

    const {data, error, isLoading, isSuccess} = useNotificationQuery(String(id));

    let hasError;
    if (data) hasError = data && data.status !== "success";

    return (
        <Master error={error}>
            {isLoading && <SectionLoader/>}
            {
                isSuccess && (
                    <>
                        <div className="card mb-3">
                            <div className="bg-holder d-none d-lg-block bg-card"
                                 style={{
                                     backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_4})`,
                                     opacity: 0.7
                                 }}/>
                            <div className="card-body position-relative">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className={'m-0'}>Notification Details: #{data?.id}</h5>
                                    <div className={'text-end'}>
                                        <small>Channel</small>
                                        <h4 className={'m-0'}>{data?.channel.toUpperCase()}</h4>
                                    </div>
                                </div>
                                <p className="fs--1">{moment(data?.created_at)
                                    .format("MMMM Do YYYY, h:mm A")}</p>
                                <div><strong className="me-2">Status: </strong>
                                    <div className={`badge rounded-pill badge-soft-${hasError ? 'danger'
                                        : 'success'} fs--2`}>
                                        {data?.status || 'failed'}
                                        <span className={`fas fa-${hasError ? "xmark" : "check"} ms-1`}
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
                                                <p className="mb-1 fs--1">{data?.provider}</p>
                                                <hr/>
                                                <h5 className="mb-3 fs-0">Destination(s)</h5>
                                                <DestinationChips notification={data!}/>
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
                                                <p className="mb-0 fs--1">{data?.content}</p>
                                            </div>
                                            <div className="col-md-6 mb-4 mb-lg-0">
                                                <h5 className="mb-3 fs-0">Callback</h5>
                                                <JSONPretty id="json-pretty"
                                                            data={data?.notifiable_id?.data ?? {message: 'No callback :('}}
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
        </Master>
    );
};

export default Show;