import {Route, Routes} from "react-router-dom";
import Master from './layouts/Master';
import {Dashboard, Notifications, Settings} from './pages';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['"Varela Round"', 'cursive',].join(','),
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Master>
                <Routes>
                    <Route path={'/dashboard/default'} element={<Dashboard.Default/>}/>
                    <Route path={'/dashboard/analytics'} element={<Dashboard.Analytics/>}/>
                    <Route path={'/notifications/create'} element={<Notifications.Create/>}/>
                    <Route path={'/notifications/sms'} element={<Notifications.SMS/>}/>
                    <Route path={'/notifications/:id'} element={<Notifications.Show/>}/>
                    <Route path={'/settings'} element={<Settings.Index/>}/>
                    <Route path={'*'} element={<Dashboard.Default/>}/>
                </Routes>
            </Master>
        </ThemeProvider>
    );
}

export default App;
