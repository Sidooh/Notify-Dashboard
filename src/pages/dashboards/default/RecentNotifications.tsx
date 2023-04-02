import { ComponentLoader, SectionError } from '@nabcellent/sui-react';
import { useGetRecentNotificationsQuery } from 'features/notifications/notificationsAPI';
import NotificationTable from 'components/tables/NotificationTable';

const RecentNotifications = () => {
    let {data: notifications, isLoading, isSuccess, isError, error} = useGetRecentNotificationsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <ComponentLoader/>;

    if (!notifications) return <ComponentLoader/>;

    return <NotificationTable title={'Recent Notifications'} notifications={notifications}/>
};

export default RecentNotifications;