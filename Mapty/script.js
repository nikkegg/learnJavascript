'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const mapContainer = document.querySelector('#map');

// Setting up GeoLocation API
const geoSuccess = function (position) {
  const { latitude } = position.coords
  const { longitude } = position.coords

  const map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([latitude, longitude]).addTo(map)
    .bindPopup('Your current location ✅')
    .openPopup();

    map.on('click', mapEvent => {
      const {lat, lng} = mapEvent.latlng;
      L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup'
      })).setPopupContent('Workout')
        .openPopup();
    })
}

const geoFailure = function() {
  alert('Could not get your position')
}

navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure);

// Add marker when user click on the map
