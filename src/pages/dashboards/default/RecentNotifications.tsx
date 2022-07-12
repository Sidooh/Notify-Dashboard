import { memo } from 'react';
import { Typography } from '@mui/material';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationType } from 'utils/types';
import { ReadMore } from '@mui/icons-material';
import { isToday, isYesterday } from 'utils/helpers';
import DataTable from '../../../components/common/datatable';
import { SectionLoader } from '../../../components/Loader';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Destination from '../../notifications/Destination';

const RecentNotifications = ({notifications}: { notifications: NotificationType[] }) => {
    const navigate = useNavigate();

    return (
        <Card>
            <Card.Body>
                {
                    notifications
                        ? <DataTable onCreateRow={() => navigate('/notifications/create')}
                                     title={'Recent Notifications'} columns={[
                            {
                                accessorKey: 'destination',
                                header: 'Destination',
                                cell: (rowData: any) => <Destination notification={rowData.row.original}/>
                            },
                            {
                                accessorKey: 'message',
                                header: 'Message',
                                cell: (rowData: any) => {
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
                                accessorKey: 'date',
                                header: 'Date',
                                cell: (rowData: any) => {
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
                                accessorKey: 'actions',
                                enableSorting: false,
                                cell: (rowData: any) => {
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
            </Card.Body>
        </Card>
    );
};

export default memo(RecentNotifications);