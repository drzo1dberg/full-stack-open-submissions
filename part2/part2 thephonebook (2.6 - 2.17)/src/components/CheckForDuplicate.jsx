const CheckForDuplicate = (first, second) => {
  if (!second.name.length && !second.number.length) {
    window.alert("Enter valid data");
    return true;
  }
  for (const entry of first) {
    if (
      JSON.stringify(entry.name).toLowerCase() ===
        JSON.stringify(second.name).toLowerCase() &&
      second.name.length > 0
    ) {
      return 1;
    }
    if (entry.number === second.number && second.number.length > 0) {
      window.alert(`The number ${second.number} is already added to phonebook`);
      return true;
    }
  }
  return false;
};
export default CheckForDuplicate;
