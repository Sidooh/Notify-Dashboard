import {Route, Routes} from "react-router-dom";
import Master from './layouts/Master';
import {Dashboard, Notifications, Settings, Auth} from './pages';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AuthProvider} from './components/AuthProvider';

const theme = createTheme({
    typography: {
        fontFamily: ['"Varela Round"', 'cursive',].join(','),
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Master>
                    <Routes>
                        <Route path={'/login'} element={<Auth.Login/>}/>
                        <Route path={'/dashboard/default'} element={<Dashboard.Default/>}/>
                        <Route path={'/dashboard/analytics'} element={<Dashboard.Analytics/>}/>
                        <Route path={'/notifications/create'} element={<Notifications.Create/>}/>
                        <Route path={'/notifications/sms'} element={<Notifications.SMS/>}/>
                        <Route path={'/notifications/:id'} element={<Notifications.Show/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                        <Route path={'*'} element={<Dashboard.Default/>}/>
                    </Routes>
                </Master>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
