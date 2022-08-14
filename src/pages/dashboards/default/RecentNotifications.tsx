import { ComponentLoader, SectionError } from '@nabcellent/sui-react';
import { useGetRecentNotificationsQuery } from 'features/dashboard/dashboardApi';
import NotificationTable from 'components/tables/NotificationTable';

const RecentNotifications = () => {
    let {data: notifications, isLoading, isSuccess, isError, error} = useGetRecentNotificationsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <ComponentLoader/>;

    console.log(notifications);

    if (!notifications) return <ComponentLoader/>;

    return <NotificationTable notifications={notifications}/>
};

export default RecentNotifications;