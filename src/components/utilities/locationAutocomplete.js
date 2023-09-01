import React, { useState } from 'react';
import { GoogleApiWrapper, Autocomplete } from 'google-maps-react';

function PlacesAutocomplete(props) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelected = (place) => {
    // Handle the selected place
    setSelectedPlace(place);
  };

  return (
    <div>
      <Autocomplete
        onPlaceSelected={handlePlaceSelected}
        types={['(regions)']}
      />
      {selectedPlace && (
        <div>
          <h2>Selected Place</h2>
          <p>country : {selectedPlace.country}</p>
          <p>Name: {selectedPlace.name}</p>
          <p>Address: {selectedPlace.formatted_address}</p>
          {/* Add more information as needed */}
        </div>
      )}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.MY_MAPS_API_KEY,
})(PlacesAutocomplete);
