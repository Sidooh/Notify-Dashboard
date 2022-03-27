import {lazy} from 'react';
import Loadable from '../../components/Loadable';

const Default = Loadable(lazy(() => import("./Default")));
const Analytics = Loadable(lazy(() => import("./Analytics")));

export const Dashboards = {
    Default,
    Analytics
};