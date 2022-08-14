import { useGetDashboardQuery } from 'features/notifications/notificationsAPI';
import { lazy, Suspense } from 'react';
import { ComponentLoader } from '@nabcellent/sui-react';

const WeeklyNotifications = lazy(() => import('./WeeklyNotifications'));
const Summaries = lazy(() => import('./Summaries'));
const RecentNotifications = lazy(() => import('./RecentNotifications'));

const Dashboard = () => {
    const {data} = useGetDashboardQuery();
    console.log(data);

    return (
        <>
            <Suspense fallback={<ComponentLoader/>}><WeeklyNotifications/></Suspense>
            <Suspense fallback={<ComponentLoader/>}><Summaries/></Suspense>
            <Suspense fallback={<ComponentLoader/>}><RecentNotifications/></Suspense>
        </>
    );
};

export default Dashboard;
