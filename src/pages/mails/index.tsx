import { SectionError, SectionLoader } from '@nabcellent/sui-react';
import NotificationTable from 'components/tables/NotificationTable';
import { useGetMailsQuery } from 'features/mails/mailsApi';
import { logger } from 'utils/logger';

const Index = () => {
    let {data: notifications, isLoading, isSuccess, isError, error} = useGetMailsQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !notifications) return <SectionLoader/>;

    logger.log(notifications);

    return <NotificationTable title={'Mail Notifications'} notifications={notifications}/>;
};

export default Index;