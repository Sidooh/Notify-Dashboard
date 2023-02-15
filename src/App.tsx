import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle, fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Route, Routes } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import { Middleware } from './middleware';
import MainLayout from './layouts/MainLayout';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import { lazy, useEffect } from 'react';
import { is, PageLoader } from '@nabcellent/sui-react';
import useTheme from './hooks/useTheme';
import { RootState } from 'app/store';
import { useAppSelector } from './app/hooks';
import Login from "./pages/auth/Login";

library.add(fas, far, faQuestionCircle);

const Dashboard = lazy(() => import('pages/dashboards/default/Dashboard'));
const Analytics = lazy(() => import('pages/dashboards/analytics'));
const SMSNotifications = lazy(() => import('pages/sms-notifications'));
const Mails = lazy(() => import('pages/mails'));
const CreateNotification = lazy(() => import('pages/notifications/Create'));
const ShowNotification = lazy(() => import('pages/notifications/Show'));
const SMSProviders = lazy(() => import('pages/sms-providers'));
const Settings = lazy(() => import('pages/settings'));

function App() {
    const HTMLClassList = document.getElementsByTagName('html')[0].classList;

    useEffect(() => {
        if (is.windows()) HTMLClassList.add('windows');
        if (is.chrome()) HTMLClassList.add('chrome');
        if (is.firefox()) HTMLClassList.add('firefox');
    }, [HTMLClassList]);

    const { isDark } = useAppSelector((state: RootState) => state.theme);
    const { isLoaded } = useTheme(isDark);

    if (!isLoaded) return <PageLoader isDark={isDark}/>;

    return (
        <>
            <Routes>
                <Route element={<GuestLayout/>}>
                    <Route path={'/login'} element={<Middleware.Guest component={<Login/>}/>}/>
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout/>}/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/dashboard/analytics'} element={<Analytics/>}/>

                    <Route path={'/notifications/sms'} element={<SMSNotifications/>}/>
                    <Route path={'/notifications/mail'} element={<Mails/>}/>
                    <Route path={'/notifications/create'} element={<CreateNotification/>}/>
                    <Route path={'/notifications/:id'} element={<ShowNotification/>}/>

                    <Route path={'/sms/providers'} element={<SMSProviders/>}/>
                    <Route path={'/settings'} element={<Settings/>}/>
                    <Route path={'*'} element={<Dashboard/>}/>
                </Route>
            </Routes>
            <SettingsToggle/>
            <SettingsPanel/>
        </>
    );
}

export default App;
