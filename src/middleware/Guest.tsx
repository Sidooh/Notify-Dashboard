import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

const Guest = ({component}: { component: JSX.Element }) => {
    const {user} = useAuth();
    const location = useLocation();

    if (user) {
        console.log(user);

        // Redirect them to the /home page.

        // @ts-ignore
        let urlIntended: string = location.state?.from?.pathname || "/dashboard";
        return <Navigate to={urlIntended} replace/>;
    }

    return component;
};

export default Guest;