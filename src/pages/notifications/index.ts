import {lazy} from 'react';
import Loadable from '../../components/Loadable';

const Create = Loadable(lazy(() => import("./Create")));
const Sms = Loadable(lazy(() => import("./Sms")));
const Mail = Loadable(lazy(() => import("./Mail")));
const Show = Loadable(lazy(() => import("./Show")));

export const Notifications = {
    Create,
    Sms,
    Show,
    Mail
};