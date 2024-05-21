const Search = (obj, query) =>
    obj.filter((line) =>
      JSON.stringify(line).toLowerCase().includes(query.toLowerCase())
    );
export default Search