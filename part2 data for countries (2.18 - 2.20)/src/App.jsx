import { useEffect, useState } from "react";
import countriesSrv from "./services/countries";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
const App = () => {
  const [query, setQuery] = useState(null);
  const [filteredCountries, setFiltCount] = useState(null);
  const [countries, setCountries] = useState(null);
  useEffect(() => {
    countriesSrv.getAll().then((data) => setCountries(data));
  }, []);
  useEffect(() => {
    setFiltCount(
      countries !== null &&
        countries.filter((ln) =>
          JSON.stringify(ln).toLowerCase().includes(query)
        )
    );
  }, [countries, query]);
  const handleSearch = (e) => {
    setQuery(e.target.value);
    !e.target.value.length && setFiltCount(countries);
  };
  return (
    <div>
      <p>find countries </p> <input type="search" onChange={handleSearch} />
      {!query || query == " " || query == null ? (
        <CountriesList countries={countries} />
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries} />
      ) : filteredCountries.length > 10 || !filteredCountries.length ? (
        <p>too many matches, specify more filter</p>
      ) : (
        <CountriesList countries={filteredCountries} />
      )}
    </div>
  );
};
export default App;
