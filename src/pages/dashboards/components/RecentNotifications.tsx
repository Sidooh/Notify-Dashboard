import React from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import DestinationChips from '../../../components/DestinationChips';
import { Helpers } from '../../../utils/helpers';
import { Link } from 'react-router-dom';
import TableToolbar from '../../../components/TableToolbar';
import { NotificationType } from '../../../utils/types';
import { Dropdown } from 'react-bootstrap';
import { DeleteOutline, ReadMore } from '@mui/icons-material';


const RecentNotifications = ({notifications}: { notifications: NotificationType[] }) => {
    return (
        <div className="card" id="recentPurchaseTable">
            <TableToolbar title={'Recent Notifications'} actionsId={'table-notification-actions'} toolbarIcons={[
                <button className="btn btn-falcon-default btn-sm" type="button">
                    <span className="fas fa-plus" data-fa-transform="shrink-3 down-2"/>
                    <span className="d-none d-sm-inline-block ms-1">New</span>
                </button>
            ]}/>
            <div className="card-body px-0 pt-0">
                <div className="table-responsive scrollbar">
                    <table className="table table-sm fs--1 mb-0 overflow-hidden" id={'table_id'}>
                        <thead className="bg-200 text-900">
                        <tr>
                            <th className="white-space-nowrap">
                                <div className="form-check mb-0 d-flex align-items-center">
                                    <input className="form-check-input" id="checkbox-bulk-purchases-select"
                                           type="checkbox"
                                           data-bulk-select='{"body":"table-purchase-body","actions":"table-notification-actions","replacedElement":"table-purchases-replace-element"}'/>
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
                                    if (Helpers.isToday(moment(notification.created_at))) {
                                        date = "Today";
                                    } else if (Helpers.isYesterday(moment(notification.created_at))) {
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
                                                <Dropdown>
                                                    <Dropdown.Toggle size={'sm'} variant={'link'}
                                                                     className={'text-600 btn-reveal float-end'}>
                                                        <span className="fas fa-ellipsis-h fs--1"/>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item as={Link}
                                                                       to={`/notifications/${notification.id}`}>
                                                            <ReadMore fontSize={'small'} className={'me-2'}/>View
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className={'text-danger'}>
                                                            <DeleteOutline fontSize={'small'} className={'me-2'}/>
                                                            Delete
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
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