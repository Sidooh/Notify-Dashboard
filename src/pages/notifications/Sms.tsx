import { memo } from 'react';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ReadMore } from '@mui/icons-material';
import moment from 'moment';
import { isToday, isYesterday } from 'utils/helpers';
import { useNotificationsQuery } from '../../features/notifications/notificationsAPI';
import { SectionLoader } from '../../components/Loader';
import { Card } from 'react-bootstrap';
import DataTable from '../../components/common/datatable';
import { SectionError } from '../../components/Error';
import Destination from './Destination';

const Sms = () => {
    const navigate = useNavigate();

    let {data: notifications, isLoading, isSuccess, isError, error} = useNotificationsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <SectionLoader/>;

    return (
        <Card>
            <Card.Body>
                <DataTable onCreateRow={() => navigate('/notifications/create')} title={'SMS Notifications'}
                           columns={[
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
                                       return <Typography variant={"body2"} title={message} style={{
                                           display: "-webkit-box",
                                           overflow: "hidden",
                                           WebkitBoxOrient: "vertical",
                                           WebkitLineClamp: 2,
                                           cursor: "context-menu",
                                           maxWidth: '30rem'
                                       }}>{message}</Typography>;
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
                                           <strong>{moment(created_at).format("LTS")}</strong><br/>
                                           <Typography variant={"caption"}>{date}</Typography>
                                       </div>;
                                   }
                               },
                               {
                                   id: 'actions',
                                   cell: (rowData: any) => {
                                       const {id} = rowData.row.original;
                                       return <Link to={`/notifications/${id}`}><ReadMore
                                           fontSize={'small'}/></Link>;
                                   }
                               }
                           ]} data={notifications.map(notification => {
                    return {
                        ...notification,
                        message: notification.content,
                    };
                })}/>
            </Card.Body>
        </Card>
    );
};

export default memo(Sms);