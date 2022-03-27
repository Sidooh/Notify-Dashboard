import {lazy} from 'react';
import Loadable from '../../components/Loadable';

const Create = Loadable(lazy(() => import("./Create")));
const List = Loadable(lazy(() => import("./List")));
const Show = Loadable(lazy(() => import("./Show")));

export const Notifications = {
    Create,
    List,
    Show
};