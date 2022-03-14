import {Route, Routes} from "react-router-dom";
import Master from './layouts/Master';
import {Dashboard} from './pages/dashboards';

function App() {
    return (
        <Master>
            <Routes>
                <Route path={'/dashboard/default'} element={<Dashboard.Default/>}/>
                <Route path={'/dashboard/analytics'} element={<Dashboard.Analytics/>}/>
                <Route path={'*'} element={<Dashboard.Default/>}/>
            </Routes>
        </Master>
    );
}

export default App;
