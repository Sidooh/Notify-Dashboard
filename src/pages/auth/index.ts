import Loadable from '../../components/Loadable';
import {lazy} from 'react';

const Login = Loadable(lazy(() => import("./Login")));

export const Auth = {
    Login,
};