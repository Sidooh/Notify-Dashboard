import React from 'react';
import {Mail, Telegram} from '@mui/icons-material';
import PropTypes from 'prop-types';

const DestinationChips = ({notification}) => {
    let data, icon;
    if (notification.channel === "sms" && notification.notifiable_id) {
        data = notification.notifiable_id.data.map(notif => ({...notif, recipient: notif.phone}));
    } else {
        data = notification.destination.map(notif => ({recipient: notif, status: notification.status}));
    }

    if (notification.channel === "mail") {
        icon = <Mail fontSize={"small"} className={'pe-2'}/>;
    } else if (notification.channel === "sms") {
        icon = <Telegram fontSize={"small"} className={'pe-2'}/>;
    } else {
        icon = <i className={'fab fa-slack pe-2'}/>;
    }

    return (
        <>
            {data.map((data, i) => {
                return (
                    <span key={i} className={`badge badge rounded-pill badge-soft-${data.status === "success" ? "success" : "danger"}`}>
                        {icon}{data.recipient}
                        {<span className={`ms-1 fas fa-${data.status === "success" ? "check" : "xmark"}`}/>}
                    </span>
                );
            })}
        </>
    );
};

DestinationChips.propTypes = {
    notification: PropTypes.object.isRequired,
}

export default DestinationChips;
