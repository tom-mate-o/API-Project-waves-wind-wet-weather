import './App.css';
import React, { useState, useEffect } from 'react';
import * as Icons from './components/icons';
import MyLineChart from './components/myLineChart';
import MyBarChart from './components/myBarChart';
import { DateTime } from 'luxon';

function App() {
  const [data, setData] = useState(null);
  const [waveData, setWaveData] = useState([]);
  const [waveChartData, setWaveChartData] = useState([]);
  const [windChartData, setWindChartData] = useState([]);
  const [precipitationChartData, setPrecipitationChartData] = useState([]);
  const [temperatureChartData, setTemperatureChartData] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=53.0833&longitude=4.8333&hourly=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,sunshine_duration,uv_index_max,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FBerlin&past_days=1&forecast_days=1'
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        if (data && data.hourly) {
          const newChartData = data.hourly.time.map((time, index) => ({
            // time: Number(new Date(time).getHours()),
            time: time,
            windSpeed: data.hourly.wind_speed_10m[index],
          }));
          setWindChartData(newChartData);
        }
        if (data && data.hourly) {
          const newChartData = data.hourly.time.map((time, index) => ({
            time: time,
            precipitation: data.hourly.precipitation[index],
          }));
          setPrecipitationChartData(newChartData);
        }
        if (data && data.daily) {
          const newChartData = data.hourly.time.map((time, index) => ({
            time: time,
            temperature: data.hourly.temperature_2m[index],
          }));
          setTemperatureChartData(newChartData);
        }

        return fetch(
          'https://marine-api.open-meteo.com/v1/marine?latitude=53.0833&longitude=4.8333&hourly=wave_height&daily=wave_height_max,wave_direction_dominant&timezone=Europe%2FBerlin&past_days=1&forecast_days=1'
        );
      })
      .then((response) => response.json())
      .then((waveData) => {
        if (waveData && waveData.hourly) {
          setWaveData(waveData);
          const newChartData = waveData.hourly.time.map((time, index) => ({
            time: time,
            waveHeight: waveData.hourly.wave_height[index],
          }));
          setWaveChartData(newChartData);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  function convertToDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index];
  }

  let waveDirection;
  if (waveData && waveData.daily) {
    waveDirection = convertToDirection(
      waveData.daily.wave_direction_dominant[1]
    );
  }

  let windDirection;
  if (data && data.daily) {
    windDirection = convertToDirection(
      data.daily.wind_direction_10m_dominant[1]
    );
  }

  function convertSecondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  }

  let sunshineDuration;
  if (data && data.daily && data.daily.sunshine_duration) {
    sunshineDuration = convertSecondsToHoursAndMinutes(
      data.daily.sunshine_duration[1]
    );
  }

  let date;
  if (data && data.daily && data.daily.time[1]) {
    date = DateTime.fromISO(data.daily.time[1]).toFormat('dd. LLL yy');
  }

  return (
    <div className="App">
      <header className="wrapper header">
        <div className="header__logoContainer">
          <h1>waves</h1>
          <h1>wind &</h1>
          <h1> wet weather?!</h1>
        </div>

        <div className="header__locationContainer">
          <Icons.FiMapPin className="header__locationContainer__icon" />
          <div className="header__locationContainer__text">
            <h3>Texel</h3>
            <p>53°04'59.9"N 4°49'59.9"E</p>
          </div>
        </div>
      </header>

      <div className="wrapper bigContainer">
        <div className="contentContainer wavesContainer">
          <h2 id="waves">waves</h2>
          <div className="bubbleContainer">
            <p>wave height - past & next 24h</p>
            <div className="chartContainer">
              <MyLineChart
                data={waveChartData}
                legend={'wave height'}
                unit={'m'}
                dataKey={'waveHeight'}
              />
            </div>
            <div className="dataContainer">
              <div className="dataContainer__data">
                <Icons.PiWaves className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>
                    {' '}
                    {data &&
                      waveData.daily &&
                      waveData.daily.wave_height_max[1]}{' '}
                    m
                  </h3>
                  <p>max wave height ( {date} )</p>
                </div>
              </div>
              <div className="dataContainer__data">
                <Icons.IoCompassOutline className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>{waveDirection}</h3>
                  <p>dominant wave direction ( {date} )</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contentContainer windContainer">
          <h2 id="wind">wind</h2>
          <div className="bubbleContainer">
            <p>wind speed - past & next 24h</p>
            <div className="chartContainer">
              <MyLineChart
                data={windChartData}
                legend={'wind speed'}
                unit={'km/h'}
                dataKey={'windSpeed'}
              />
            </div>
            <div className="dataContainer">
              <div className="dataContainer__data">
                <Icons.WiStrongWind className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>
                    {' '}
                    {data &&
                      data.daily &&
                      data.daily.wind_speed_10m_max[1]}{' '}
                    km/h
                  </h3>
                  <p>max wind speed ( {date} )</p>
                </div>
              </div>
              <div className="dataContainer__data">
                <Icons.IoCompassOutline className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>{windDirection}</h3>
                  <p>dominant wind direction ( {date} )</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contentContainer rainContainer">
          <h2 id="rain">rain</h2>
          <div className="bubbleContainer">
            <p>precipitation - past & next 24h</p>
            <div className="chartContainer">
              {' '}
              <MyBarChart
                data={precipitationChartData}
                legend={'precipitation'}
                unit={'mm'}
                dataKey={'precipitation'}
              />
            </div>
            <div className="dataContainer">
              <div className="dataContainer__data">
                <Icons.WiRain className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>
                    {' '}
                    {data && data.daily && data.daily.precipitation_sum[1]} mm
                  </h3>
                  <p>precipitation sum ( {date} )</p>
                </div>
              </div>
              <div className="dataContainer__data">
                <Icons.WiTime4 className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>
                    {' '}
                    {data && data.daily && data.daily.precipitation_sum[1]} hrs
                  </h3>
                  <p>precipitation hours ( {date} )</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contentContainer temperatureContainer">
          <h2 id="temperature">temperature</h2>
          <div className="bubbleContainer">
            <p>temperature - past & next 24h</p>
            <div className="chartContainer">
              <MyLineChart
                data={temperatureChartData}
                legend={'temperature'}
                unit={'°C'}
                dataKey={'temperature'}
              />
            </div>
            <div className="dataContainer">
              <div className="dataContainer__data">
                <Icons.WiThermometer className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>
                    max {data && data.daily && data.daily.temperature_2m_max[1]}{' '}
                    °C
                  </h3>
                  <p>highest temperature ( {date} )</p>
                </div>
              </div>
              <div className="dataContainer__data">
                <Icons.WiThermometer className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>
                    {' '}
                    min {data &&
                      data.daily &&
                      data.daily.temperature_2m_min[1]}{' '}
                    °C
                  </h3>
                  <p>lowest temperature ( {date} )</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contentContainer sunContainer">
          <h2 id="sun">sun</h2>
          <div className="bubbleContainer">
            <div className="dataContainer">
              <div className="dataContainer__data">
                <Icons.WiSunrise className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>
                    {' '}
                    {data && data.daily && data.daily.sunrise[1].split('T')[1]}
                  </h3>
                  <p>todays sunrise</p>
                </div>
              </div>
              <div className="dataContainer__data">
                <Icons.WiSunset className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>
                    {' '}
                    {data && data.daily && data.daily.sunset[1].split('T')[1]}
                  </h3>
                  <p>todays sunset</p>
                </div>
              </div>
              <div className="dataContainer__data">
                <Icons.WiDaySunny className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3>{sunshineDuration}</h3>
                  <p>todays sunshine duration</p>
                </div>
              </div>
              <div className="dataContainer__data">
                <Icons.BsSunglasses className="dataContainer__icon" />
                <div className="dataContainer__text">
                  <h3> {data && data.daily && data.daily.uv_index_max[1]}</h3>
                  <p>todays UV-index</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="wrapper footer">
        <p className="footer__tom">
          Made with 💙 by{' '}
          <a href="https://www.tomkra.dev" target="_blank">
            Tom Kra
          </a>
        </p>
        <p className="footer__credit">
          Data by{' '}
          <a href="https://open-meteo.com/" target="_blank">
            Open-Meteo API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
