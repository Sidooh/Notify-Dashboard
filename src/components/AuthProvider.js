import React, {useState} from 'react';

let AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(null);

    const handleSignIn = async (user, callback) => {
        setUser(user);
    };

    const handleSignOut = () => {
        setUser(null);
    };

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