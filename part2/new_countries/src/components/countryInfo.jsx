import { useEffect, useState } from "react";
import axios from "axios";

export const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const capital = country.capital?.[0];
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }, [capital, apiKey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area}</p>

      <h4>Languages:</h4>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      {weather ? (
        <div style={{ marginTop: "1rem" }}>
          <h3>Weather in {capital}</h3>
          <p>
            <strong>Temperature:</strong> {weather.main.temp} °C
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      ) : null}
    </div>
  );
};
