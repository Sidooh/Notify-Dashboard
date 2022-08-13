import { Notification } from 'utils/types';
import { Badge, Status } from '@nabcellent/sui-react';

export const Destination = ({notification}: { notification: Notification }) => {
    let icon: string;

    if (notification.channel === "MAIL") {
        icon = "far fa-paper-plane";
    } else if (notification.channel === "SMS") {
        icon = "fas fa-paper-plane";
    } else {
        icon = "fab fa-slack";
    }

    return (
        <Badge soft pill bg={notification.status === Status.COMPLETED ? "success" : "danger"}>
            <i className={icon}/> {notification.destination}
        </Badge>
    );
};

export default Destination;
