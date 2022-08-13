import { Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { ReadMore } from '@mui/icons-material';
import { isToday, isYesterday } from 'utils/helpers';
import { Card } from 'react-bootstrap';
import Destination from '../../notifications/Destination';
import { ComponentLoader, DataTable, SectionError } from '@nabcellent/sui-react';
import { useGetRecentNotificationsQuery } from 'features/dashboard/dashboardApi';

const RecentNotifications = () => {
    const navigate = useNavigate();

    let {data: notifications, isLoading, isSuccess, isError, error} = useGetRecentNotificationsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <ComponentLoader/>;

    console.log(notifications);

    if (!notifications) return <ComponentLoader/>;

    return (
        <Card>
            <Card.Body>
                <DataTable onCreateRow={() => navigate('/notifications/create')}
                           title={'Recent Notifications'} columns={[
                    {
                        accessorKey: 'destination',
                        header: 'Destination',
                        cell: ({row}: any) => <Destination notification={row.original}/>
                    },
                    {
                        accessorKey: 'content',
                        header: 'Message',
                        cell: ({row}: any) => {
                            return (
                                <Tooltip title={row.original.content}>
                                    <Typography variant={"body2"} style={{
                                        display: "-webkit-box",
                                        overflow: "hidden",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                        cursor: "context-menu",
                                        maxWidth: '30rem'
                                    }}>{row.original.content}</Typography>
                                </Tooltip>
                            );
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
                ]} data={notifications}/>
            </Card.Body>
        </Card>
    );
};

export default RecentNotifications;