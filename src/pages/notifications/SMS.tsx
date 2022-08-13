import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ReadMore } from '@mui/icons-material';
import moment from 'moment';
import { isToday, isYesterday } from 'utils/helpers';
import { useNotificationsQuery } from 'features/notifications/notificationsAPI';
import { Card } from 'react-bootstrap';
import Destination from './Destination';
import { DataTable, SectionError, SectionLoader } from '@nabcellent/sui-react';

const SMS = () => {
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
                                   accessorKey: 'content',
                                   header: 'Message',
                                   cell: (rowData: any) => {
                                       const {content} = rowData.row.original;
                                       return <Typography variant={"body2"} title={content} style={{
                                           display: "-webkit-box",
                                           overflow: "hidden",
                                           WebkitBoxOrient: "vertical",
                                           WebkitLineClamp: 2,
                                           cursor: "context-menu",
                                           maxWidth: '30rem'
                                       }}>{content}</Typography>;
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
                           ]} data={notifications}/>
            </Card.Body>
        </Card>
    );
};

export default SMS;