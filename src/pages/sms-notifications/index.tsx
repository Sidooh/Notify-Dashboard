import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import NotificationTable from 'components/tables/NotificationTable';
import { useGetSMSNotificationsQuery } from 'features/sms-notifications/smsNotificationsApi';

const Index = () => {
    let {data: notifications, isLoading, isSuccess, isError, error} = useGetSMSNotificationsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <SectionLoader/>;

    console.log(notifications);

    return <NotificationTable title={'SMS Notifications'} notifications={notifications}/>;
};

export default Index;