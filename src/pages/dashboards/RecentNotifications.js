import React from 'react';
import 'datatables.net-bs5';
import {Box, Grid, LinearProgress, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import DestinationChips from '../../components/DestinationChips';
import {Help} from '../../utils/Helpers';
import {Link} from 'react-router-dom';

const RecentNotifications = ({notifications}) => {
    return (
        <div className="card" id="recentPurchaseTable">
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
                                <button className="btn btn-falcon-default btn-sm ms-2" type="button">Apply
                                </button>
                            </div>
                        </div>
                        <div id="table-purchases-replace-element">
                            <button className="btn btn-falcon-default btn-sm" type="button"><span
                                className="fas fa-plus" data-fa-transform="shrink-3 down-2"/><span
                                className="d-none d-sm-inline-block ms-1">New</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body px-0 pt-0">
                <div className="table-responsive scrollbar">
                    <table className="table table-sm fs--1 mb-0 overflow-hidden" id={'table_id'}>
                        <thead className="bg-200 text-900">
                        <tr>
                            <th className="white-space-nowrap">
                                <div className="form-check mb-0 d-flex align-items-center">
                                    <input className="form-check-input" id="checkbox-bulk-purchases-select"
                                           type="checkbox"
                                           data-bulk-select='{"body":"table-purchase-body","actions":"table-purchases-actions","replacedElement":"table-purchases-replace-element"}'/>
                                </div>
                            </th>
                            <th>Provider</th>
                            <th>Destination(s)</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th className="pe-1 align-middle data-table-row-action"/>
                        </tr>
                        </thead>
                        <tbody className="list" id="table-purchase-body">
                        {
                            notifications
                            ? notifications.map(notification => {
                                let date;
                                if (Help.isToday(moment(notification.created_at))) {
                                    date = "Today";
                                } else if (Help.isYesterday(moment(notification.created_at))) {
                                    date = "Yesterday";
                                } else {
                                    date = moment(notification.created_at).format("D.M.y");
                                }

                                return (
                                    <tr key={notification.id} className="btn-reveal-trigger">
                                        <td className="align-middle white-space-nowrap">
                                            <div className="form-check mb-0">
                                                <input className="form-check-input" type="checkbox" id="sa-1"
                                                       data-bulk-select-row="data-bulk-select-row"/>
                                            </div>
                                        </td>
                                        <td>{notification.provider}</td>
                                        <td><DestinationChips notification={notification}/></td>
                                        <td>
                                            <Typography variant={"body2"} title={notification.content} style={{
                                                display: "-webkit-box",
                                                overflow: "hidden",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 2,
                                                cursor: "context-menu",
                                                maxWidth: '35rem',
                                            }}>{notification.content}</Typography>
                                        </td>
                                        <td>
                                            <div style={{textAlign: "end"}}>
                                                {moment(notification.created_at).format("LTS")}<br/>
                                                <Typography variant={"caption"}>{date}</Typography>
                                            </div>
                                        </td>
                                        <td className="align-middle white-space-nowrap text-end">
                                            <div className="dropstart font-sans-serif position-static d-inline-block">
                                                <button
                                                    className="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end"
                                                    type="button" id="dropdown0" data-bs-toggle="dropdown"
                                                    data-boundary="window" aria-haspopup="true"
                                                    aria-expanded="false"
                                                    data-bs-reference="parent"><span
                                                    className="fas fa-ellipsis-h fs--1"/>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end border py-2"
                                                     aria-labelledby="dropdown0">
                                                    <Link to={`/notifications/${notification.id}`} className="dropdown-item" href="#!">View</Link>
                                                    <a className="dropdown-item" href="#!">Edit</a>
                                                    <a className="dropdown-item" href="#!">Refund</a>
                                                    <div className="dropdown-divider"/>
                                                    <a className="dropdown-item text-warning"
                                                       href="#!">Archive</a>
                                                    <a className="dropdown-item text-danger"
                                                       href="#!">Delete</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) :
                            <tr className="btn-reveal-trigger">
                                <td colSpan={6}>
                                    <Grid container alignItems="center" justifyContent="center">
                                        <Grid item width={'70%'}>
                                            <Box sx={{width: '100%'}} className={'py-4'}>
                                                <LinearProgress color={'primary'}/>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </td>
                            </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

RecentNotifications.propTypes = {
    notifications: PropTypes.array
};

export default RecentNotifications;
