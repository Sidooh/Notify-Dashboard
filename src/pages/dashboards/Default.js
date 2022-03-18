import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import RecentNotifications from './RecentNotifications';
import {useFetch} from '../../hooks';
import CountUp from 'react-countup';
import ErrorPage from '../../components/ErrorPage';
import {CONFIG} from '../../config';
import {NotificationAdd} from '@mui/icons-material';
import WeeklyNotifications from '../../components/charts/WeeklyNotifications';
import WeatherCard from '../../components/WeatherCard';

const Default = () => {
    const {data, error} = useFetch(`${CONFIG.sidooh.services.notify.api.url}/api/dashboard`);

    if (error) return <ErrorPage error={error}/>;

    if (data?.notifications) {
        setTimeout(() => {
            $('#table_id').DataTable({
                retrieve: true,
                columnDefs: [
                    {orderable: false, targets: [0, 5]}
                ],
                lengthMenu: [[7, 10, -1], [7, 10, "All"]]
            });
        }, 500);
    }

    return (
        <>
            <div className="row g-3 mb-3">
                <div className="col-md-6 col-xxl-3">
                    <div className="card h-md-100 ecommerce-card-min-width">
                        <div className="card-header pb-0">
                            <h6 className="mb-0 mt-2 d-flex align-items-center">
                                Weekly Notifications
                                <span className="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top"
                                      title="Calculated according to last week's notifications">
                                    <span className="far fa-question-circle" data-fa-transform="shrink-1"/>
                                </span>
                            </h6>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-end">
                            <div className="row">
                                <div className="col">
                                    <p className="font-sans-serif lh-1 mb-1 fs-4">
                                        <CountUp end={_.sum(data?.weekly_notifications.datasets)}/>
                                    </p>
                                    <span className="badge badge-soft-success rounded-pill fs--2">+3.5%</span>
                                </div>
                                <div className="col-auto ps-0">
                                    <WeeklyNotifications data={data?.weekly_notifications}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xxl-3">
                    <div className="card h-md-100">
                        <div className="card-header pb-0">
                            <h6 className="mb-0 mt-2">Total Notifications</h6>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-end">
                            <div className="row justify-content-between">
                                <div className="col-auto align-self-end">
                                    <div className="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
                                        <CountUp end={Number(data?.count_notifications)}/>
                                    </div>
                                    <span className="badge rounded-pill fs--2 bg-200 text-primary">
                                        <span className="fas fa-caret-up me-1"/>13.6%</span>
                                </div>
                                <div className="col-auto">
                                    <NotificationAdd color={'info'} className={'fs-32'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xxl-3">
                    <div className="card h-md-100">
                        <div className="card-body">
                            <div className="row h-100 justify-content-between g-0">
                                <div className="col-12">
                                    <h6 className="mt-1">SMS Providers Credits</h6>
                                    <div className="mt-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <CountUp end={data?.balances.websms} decimals={2} className={'fs-2'}/>
                                                <div className="d-flex flex-between-center mb-1">
                                                    <div className="d-flex align-items-center fs--2">
                                                        <span
                                                            className={`dot bg-${data?.default_sms_provider === 'websms'
                                                                                 ? 'primary' : '300'}`}/>
                                                        <span className="fw-semi-bold">WEBSMS</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <CountUp end={data?.balances.africastalking} decimals={2}
                                                         className={'fs-2'}/>
                                                <div className="d-flex flex-between-center mb-1">
                                                    <div className="d-flex align-items-center fs--2">
                                                        <span
                                                            className={`dot bg-${data?.default_sms_provider === 'africastalking'
                                                                                 ? 'primary' : '300'}`}/>
                                                        <span className="fw-semi-bold">AFRICASTALKING</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xxl-3">
                    <WeatherCard/>
                </div>
            </div>
            <div className="row g-3 mb-3">
                <div className="col-xxl-12 col-md-12">
                    <RecentNotifications notifications={data?.notifications}/>
                </div>
            </div>
        </>
    );
};

export default Default;
