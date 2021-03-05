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
let map, mapEvent;
// Setting up GeoLocation API
const geoSuccess = function (position) {
  const { latitude } = position.coords
  const { longitude } = position.coords

  map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  map.on('click', mapE => {
    mapEvent = mapE
    form.classList.remove('hidden');
    inputDistance.focus();
  });
}

const geoFailure = function() {
  alert('Could not get your position')
}

navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure);

// Add marker when user click on the map

form.addEventListener('submit', e => {
  e.preventDefault();
  // Clear input fields
  inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';

  const {lat, lng} = mapEvent.latlng;
  L.marker([lat, lng]).addTo(map).bindPopup(L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup'
      })).setPopupContent('Workout')
        .openPopup();
})

inputType.addEventListener('change', () => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
