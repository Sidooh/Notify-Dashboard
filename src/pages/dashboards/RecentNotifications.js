import React from 'react';
import {Typography} from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import DestinationChips from '../../components/DestinationChips';

const RecentNotifications = ({notifications}) => {
    return (
        <div className="col-xxl-9 col-md-12">
            <div className="card z-index-1" id="recentPurchaseTable"
                 data-list='{"valueNames":["name","email","product","payment","amount"],"page":7,"pagination":true}'>
                <div className="card-header">
                    <div className="row flex-between-center">
                        <div className="col-6 col-sm-auto d-flex align-items-center pe-0">
                            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Recent Notifications </h5>
                        </div>
                        <div className="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div className="d-none" id="table-purchases-actions">
                                <div className="d-flex">
                                    <select className="form-select form-select-sm" aria-label="Bulk actions">
                                        <option>Bulk actions</option>
                                        <option value="Refund">Refund</option>
                                        <option value="Delete">Delete</option>
                                        <option value="Archive">Archive</option>
                                    </select>
                                    <button className="btn btn-falcon-default btn-sm ms-2" type="button">Apply</button>
                                </div>
                            </div>
                            <div id="table-purchases-replace-element">
                                <button className="btn btn-falcon-default btn-sm" type="button"><span
                                    className="fas fa-plus" data-fa-transform="shrink-3 down-2"/><span
                                    className="d-none d-sm-inline-block ms-1">New</span></button>
                                <button className="btn btn-falcon-default btn-sm mx-2" type="button"><span
                                    className="fas fa-filter" data-fa-transform="shrink-3 down-2"/><span
                                    className="d-none d-sm-inline-block ms-1">Filter</span></button>
                                <button className="btn btn-falcon-default btn-sm" type="button">
                                    <span className="fas fa-external-link-alt"
                                          data-fa-transform="shrink-3 down-2"/><span
                                    className="d-none d-sm-inline-block ms-1">Export</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body px-0 py-0">
                    <div className="table-responsive scrollbar">
                        <table className="table table-sm fs--1 mb-0 overflow-hidden">
                            <thead className="bg-200 text-900">
                            <tr>
                                <th className="white-space-nowrap">
                                    <div className="form-check mb-0 d-flex align-items-center"><input
                                        className="form-check-input" id="checkbox-bulk-purchases-select" type="checkbox"
                                        data-bulk-select='{"body":"table-purchase-body","actions":"table-purchases-actions","replacedElement":"table-purchases-replace-element"}'/>
                                    </div>
                                </th>
                                <th className="sort pe-1 align-middle white-space-nowrap" data-sort="name">Provider</th>
                                <th className="sort pe-1 align-middle white-space-nowrap"
                                    data-sort="email">Destination(s)
                                </th>
                                <th className="sort pe-1 align-middle white-space-nowrap" data-sort="product">Message
                                </th>
                                <th className="sort pe-1 align-middle white-space-nowrap text-center"
                                    data-sort="payment">Date
                                </th>
                                <th className="no-sort pe-1 align-middle data-table-row-action"/>
                            </tr>
                            </thead>
                            <tbody className="list" id="table-purchase-body">
                            {
                                notifications.length
                                ? notifications.map(notification => {
                                    return (
                                        <tr key={notification.id} className="btn-reveal-trigger">
                                            <td className="align-middle" style={{width: '28px'}}>
                                                <div className="form-check mb-0">
                                                    <input className="form-check-input" type="checkbox"
                                                           id="recent-purchase-0"
                                                           data-bulk-select-row="data-bulk-select-row"/>
                                                </div>
                                            </td>
                                            <th className="align-middle white-space-nowrap name"><a
                                                href="../app/e-commerce/customer-details.html">{notification.provider}</a>
                                            </th>
                                            <td className="align-middle white-space-nowrap email">
                                                <DestinationChips notification={notification}/>
                                            </td>
                                            <td className="align-middle product">
                                                <Typography variant={"body2"} title={notification.content} style={{
                                                    display: "-webkit-box",
                                                    overflow: "hidden",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 2,
                                                    cursor: "context-menu"
                                                }}>{notification.content}</Typography>
                                            </td>
                                            <td className="align-middle text-center fs-0 white-space-nowrap payment">
                                                <div style={{textAlign: "end"}}>
                                                    {moment(notification.created_at).format("LTS")}<br/>
                                                    <Typography variant={"caption"}>Today</Typography>
                                                </div>
                                            </td>
                                            <td className="align-middle white-space-nowrap text-end">
                                                <div
                                                    className="dropstart font-sans-serif position-static d-inline-block">
                                                    <button
                                                        className="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end"
                                                        type="button" id="dropdown0" data-bs-toggle="dropdown"
                                                        data-boundary="window" aria-haspopup="true"
                                                        aria-expanded="false"
                                                        data-bs-reference="parent"><span
                                                        className="fas fa-ellipsis-h fs--1"/>
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-end border py-2"
                                                         aria-labelledby="dropdown0"><a className="dropdown-item"
                                                                                        href="#!">View</a><a
                                                        className="dropdown-item" href="#!">Edit</a><a
                                                        className="dropdown-item"
                                                        href="#!">Refund</a>
                                                        <div className="dropdown-divider"/>
                                                        <a className="dropdown-item text-warning"
                                                           href="#!">Archive</a><a
                                                            className="dropdown-item text-danger" href="#!">Delete</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }) :
                                <tr className="btn-reveal-trigger">
                                    <td colSpan={6} className={'text-center'}>No Data</td>
                                </tr>
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row align-items-center">
                        <div className="pagination d-none"/>
                        <div className="col">
                            <p className="mb-0 fs--1"><span className="d-none d-sm-inline-block me-2"
                                                            data-list-info="data-list-info"> </span></p>
                        </div>
                        <div className="col-auto d-flex">
                            <button className="btn btn-sm btn-primary" type="button" data-list-pagination="prev">
                                <span>Previous</span></button>
                            <button className="btn btn-sm btn-primary px-4 ms-2" type="button"
                                    data-list-pagination="next"><span>Next</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

RecentNotifications.propTypes = {
    notifications: PropTypes.array
};

export default RecentNotifications;
