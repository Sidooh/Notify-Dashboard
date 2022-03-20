import React from 'react';
import {Box, Grid, LinearProgress, Typography} from '@mui/material';
import DestinationChips from '../../components/DestinationChips';
import {Link} from 'react-router-dom';
import {ReadMore} from '@mui/icons-material';
import moment from 'moment';
import {Help} from '../../utils/Helpers';
import DataTable from '../../components/DataTable';
import {useFetch} from '../../hooks';
import ErrorPage from '../../components/ErrorPage';
import {CONFIG} from '../../config';

const SMS = () => {
    let {data: notifications, error} = useFetch(`${CONFIG.sidooh.services.notify.api.url}/api/notifications`);

    if (error) return <ErrorPage/>;

    if (notifications) {
        notifications = notifications.map(notification => {
            let date;
            if (Help.isToday(moment(notification.created_at))) {
                date = "Today";
            } else if (Help.isYesterday(moment(notification.created_at))) {
                date = "Yesterday";
            } else {
                date = moment(notification.created_at).format("D.M.y");
            }

            // let hasError;
            // if (notification.channel === "sms" && notification.notifiable_id) {
            //     hasError = notification.notifiable_id.data.some(recipient => recipient.status !== "success");
            // } else {
            //     hasError = notification.status !== "success";
            // }

            return [
                notification.provider,
                <DestinationChips notification={notification}/>,
                <Typography variant={"body2"} title={notification.content} style={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    cursor: "context-menu",
                    maxWidth: '30rem'
                }}>{notification.content}</Typography>,
                <div style={{textAlign: "end"}}>
                    <strong>{moment(notification.created_at).format("LTS")}</strong><br/>
                    <Typography variant={"caption"}>{date}</Typography>
                </div>,
                () => <Link to={`/notifications/${notification.id}`}><ReadMore fontSize={'small'}/></Link>
            ];
        });
    }

    return (
        <>
            <div className="row g-3 mb-3">
                <div className="col-xxl-12 col-md-12">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {!notifications
                             ? <Grid container alignItems="center" justifyContent="center">
                                 <Grid item width={'70%'}>
                                     <Box sx={{width: '100%'}} className={'mt-5'}>
                                         <LinearProgress color={'secondary'}/>
                                     </Box>
                                 </Grid>
                             </Grid>
                             : <DataTable data={notifications} columns={[
                                    {name: 'Provider'},
                                    {name: 'Destination(s)'},
                                    {name: 'Message'},
                                    {name: 'Date'},
                                    {name: 'Actions'},
                                ]}/>
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default SMS;