import React from 'react';
import { IMAGES } from '../../constants';
import { CONFIG } from '../../config';
import useFetch from '../../hooks/useFetch';
import $ from 'jquery';
import _ from 'lodash';
import 'datatables.net';
import Master from '../../layouts/Master';
import CountUp from 'react-countup';
import WeeklyNotifications from './components/WeeklyNotifications';
import RecentNotifications from './components/RecentNotifications';
import { NotificationAdd } from '@mui/icons-material';
import SmsBalances from './components/SmsBalances';

const Default = () => {
    const {data, error} = useFetch(`${CONFIG.sidooh.services.notify.api.url}/dashboard`);

    if (data?.notifications) {
        setTimeout(() => {
            $('#table_id').DataTable({
                retrieve: true,
                columnDefs: [
                    {orderable: false, targets: [0, 5]}
                ],
                lengthMenu: [[10, 20, -1], [10, 20, "All"]]
            });
        }, 500);
    }

    return (
        <Master error={error}>
            <div className="row g-3 mb-3">
                <div className="col-sm-12 col-md-4">
                    <div className="card h-md-100">
                        <div className="bg-holder bg-card"
                             style={{backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_1})`}}/>
                        <div className="card-header pb-0">
                            <h6 className="mb-0 mt-2 d-flex align-items-center">
                                Weekly Notifications
                                <span className="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top"
                                      title="Calculated according to current week's notifications">
                                    <span className="fas fa-info-circle" data-fa-transform="shrink-1"/>
                                </span>
                            </h6>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-end">
                            <div className="row">
                                <div className="col">
                                    <p className="font-sans-serif lh-1 mb-1 fs-4">
                                        <CountUp end={_.sum(data?.weekly_notifications.datasets)}/>
                                    </p>
                                </div>
                                <div className="col-auto ps-0">
                                    <WeeklyNotifications data={data?.weekly_notifications}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4">
                    <div className="card h-md-100">
                        <div className="bg-holder bg-card"
                             style={{backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_4})`}}/>
                        <div className="card-header pb-0">
                            <h6 className="mb-0 mt-2">Total Notifications</h6>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-end">
                            <div className="row justify-content-between">
                                <div className="col-auto align-self-end">
                                    <div className="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
                                        <CountUp end={Number(data?.count_notifications)}/>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <NotificationAdd color={'info'} className={'fs-32'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4">
                    <SmsBalances credits={data?.sms_credits} default_sms_provider={data?.default_sms_provider}/>
                </div>
            </div>
            <div className="row g-3 mb-3">
                <div className="col-xxl-12 col-md-12">
                    <RecentNotifications notifications={data?.notifications}/>
                </div>
            </div>
        </Master>
    );
};

export default Default;
