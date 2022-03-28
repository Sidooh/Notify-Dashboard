import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Route, Routes} from "react-router-dom";
import {Auth, Dashboards, Notifications, Settings} from './pages';
import Middleware from './middleware';
import {ErrorFallback} from './components/Error';
import {ErrorBoundary} from 'react-error-boundary';

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
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                <Routes>
                    <Route path={'/login'} element={<Middleware.Guest component={<Auth.Login/>}/>}/>

                    <Route index element={<Middleware.Auth component={<Dashboards.Default/>}/>}/>
                    <Route path={'/dashboard'} element={<Middleware.Auth component={<Dashboards.Default/>}/>}/>
                    <Route path={'/dashboard/analytics'}
                           element={<Middleware.Auth component={<Dashboards.Analytics/>}/>}/>
                    <Route path={'/notifications/sms'} element={<Middleware.Auth component={<Notifications.List/>}/>}/>
                    <Route path={'/notifications/create'}
                           element={<Middleware.Auth component={<Notifications.Create/>}/>}/>
                    <Route path={'/notifications/:id'} element={<Middleware.Auth component={<Notifications.Show/>}/>}/>
                    <Route path={'/settings'} element={<Middleware.Auth component={<Settings/>}/>}/>
                    <Route path={'*'} element={<Middleware.Auth component={<Dashboards.Default/>}/>}/>
                </Routes>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
