import React, {useState} from 'react';
import Weather from '../utils/Weather';
import CountUp from 'react-countup';

const WeatherCard = () => {
    const [tempInCelsius, setTempInCelsius] = useState(0);
    const [icon, setIcon] = useState("");
    const [condition, setCondition] = useState("");
    const [location, setLocation] = useState("");

    Weather.setApiKey('11ea5528e89c719b6f5832f8bb18faa9');
    Weather.getCurrent('Nairobi', function (current) {
        const {name, weather} = current.data;

        setLocation(name);
        setCondition(current.conditions());
        setTempInCelsius(Weather.kelvinToCelsius(current.temperature()));
        setIcon(`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`);

        // AOS.refreshHard()
    });

    return (
        <div className="card h-md-100">
            <div className="card-header d-flex flex-between-center pb-0">
                <h6 className="mb-0">Weather</h6>
                <div className="dropdown font-sans-serif btn-reveal-trigger">
                    <button
                        className="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                        type="button" id="dropdown-weather-update" data-bs-toggle="dropdown"
                        data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
                        <span className="fas fa-ellipsis-h fs--2"/>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end border py-2"
                         aria-labelledby="dropdown-weather-update">
                        <a className="dropdown-item" href="#!">View</a>
                        <a className="dropdown-item" href="#!">Export</a>
                        <div className="dropdown-divider"/>
                        <a className="dropdown-item text-danger" href="#!">Remove</a>
                    </div>
                </div>
            </div>
            <div className="card-body pt-2">
                <div className="row g-0 h-100 align-items-center">
                    <div className="col">
                        <div className="d-flex align-items-center">
                            <img className="me-3" src={icon} alt="" height="60"/>
                            <div>
                                <h6 className="mb-2">{location}</h6>
                                <div className="fs--2 fw-semi-bold">
                                    <div className="text-warning">{condition}</div>
                                    Precipitation: 50%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto text-center ps-2">
                        <div className="fs-4 fw-normal font-sans-serif text-primary mb-1 lh-1">
                            <CountUp end={tempInCelsius} suffix={'&deg;'}/>
                        </div>
                        <div className="fs--1 text-800">32&deg; / 25&deg;</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
