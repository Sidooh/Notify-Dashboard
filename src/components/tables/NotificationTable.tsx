import { Card, Spinner } from 'react-bootstrap';
import { DataTable, PhoneChip, Status, StatusChip, TableDate, toast } from '@nabcellent/sui-react';
import { Link, useNavigate } from 'react-router-dom';
import { Notification } from '../../utils/types';
import { useRetryNotificationMutation } from 'features/notifications/notificationsAPI';
import moment from 'moment';
import { Tooltip } from '@mui/material';
import { FaEye, GrRotateRight } from "react-icons/all";

type NotificationTableProps = { title: string, notifications: Notification[] }

const NotificationTable = ({ title, notifications }: NotificationTableProps) => {
    const navigate = useNavigate();

    return (
        <Card className={'mb-3'}>
            <Card.Body>
                <DataTable onCreateRow={() => navigate('/notifications/create')} title={title}
                           columns={[
                               {
                                   accessorKey: 'channel',
                                   header: 'Channel'
                               },
                               {
                                   accessorKey: 'destination',
                                   header: 'Destination',
                                   cell: ({ row }: any) => {
                                       let { channel, destination } = row.original;
                                       let icon: string, text;

                                       if (channel === "MAIL") {
                                           icon = "far fa-envelope";
                                       } else if (channel === "SMS") {
                                           icon = "fas fa-comment-sms";
                                           destination = <PhoneChip phone={destination}/>
                                       } else {
                                           icon = "fab fa-slack";
                                       }

                                       return destination
                                   }
                               },
                               {
                                   accessorKey: 'content',
                                   header: 'Message',
                                   cell: (rowData: any) => {
                                       const { content } = rowData.row.original;
                                       return (
                                           <Tooltip title={content} placement={'top'}>
                                               <p style={{
                                                   display: "-webkit-box",
                                                   overflow: "hidden",
                                                   WebkitBoxOrient: "vertical",
                                                   WebkitLineClamp: 2,
                                                   cursor: "context-menu",
                                                   maxWidth: '17rem',
                                                   marginBottom: 0
                                               }}>{content}</p>
                                           </Tooltip>
                                       );
                                   }
                               },
                               {
                                   accessorKey: 'status',
                                   header: 'Status',
                                   cell: ({ row }: any) => <StatusChip status={row.original.status}/>
                               },
                               {
                                   accessorKey: 'date',
                                   header: 'Date',
                                   accessorFn: (row: Notification) => moment(row.created_at).calendar(),
                                   cell: ({ row }: any) => <TableDate date={row.original.created_at}/>
                               },
                               {
                                   id: 'actions',
                                   cell: (rowData: any) => {
                                       const [retryNotification, result] = useRetryNotificationMutation();

                                       const { id, status } = rowData.row.original;

                                       if (result.isSuccess && status === Status.COMPLETED) {
                                           toast({ text: 'Notification Sent! ✔' })
                                       }

                                       return (
                                           <div className={'text-nowrap'}>
                                               <Link to={`/notifications/${id}`} className={'me-2'}><FaEye/></Link>
                                               {status === Status.FAILED && (
                                                   <>
                                                       {result.isLoading
                                                        ? <Spinner animation={'border'} size={'sm'}/> : (
                                                            <Tooltip title={'Retry'} placement={'top'}>
                                                               <span>
                                                                   <GrRotateRight className={'cursor-pointer'}
                                                                                  onClick={() => retryNotification(id)}/>
                                                               </span>
                                                            </Tooltip>
                                                        )}
                                                   </>
                                               )}
                                           </div>
                                       );
                                   }
                               }
                           ]} data={notifications}/>
            </Card.Body>
        </Card>
    );
};

export default NotificationTable;
