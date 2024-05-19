const CountriesList = ({ countries }) => {
  return countries?.map((entry) => {
    return <div key={entry?.name.common}>{entry?.name.common}</div>;
  });
};
export default CountriesList;
