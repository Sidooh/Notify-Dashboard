import {lazy} from 'react';
import Loadable from '../../components/Loadable';

const Default = Loadable(lazy(() => import("./default/Dashboard")));
const Analytics = Loadable(lazy(() => import("./analytics")));

export const Dashboards = {
    Default,
    Analytics
};