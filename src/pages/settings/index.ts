import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const Settings = Loadable(lazy(() => import('./Settings')))

export {Settings};
