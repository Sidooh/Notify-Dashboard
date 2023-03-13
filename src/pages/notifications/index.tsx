import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import NotificationTable from 'components/tables/NotificationTable';
import { useNotificationsQuery } from 'features/notifications/notificationsAPI';
import { logger } from 'utils/logger';

const Index = () => {
    let {data: notifications, isLoading, isSuccess, isError, error} = useNotificationsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <SectionLoader/>;

    logger.log(notifications);

    return <NotificationTable title={'All Notifications'} notifications={notifications}/>;
};

export default Index;