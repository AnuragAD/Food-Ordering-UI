import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { PLACE_AUTOCOMPLETE_URL } from "./constants";

let timeOutInterval;
const AutoComplete = ({ placeSelect }) => {
  const [locationAutoComplete, setLocationAutoComplete] = useState([]);

  async function handleSearch(query) {
    if (timeOutInterval) {
      clearInterval(timeOutInterval);
    }
    timeOutInterval = setTimeout(async () => {
      if (!query) return;
      const response = await fetch(PLACE_AUTOCOMPLETE_URL+query+"&types=");
      const autoComplete = await response.json();
      setLocationAutoComplete(autoComplete.data);
    }, 750);
  }
  return (
    <div className="">
      <Autocomplete
        id="autoComplete"
        autoFocus
        size="small"
        disablePortal
        noOptionsText={"No Restaurants found"}
        onInputChange={(event, newValue) => handleSearch(newValue)}
        options={locationAutoComplete}
        getOptionLabel={(rows) => rows.description}
        renderInput={(param) => (
          <TextField
            className="autoCompleteTextField"
            {...param}
            label="Search for area, street name... "
          />
        )}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={(event, newValue) => placeSelect(newValue)}
        sx={{ width: 400, mr: "10px" }}
      />
    </div>
  );
};

export default AutoComplete;
