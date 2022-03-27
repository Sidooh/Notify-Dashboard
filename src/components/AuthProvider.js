import React, {useState} from 'react';
import {Help} from '../utils/Helpers';
import {useLocation, useNavigate} from 'react-router-dom';

let AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    let [user, setUser] = useState(null);

    const handleSignIn = async (data, callback = null) => {
        const token = await Help.fakeAuth();
        console.log(token);

        setUser(token);
        
        let urlIntended = location.state?.from?.pathname || "/";
        navigate(urlIntended, {replace: true})
    };

    const handleSignOut = () => {
        setUser(null);
        navigate("/login")
    }

    const value = {
        user,
        onSignIn: handleSignIn,
        onSignOut: handleSignOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};