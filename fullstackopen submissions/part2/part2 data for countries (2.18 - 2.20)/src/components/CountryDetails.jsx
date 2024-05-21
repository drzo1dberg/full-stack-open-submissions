const CountryDetails = ({ country }) => {
  const languageList = Object.entries(country[0]?.languages);
  const flag = country[0]?.flags;
  return country.map((entry) => {
    return (
      <div key={entry.name.common}>
        <h1>{entry.name?.common}</h1>
        <p>capital {entry.capital}</p>
        <p>area {entry.area}</p>
        <br />
        <h2>languages:</h2>
        <ul>
          {languageList.length > 0 &&
            languageList.map(([code, name]) => <li key={code}> {name} </li>)}
        </ul>
        <img src={flag.png} alt={flag.alt} />
      </div>
    );
  });
};
export default CountryDetails;
