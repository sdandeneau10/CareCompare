import {AxiosInstance as axios} from "axios";

function geocode(loc){
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: loc,
        key: 'AIzaSyAwzRGaPm9KP5ZjKvNs5qhFs3p0wePaI4c'
      }
    })
      .then(function (response) {
        const coordinates = response.data.results[0].geometry.location;
        return coordinates;
      })
      .catch(function (error) {
        console.log(error);
      });
};
