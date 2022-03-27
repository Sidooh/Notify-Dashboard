import {NavLink, Route, Routes} from "react-router-dom";
import Master from './layouts/Master';
import {Auth, Dashboard, Notifications, Settings} from './pages';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Help} from './utils/Helpers';
import {useState} from 'react';
import {AuthProvider} from './components/AuthProvider';
import RequireAuth from './components/RequireAuth';

const theme = createTheme({
    typography: {
        fontFamily: `${['"Varela Round"', 'cursive',].join(',')}!important`,
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    boxShadow: 'var(--falcon-box-shadow-inset)!important',
                    padding: 'padding: .3125rem 1rem;!important'
                }
            }
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Routes>
                    <Route path={'/login'} element={<Auth.Login/>}/>

                    <Route index element={<RequireAuth component={<Dashboard.Default/>}/>}/>
                    <Route path={'/dashboard'} element={<RequireAuth component={<Dashboard.Default/>}/>}/>
                    <Route path={'/dashboard/analytics'} element={<RequireAuth component={<Dashboard.Analytics/>}/>}/>
                    <Route path={'/notifications/create'} element={<RequireAuth component={<Notifications.Create/>}/>}/>
                    <Route path={'/notifications/sms'} element={<RequireAuth component={<Notifications.SMS/>}/>}/>
                    <Route path={'/notifications/:id'} element={<RequireAuth component={<Notifications.Show/>}/>}/>
                    <Route path={'/settings'} element={<RequireAuth component={<Settings/>}/>}/>
                    <Route path={'*'} element={<RequireAuth component={<Dashboard.Default/>}/>}/>
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
