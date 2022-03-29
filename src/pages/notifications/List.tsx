import React from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import DestinationChips from '../../components/DestinationChips';
import { Link } from 'react-router-dom';
import { ReadMore } from '@mui/icons-material';
import moment from 'moment';
import { Helpers } from '../../utils/helpers';
import DataTable from '../../components/DataTable';
import Master from '../../layouts/Master';
import { NotificationType } from '../../utils/types';
import { useNotificationsQuery } from '../../features/notifications/notificationsAPI';

const List = () => {
    let {data: notifications, error, isSuccess} = useNotificationsQuery();

    let rows;
    if (notifications) {
        rows = notifications.map((notification: NotificationType) => {
            let date;
            if (Helpers.isToday(moment(notification.created_at))) {
                date = "Today";
            } else if (Helpers.isYesterday(moment(notification.created_at))) {
                date = "Yesterday";
            } else {
                date = moment(notification.created_at).format("D.M.y");
            }

            return [
                notification.provider,
                <DestinationChips notification={ notification }/>,
                <Typography variant={ "body2" } title={ notification.content } style={ {
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    cursor: "context-menu",
                    maxWidth: '30rem'
                } }>{ notification.content }</Typography>,
                <div style={ {textAlign: "end"} }>
                    <strong>{ moment(notification.created_at).format("LTS") }</strong><br/>
                    <Typography variant={ "caption" }>{ date }</Typography>
                </div>,
                () => <Link to={ `/notifications/${ notification.id }` }><ReadMore fontSize={ 'small' }/></Link>
            ];
        });
    }

    return (
        <Master error={ error }>
            <div className="row g-3 mb-3">
                <div className="col-xxl-12 col-md-12">
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 }>
                            { isSuccess && rows
                                ? <DataTable data={ rows } columns={ [
                                    {name: 'Provider'},
                                    {name: 'Destination(s)'},
                                    {name: 'Message'},
                                    {name: 'Date'},
                                    {name: 'Actions'},
                                ] }/>
                                : <Grid container alignItems="center" justifyContent="center">
                                    <Grid item width={ '70%' }>
                                        <Box sx={ {width: '100%'} } className={ 'mt-5' }>
                                            <LinearProgress color={ 'primary' }/>
                                        </Box>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Master>
    );
};

export default List;