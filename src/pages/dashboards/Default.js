import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import axios from 'axios';
import {IMAGES} from '../../constants';
import RecentNotifications from './RecentNotifications';

const Default = () => {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = () => {
        axios.get('https://hoodis-notify.herokuapp.com/api/dashboard')
             .then(({data}) => {
                 setNotifications(data.notifications);
                 setTimeout(() => {
                     $('#table_id').DataTable({
                         columnDefs: [
                             {orderable: false, targets: [0, 5]}
                         ],
                         lengthMenu: [[7, 10, -1], [7, 10, "All"]]
                     });
                 }, 500);
             }).catch(err => console.log(err));
    };

    return (
        <>
            <div className="row g-3 mb-3">
                <div className="col-md-6 col-xxl-3">
                    <div className="card h-md-100 ecommerce-card-min-width">
                        <div className="card-header pb-0">
                            <h6 className="mb-0 mt-2 d-flex align-items-center">
                                Weekly Sales
                                <span className="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top"
                                      title="Calculated according to last week's sales">
                                    <span className="far fa-question-circle" data-fa-transform="shrink-1"/>
                                </span>
                            </h6>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-end">
                            <div className="row">
                                <div className="col">
                                    <p className="font-sans-serif lh-1 mb-1 fs-4">$47K</p><span
                                    className="badge badge-soft-success rounded-pill fs--2">+3.5%</span>
                                </div>
                                <div className="col-auto ps-0">
                                    <div className="echart-bar-weekly-sales h-100"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xxl-3">
                    <div className="card h-md-100">
                        <div className="card-header pb-0">
                            <h6 className="mb-0 mt-2">Total Order</h6>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-end">
                            <div className="row justify-content-between">
                                <div className="col-auto align-self-end">
                                    <div className="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">58.4K</div>
                                    <span className="badge rounded-pill fs--2 bg-200 text-primary">
                                        <span className="fas fa-caret-up me-1"/>13.6%</span>
                                </div>
                                <div className="col-auto ps-0 mt-n4">
                                    <div className="echart-default-total-order"
                                         data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 4","Week 5","Week 6","Week 7"]},"series":[{"type":"line","data":[20,40,100,120],"smooth":true,"lineStyle":{"width":3}}],"grid":{"bottom":"2%","top":"2%","right":"10px","left":"10px"}}'
                                         data-echart-responsive="true"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xxl-3">
                    <div className="card h-md-100">
                        <div className="card-body">
                            <div className="row h-100 justify-content-between g-0">
                                <div className="col-5 col-sm-6 col-xxl pe-2">
                                    <h6 className="mt-1">Market Share</h6>
                                    <div className="fs--2 mt-3">
                                        <div className="d-flex flex-between-center mb-1">
                                            <div className="d-flex align-items-center">
                                                <span className="dot bg-primary"/>
                                                <span className="fw-semi-bold">Samsung</span>
                                            </div>
                                            <div className="d-xxl-none">33%</div>
                                        </div>
                                        <div className="d-flex flex-between-center mb-1">
                                            <div className="d-flex align-items-center">
                                                <span className="dot bg-info"/>
                                                <span className="fw-semi-bold">Huawei</span>
                                            </div>
                                            <div className="d-xxl-none">29%</div>
                                        </div>
                                        <div className="d-flex flex-between-center mb-1">
                                            <div className="d-flex align-items-center">
                                                <span className="dot bg-300"/>
                                                <span className="fw-semi-bold">Apple</span>
                                            </div>
                                            <div className="d-xxl-none">20%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto position-relative">
                                    <div className="echart-market-share"/>
                                    <div
                                        className="position-absolute top-50 start-50 translate-middle text-dark fs-2">26M
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xxl-3">
                    <div className="card h-md-100">
                        <div className="card-header d-flex flex-between-center pb-0">
                            <h6 className="mb-0">Weather</h6>
                            <div className="dropdown font-sans-serif btn-reveal-trigger">
                                <button
                                    className="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                                    type="button" id="dropdown-weather-update" data-bs-toggle="dropdown"
                                    data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
                                    <span className="fas fa-ellipsis-h fs--2"/>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end border py-2"
                                     aria-labelledby="dropdown-weather-update">
                                    <a className="dropdown-item" href="#!">View</a>
                                    <a className="dropdown-item" href="#!">Export</a>
                                    <div className="dropdown-divider"/>
                                    <a className="dropdown-item text-danger" href="#!">Remove</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-2">
                            <div className="row g-0 h-100 align-items-center">
                                <div className="col">
                                    <div className="d-flex align-items-center">
                                        <img className="me-3" src={IMAGES.icons.weather_icon} alt="" height="60"/>
                                        <div>
                                            <h6 className="mb-2">New York City</h6>
                                            <div className="fs--2 fw-semi-bold">
                                                <div className="text-warning">Sunny</div>
                                                Precipitation: 50%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto text-center ps-2">
                                    <div className="fs-4 fw-normal font-sans-serif text-primary mb-1 lh-1">31&deg;</div>
                                    <div className="fs--1 text-800">32&deg; / 25&deg;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-3 mb-3">
                <div className="col-xxl-12 col-md-12">
                    <RecentNotifications notifications={notifications}/>
                </div>
            </div>
        </>
    );
};

export default Default;
