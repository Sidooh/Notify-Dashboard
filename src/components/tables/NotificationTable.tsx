import { Card } from 'react-bootstrap';
import { DataTable, StatusChip, TableDate } from '@nabcellent/sui-react';
import Destination from '../../pages/notifications/Destination';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ReadMore } from '@mui/icons-material';
import { Notification } from '../../utils/types';

const NotificationTable = ({notifications}: { notifications: Notification[] }) => {
    const navigate = useNavigate();

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
                                           maxWidth: '20rem'
                                       }}>{content}</Typography>;
                                   }
                               },
                               {
                                   accessorKey: 'status',
                                   header: 'Status',
                                   cell: ({row}: any) => <StatusChip status={row.original.status}/>
                               },
                               {
                                   accessorKey: 'date',
                                   header: 'Date',
                                   cell: ({row}: any) => <TableDate date={row.original.created_at}/>
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

export default NotificationTable;
