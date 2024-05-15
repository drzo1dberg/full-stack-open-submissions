const AreTheseObjectsEqual = (first, second) => {
    for (const entry of first) {
      if (
        JSON.stringify(entry.name).toLowerCase() ===
          JSON.stringify(second.name).toLowerCase() &&
        second.name.length > 0
      ) {
        window.alert(`${second.name} is already added to phonebook`);
        return true;
      } else if (
        JSON.stringify(entry.number) === JSON.stringify(second.number) &&
        second.number.length > 0
      ) {
        window.alert(`The number ${second.number} is already added to phonebook`);
        return true;
      } else if (second.name.length <= 0 && second.number.length <= 0) {
        window.alert("enter valid data");
        return true;
      }
    }
    return false;
  };
export default AreTheseObjectsEqual