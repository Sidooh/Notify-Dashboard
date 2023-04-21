import { Row } from 'react-bootstrap';
import Notifications from "./Notifications";
import NotificationsSLO from "./NotificationsSLO";
import VendorsSLO from "./VendorsSLO";
import {
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    SubTitle,
    Title,
    Tooltip
} from "chart.js";
import NotificationCosts from "./NotificationCosts";

Chart.register(Title, SubTitle, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)
Chart.defaults.color = '#fff'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const Analytics = () => {
    return (
        <Row className={'g-3'}>
            <Notifications/>
            <NotificationCosts/>

            <NotificationsSLO/>
            <VendorsSLO/>
        </Row>
    );
};

export default Analytics;
