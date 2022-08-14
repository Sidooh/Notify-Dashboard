import { useNotificationsQuery } from 'features/notifications/notificationsAPI';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import NotificationTable from '../../components/tables/NotificationTable';

const SMS = () => {
    let {data: notifications, isLoading, isSuccess, isError, error} = useNotificationsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <SectionLoader/>;

    console.log(notifications);

    return <NotificationTable notifications={notifications}/>;
};

export default SMS;