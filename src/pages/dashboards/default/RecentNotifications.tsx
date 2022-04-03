import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import DestinationChips from '../../../components/DestinationChips';
import { Link } from 'react-router-dom';
import { NotificationType } from 'helpers/types';
import { ReadMore } from '@mui/icons-material';
import { isToday, isYesterday } from '../../../helpers/utils';
import DataTable from '../../../components/common/datatable';
import { SectionLoader } from '../../../components/Loader';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const RecentNotifications = ({notifications}: { notifications: NotificationType[] }) => {
    return (
        <>
            {
                notifications
                    ? <DataTable title={'Recent Notifications'} columns={[
                        {
                            accessor: 'provider',
                            Header: 'Provider'
                        },
                        {
                            accessor: 'destinations',
                            Header: 'Destination(s)',
                            Cell: (rowData: any) => <DestinationChips notification={rowData.row.original}/>
                        },
                        {
                            accessor: 'message',
                            Header: 'Message',
                            Cell: (rowData: any) => {
                                const {message} = rowData.row.original;
                                return <OverlayTrigger overlay={<Tooltip>{message}</Tooltip>}>
                                    <Typography variant={"body2"} title={message} style={{
                                        display: "-webkit-box",
                                        overflow: "hidden",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                        cursor: "context-menu",
                                        maxWidth: '30rem'
                                    }}>{message}</Typography>
                                </OverlayTrigger>;
                            }
                        },
                        {
                            accessor: 'date',
                            Header: 'Date',
                            Cell: (rowData: any) => {
                                const {created_at} = rowData.row.original;
                                let date;
                                if (isToday(moment(created_at))) {
                                    date = "Today";
                                } else if (isYesterday(moment(created_at))) {
                                    date = "Yesterday";
                                } else {
                                    date = moment(created_at).format("D.M.y");
                                }

                                return <div style={{textAlign: "end"}}>
                                    <strong>{moment(created_at).format("hh:mm A")}</strong><br/>
                                    <Typography variant={"caption"}>{date}</Typography>
                                </div>;
                            }
                        },
                        {
                            accessor: 'actions',
                            disableSortBy: true,
                            Cell: (rowData: any) => {
                                const {id} = rowData.row.original;
                                return <Link to={`/notifications/${id}`}><ReadMore fontSize={'small'}/></Link>;
                            }
                        }
                    ]} data={notifications.map(notification => ({
                        ...notification,
                        message: notification.content,
                    }))}/>
                    : <SectionLoader/>
            }
        </>
    );
};

RecentNotifications.propTypes = {
    notifications: PropTypes.array
};

export default RecentNotifications;