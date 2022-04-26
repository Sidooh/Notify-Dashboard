import  { memo } from 'react';
import { Typography } from '@mui/material';
import DestinationChips from '../../components/DestinationChips';
import { Link, useNavigate } from 'react-router-dom';
import { ReadMore } from '@mui/icons-material';
import moment from 'moment';
import { isToday, isYesterday } from 'helpers/utils';
import { useNotificationsQuery } from '../../features/notifications/notificationsAPI';
import { SectionLoader } from '../../components/Loader';
import { Col, Row } from 'react-bootstrap';
import DataTable from '../../components/common/datatable';
import { SectionError } from '../../components/Error';

const Sms = () => {
    const navigate = useNavigate();

    let {data: notifications, isLoading, isSuccess, isError, error} = useNotificationsQuery();

    return (
        <Row className={'g-3 mb-3'}>
            <Col>
                {isError && <SectionError error={error}/>}
                {
                    !isLoading && isSuccess && notifications
                        ? <DataTable tableClassName={'table-sm'} bulkActions
                                     onCreateRow={() => navigate('/notifications/create')} title={'SMS Notifications'}
                                     columns={[
                                         {
                                             accessor: 'provider',
                                             Header: 'Provider'
                                         },
                                         {
                                             accessor: 'destinations',
                                             Header: 'Destination(s)',
                                             Cell: (rowData: any) => <DestinationChips
                                                 notification={rowData.row.original}/>
                                         },
                                         {
                                             accessor: 'message',
                                             Header: 'Message',
                                             Cell: (rowData: any) => {
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
                                                     <strong>{moment(created_at).format("LTS")}</strong><br/>
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
                                     ]} data={notifications.map(notification => {
                            return {
                                ...notification,
                                message: notification.content,
                            };
                        })}/>
                        : <SectionLoader/>
                }
            </Col>
        </Row>
    );
};

export default memo(Sms);