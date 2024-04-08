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
            time: Number(new Date(time).getHours()),
            windSpeed: data.hourly.wind_speed_10m[index],
          }));
          setWindChartData(newChartData);
        }
        if (data && data.hourly) {
          const newChartData = data.hourly.time.map((time, index) => ({
            time: Number(new Date(time).getHours()),
            precipitation: data.hourly.precipitation[index],
          }));
          setPrecipitationChartData(newChartData);
        }
        if (data && data.daily) {
          const newChartData = data.hourly.time.map((time, index) => ({
            time: Number(new Date(time).getHours()),
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
            time: Number(new Date(time).getHours()),
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
      <h1>waves, wind & wet weather?!</h1>

      <div className="locationContainer">
        <p>Texel</p>
        <p>53°04'59.9"N 4°49'59.9"E</p>
      </div>

      <div className="wavesContainer">
        <h2 id="waves">waves</h2>
        <div className="bubbleContainer">
          <p>wave height - last & next 24h</p>
          <div className="chartContainer">
            <MyLineChart
              data={waveChartData}
              legend={'wave height'}
              unit={'m'}
              dataKey={'waveHeight'}
            />
          </div>
          <div className="dataContainer">
            <div className="data">
              <Icons.PiWaves />
              <h3>
                {' '}
                {data && waveData.daily && waveData.daily.wave_height_max[1]} m
              </h3>
              <p>max wave height ( {date} )</p>
            </div>
            <div className="data">
              <Icons.IoCompassOutline />
              <h3>{waveDirection}</h3>
              <p>dominant wave direction ( {date} )</p>
            </div>
          </div>
        </div>
      </div>

      <div className="windContainer">
        <h2 id="wind">wind</h2>
        <div className="bubbleContainer">
          <p>wave height - last & next 24h</p>
          <div className="chartContainer">
            <MyLineChart
              data={waveChartData}
              legend={'wave height'}
              unit={'m'}
              dataKey={'waveHeight'}
            />
          </div>
          <div className="dataContainer">
            <div className="data">
              <Icons.WiStrongWind />
              <h3>
                {' '}
                {data && data.daily && data.daily.wind_speed_10m_max[1]} km/h
              </h3>
              <p>max wind speed ( {date} )</p>
            </div>
            <div className="data">
              <Icons.IoCompassOutline />
              <h3>{windDirection}</h3>
              <p>dominant wind direction ( {date} )</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rainContainer">
        <h2 id="rain">rain</h2>
        <div className="bubbleContainer">
          <p>wave height - last & next 24h</p>
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
            <div className="data">
              <Icons.WiRain />
              <h3>
                {' '}
                {data && data.daily && data.daily.precipitation_sum[1]} mm
              </h3>
              <p>precipitation sum ( {date} )</p>
            </div>
            <div className="data">
              <Icons.WiTime4 />
              <h3>
                {' '}
                {data && data.daily && data.daily.precipitation_sum[1]} hrs
              </h3>
              <p>precipitation hours ( {date} )</p>
            </div>
          </div>
        </div>
      </div>

      <div className="temperatureContainer">
        <h2 id="temperature">temperature</h2>
        <div className="bubbleContainer">
          <p>wave height - last & next 24h</p>
          <div className="chartContainer">
            <MyLineChart
              data={temperatureChartData}
              legend={'temperature'}
              unit={'°C'}
              dataKey={'temperature'}
            />
          </div>
          <div className="dataContainer">
            <div className="data">
              <Icons.WiThermometer />
              <h3>
                max {data && data.daily && data.daily.temperature_2m_max[1]} °C
              </h3>
              <p>highest temperature ( {date} )</p>
            </div>
            <div className="data">
              <Icons.WiThermometer />
              <h3>
                {' '}
                min {data && data.daily && data.daily.temperature_2m_min[1]} °C
              </h3>
              <p>lowest temperature ( {date} )</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sunContainer">
        <h2 id="sun">sun</h2>
        <div className="dataContainer">
          <div className="data">
            <Icons.WiSunrise />
            <h3>
              {' '}
              {data && data.daily && data.daily.sunrise[1].split('T')[1]}
            </h3>
            <p>todays sunrise</p>
          </div>
          <div className="data">
            <Icons.WiSunset />
            <h3> {data && data.daily && data.daily.sunset[1].split('T')[1]}</h3>
            <p>todays sunset</p>
          </div>
          <div className="data">
            <Icons.WiDaySunny />

            <h3>{sunshineDuration}</h3>
            <p>todays sunshine duration</p>
          </div>
          <div className="data">
            <Icons.BsSunglasses />
            <h3> {data && data.daily && data.daily.uv_index_max[1]}</h3>
            <p>todays UV-index</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
