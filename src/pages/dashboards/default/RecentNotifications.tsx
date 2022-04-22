import { memo } from 'react';
import { Typography } from '@mui/material';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationType } from 'helpers/types';
import { ReadMore } from '@mui/icons-material';
import { isToday, isYesterday } from '../../../helpers/utils';
import DataTable from '../../../components/common/datatable';
import { SectionLoader } from '../../../components/Loader';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Destination from '../../notifications/Destination';

const RecentNotifications = ({notifications}: { notifications: NotificationType[] }) => {
    const navigate = useNavigate();

    return (
        <>
            {
                notifications
                    ? <DataTable bulkActions onCreateRow={() => navigate('/notifications/create')}
                                 title={'Recent Notifications'} columns={[
                        {
                            accessor: 'destination',
                            Header: 'Destination',
                            Cell: (rowData: any) => <Destination notification={rowData.row.original}/>
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

export default memo(RecentNotifications);