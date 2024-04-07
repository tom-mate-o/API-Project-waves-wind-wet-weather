import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=53.0833&longitude=4.8333&hourly=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,sunshine_duration,uv_index_max,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FBerlin&past_days=1&forecast_days=1'
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

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
          <div className="chartContainer">Chart</div>
          <div className="dataContainer">
            <div className="data">
              <p>ICON</p>
              <h3>3.12m</h3>
              <p>max wave height ( last 24h )</p>
            </div>
            <div className="data">
              <p>ICON</p>
              <h3>East</h3>
              <p>dominant wave direction ( last 24h )</p>
            </div>
          </div>
        </div>
      </div>

      <div className="windContainer">
        <h2 id="wind">wind</h2>
        <div className="bubbleContainer">
          <p>wave height - last & next 24h</p>
          <div className="chartContainer">Chart</div>
          <div className="dataContainer">
            <div className="data">
              <p>ICON</p>
              <h3>3.12m</h3>
              <p>max wave height ( last 24h )</p>
            </div>
            <div className="data">
              <p>ICON</p>
              <h3>East</h3>
              <p>dominant wave direction ( last 24h )</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rainContainer">
        <h2 id="rain">rain</h2>
        <div className="bubbleContainer">
          <p>wave height - last & next 24h</p>
          <div className="chartContainer">Chart</div>
          <div className="dataContainer">
            <div className="data">
              <p>ICON</p>
              <h3>3.12m</h3>
              <p>max wave height ( last 24h )</p>
            </div>
            <div className="data">
              <p>ICON</p>
              <h3>East</h3>
              <p>dominant wave direction ( last 24h )</p>
            </div>
          </div>
        </div>
      </div>

      <div className="temperatureContainer">
        <h2 id="temperature">temperature</h2>
        <div className="bubbleContainer">
          <p>wave height - last & next 24h</p>
          <div className="chartContainer">Chart</div>
          <div className="dataContainer">
            <div className="data">
              <p>ICON</p>
              <h3>
                max {data && data.daily && data.daily.temperature_2m_max[1]}°C
              </h3>
              <p>highest temperature ( last 24h )</p>
            </div>
            <div className="data">
              <p>ICON</p>
              <h3>
                {' '}
                min {data && data.daily && data.daily.temperature_2m_min[1]}°C
              </h3>
              <p>lowest temperature ( last 24h )</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sunContainer">
        <h2 id="sun">sun</h2>
        <div className="dataContainer">
          <div className="data">
            <p>ICON</p>
            <h3> {data && data.daily && data.daily.sunrise[1]}</h3>
            <p>todays sunrise</p>
          </div>
          <div className="data">
            <p>ICON</p>
            <h3> {data && data.daily && data.daily.sunset[1]}</h3>
            <p>todays sunset</p>
          </div>
          <div className="data">
            <p>ICON</p>
            {/* sekunden */}
            <h3> {data && data.daily && data.daily.sunshine_duration[1]}</h3>
            <p>todays sunshine duration</p>
          </div>
          <div className="data">
            <p>ICON</p>
            <h3> {data && data.daily && data.daily.uv_index_max[1]}</h3>
            <p>todays UV-index</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
