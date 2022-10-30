import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import NotificationTable from 'components/tables/NotificationTable';
import { useGetSMSNotificationsQuery } from 'features/sms-notifications/smsNotificationsApi';
import { logger } from 'utils/logger';

const Index = () => {
    let {data: notifications, isLoading, isSuccess, isError, error} = useGetSMSNotificationsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <SectionLoader/>;

    logger.log(notifications);

    return <NotificationTable title={'SMS Notifications'} notifications={notifications}/>;
};

export default Index;