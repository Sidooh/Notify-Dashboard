import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Grid, LinearProgress, Typography} from '@mui/material';
import DestinationChips from '../../components/DestinationChips';
import {Link} from 'react-router-dom';
import {ReadMore} from '@mui/icons-material';
import moment from 'moment';
import {Help} from '../../utils/Helpers';
import DataTable from '../../components/DataTable';
import {useFetch} from '../../hooks';

const SMS = () => {
    let {data: notifications, error} = useFetch('https://hoodis-notify.herokuapp.com/api/notifications');

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
        <div className="row g-3 mb-3">
            <div className="col-xxl-12 col-md-12">
                {/*<RecentNotifications notifications={notifications}/>*/}
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
                                {name: <strong>Provider</strong>},
                                {name: <strong>Destination(s)</strong>},
                                {name: <strong>Message</strong>},
                                {name: <strong>Date</strong>},
                                {name: <strong>Actions</strong>},
                            ]}/>
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SMS;