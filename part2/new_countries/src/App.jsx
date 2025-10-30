import { useState, useEffect } from "react";
import axios from "axios";
import { CountryInfo } from "./components/countryInfo";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  return (
    <>
      <div>
        Find countries <input value={search} onChange={handleSearch} />
        {search && filtered.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {filtered.length <= 10 && filtered.length > 1 && (
          <>
            {filtered.map((country) => (
              <p key={country.cca3}>{country.name.common}</p>
            ))}
          </>
        )}
        {filtered.length === 1 && <CountryInfo country={filtered[0]} />}
      </div>
    </>
  );
}

export default App;
