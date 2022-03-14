import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Box, Grid, LinearProgress, ThemeProvider, Typography} from '@mui/material';
import DestinationChips from '../../components/DestinationChips';
import {Link} from 'react-router-dom';
import {Filter, FilterList, GetApp, PlusOne, Print, ReadMore, Search, ViewColumn} from '@mui/icons-material';
import moment from 'moment';
import {Help} from '../../utils/Helpers';
import {createTheme} from '@mui/material/styles';

const SMS = () => {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    function fetchDashboard() {
        axios.get('https://hoodis-notify.herokuapp.com/api/notifications')
             .then(({data}) => {
                 data = data.map(notification => {
                     let date;
                     if (Help.isToday(moment(notification.created_at))) {
                         date = "Today";
                     } else if (Help.isYesterday(moment(notification.created_at))) {
                         date = "Yesterday";
                     } else {
                         date = moment(notification.created_at).format("D.M.y");
                     }

                     let hasError;
                     if (notification.channel === "sms" && notification.notifiable_id) {
                         hasError = notification.notifiable_id.data.some(recipient => recipient.status !== "success");
                     } else {
                         hasError = notification.status !== "success";
                     }

                     return [
                         <Typography variant={"body2"} fontWeight={"bold"}>{notification.provider}</Typography>,
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
                         () => <Link to={"/notifications/show"} state={notification}><ReadMore/></Link>
                     ];
                 });

                 setNotifications(data);
             }).catch(err => console.log(err));
    }

    const theme = createTheme({
        typography: {
            fontFamily: ['"Varela Round"', 'cursive',].join(','),
        },
        components: {
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        fontSize: '1rem'
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '.375rem',
                        backgroundColor: 'var(--falcon-card-bg)',
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        backgroundColor: 'rgba(var(--falcon-200-rgb), 1) !important',
                    },
                    root: {
                        padding: '0 .25rem',
                    }
                }
            }
        }
    });

    const components = {
        icons: {
            ExtraIcon: () => <PlusOne fontSize={'small'}/>,
            SearchIcon: () => <Search fontSize={'small'}/>,
            DownloadIcon: () => <GetApp fontSize={'small'}/>,
            PrintIcon: () => <Print fontSize={'small'}/>,
            ViewColumnIcon: () => <ViewColumn fontSize={'small'}/>,
            FilterIcon: () => <FilterList fontSize={'small'} style={{padding: 0}}/>,
            }
    };

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
                         : <ThemeProvider theme={theme}>
                             <MUIDataTable
                                 title={<h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">SMS Notifications </h5>}
                                 data={notifications}
                                 columns={[
                                     {name: <strong>Provider</strong>},
                                     {name: <strong>Destination(s)</strong>},
                                     {name: <strong>Message</strong>},
                                     {name: <strong>Date</strong>},
                                     {name: <strong>Actions</strong>},
                                 ]}
                                 options={{filter: true, filterType: 'dropdown', rowsPerPage: 10}}
                                 components={components}/>
                         </ThemeProvider>
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
    ;

    export default SMS;;
