import React, { memo, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Middleware from '../middleware';
import { Auth, Dashboards, Notifications, Settings } from '../pages';
import MainLayout from './MainLayout';
import GuestLayout from './GuestLayout';
import { is } from '../helpers/utils';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';

const Layout = () => {
    const HTMLClassList = document.getElementsByTagName('html')[0].classList;

    useEffect(() => {
        if (is.windows()) HTMLClassList.add('windows');
        if (is.chrome()) HTMLClassList.add('chrome');
        if (is.firefox()) HTMLClassList.add('firefox');
    }, [HTMLClassList]);

    return (
        <>
            <Routes>
                <Route element={<GuestLayout/>}>
                    <Route path={'/login'} element={<Middleware.Guest component={<Auth.Login/>}/>}/>
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout/>}/>}>
                    <Route index element={<Dashboards.Default/>}/>
                    <Route path={'/dashboard'} element={<Dashboards.Default/>}/>
                    <Route path={'/dashboard/analytics'} element={<Dashboards.Analytics/>}/>
                    <Route path={'/notifications/sms'} element={<Notifications.Sms/>}/>
                    <Route path={'/notifications/mail'} element={<Notifications.Mail/>}/>
                    <Route path={'/notifications/create'} element={<Notifications.Create/>}/>
                    <Route path={'/notifications/:id'} element={<Notifications.Show/>}/>
                    <Route path={'/settings'} element={<Settings/>}/>
                    <Route path={'*'} element={<Dashboards.Default/>}/>
                </Route>
            </Routes>
            <SettingsToggle/>
            <SettingsPanel/>
        </>
    );
};

export default memo(Layout);
