import { NotificationType } from '../../helpers/types';
import { Mail, Telegram } from '@mui/icons-material';
import { Status } from '../../helpers/enums';

export const Destination = ({notification}: { notification: NotificationType }) => {
    let icon: JSX.Element

    if (notification.channel === "mail") {
        icon = <Mail fontSize={"small"} className={'pe-2'}/>;
    } else if (notification.channel === "sms") {
        icon = <Telegram fontSize={"small"} className={'pe-2'}/>;
    } else {
        icon = <i className={'fab fa-slack pe-2'}/>;
    }

    return (
        <span className={`badge badge rounded-pill badge-soft-${notification.status === Status.COMPLETED ? "success" : "danger"}`}>
                                        {icon}{notification.destination}
            {<span className={`ms-1 fas fa-${notification.status === Status.COMPLETED ? "check" : "xmark"}`}/>}
                                    </span>
    );
}

export default Destination;
