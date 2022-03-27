import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import React from 'react';

const Auth = ({component}: { component: JSX.Element }) => {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they log in, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    console.log(user);

    return component;
};

export default Auth;