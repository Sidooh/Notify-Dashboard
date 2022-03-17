import axios from 'axios';

let Weather = {Utils: {}};

Weather.LANGUAGE = "en";    // default language is English

Weather.getApiKey = () => Weather.APIKEY;

Weather.setApiKey = function (apiKey) {
    Weather.APIKEY = apiKey;
};

Weather.getLanguage = () => Weather.LANGUAGE;

Weather.setLanguage = function (language) {
    Weather.LANGUAGE = language;
};

Weather.kelvinToFahrenheit = value => (this.kelvinToCelsius(value) * 1.8) + 32;
Weather.kelvinToCelsius = value => value - 273.15;

Weather.getCurrent = function (city, callback) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city) + "&cnt=1";

    return this._getJSON(url, data => callback(new Weather.Current(data)));
};

Weather.getCurrentByCityId = function (cityId, callback) {
    let url = "https://api.openweathermap.org/data/2.5/weather?id=" + encodeURIComponent(cityId) + "&cnt=1";

    return this._getJSON(url, data => callback(new Weather.Current(data)));
};

Weather.getCurrentByLatLong = function (lat, long, callback) {
    let url = "https://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(long) + "&cnt=1";

    return this._getJSON(url, data => callback(new Weather.Current(data)));
};

Weather.getForecast = function (city, callback) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "&cnt=1";

    return this._getJSON(url, data => callback(new Weather.Forecast(data)));
};

Weather.getForecastByCityId = function (cityId, callback) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?id=" + encodeURIComponent(cityId) + "&cnt=1";

    return this._getJSON(url, data => callback(new Weather.Forecast(data)));
};

Weather.getForecastByLatLong = function (lat, long, callback) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(long) + "&cnt=1";

    return this._getJSON(url, data => callback(new Weather.Forecast(data)));
};

Weather._getJSON = async (url, callback) => {
    if (Weather.LANGUAGE) {
        url = url + "&lang=" + Weather.LANGUAGE;
    }

    if (Weather.APIKEY) {
        url = url + "&APPID=" + Weather.APIKEY;
    } else {
        console.log('WARNING: You must provide an OpenWeatherMap API key.');
    }

    axios.get(url).then(({data}) => callback(data)).catch(err => console.log(err))
};

let maxBy = Weather.Utils.maxBy = function (list, iterator) {
    let max;
    let f = function (memo, d) {
        let val = iterator(d);

        if (memo === null || val > max) {
            max = val;
            memo = d;
        }

        return memo;
    };

    return list.reduce(f, null);
};

let minBy = Weather.Utils.minBy = function (list, iterator) {
    let min;
    let f = function (memo, d) {
        let val = iterator(d);

        if (memo === null || val < min) {
            min = val;
            memo = d;
        }

        return memo;
    };

    return list.reduce(f, null);
};

let isOnDate = Weather.Utils.isOnDate = function (a, b) {
    let sameYear = a.getYear() === b.getYear();
    let sameMonth = a.getMonth() === b.getMonth();
    let sameDate = a.getDate() === b.getDate();

    return sameYear && sameMonth && sameDate;
};

Weather.Forecast = function (data) {
    this.data = data;
};

Weather.Forecast.prototype.startAt = function () {
    return new Date(minBy(this.data.list, d => d.dt).dt * 1000);
};

Weather.Forecast.prototype.endAt = function () {
    return new Date(maxBy(this.data.list, d => d.dt).dt * 1000);
};

Weather.Forecast.prototype.day = function (date) {
    return new Weather.Forecast(this._filter(date));
};

Weather.Forecast.prototype.low = function () {
    if (this.data.list.length === 0) return;

    let output = minBy(this.data.list, item => item.main.temp_min);

    return output.main.temp_min;
};

Weather.Forecast.prototype.high = function () {
    if (this.data.list.length === 0) return;

    let output = maxBy(this.data.list, item => item.main.temp_max);

    return output.main.temp_max;
};

Weather.Forecast.prototype._filter = function (date) {
    return {
        list: this.data.list.filter(range => {
            let dateTimestamp = (range.dt * 1000);

            if (isOnDate(new Date(dateTimestamp), date)) return range;

            return null
        })
    };
};

Weather.Current = function (data) {
    this.data = data;
};

Weather.Current.prototype.temperature = function () {
    return this.data.main.temp;
};

Weather.Current.prototype.conditions = function () {
    return this.data.weather[0].description;
};

export default Weather;