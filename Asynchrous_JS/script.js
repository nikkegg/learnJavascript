'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// multiple ways of making HTTP request.
// 1. Old way:

const renderCountry = (data, className = '') => {
  const html =
    `
    <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
              <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

function getCountryAndNeighbour(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function() {
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    renderCountry(data);

    // Another AJAX call to get neighbouring country
    const [neighbour] = data.borders;
    if (!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function() {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    })
  });
};
// getCountryAndNeighbour('usa');

//2. Modern way - Fetch API;

const request = fetch(`https://restcountries.eu/rest/v2/name/portugal`);
console.log(request);

const getCountryData = function(country) {
  const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(response => response.json()).then(data => renderCountry(data[0]));
}

getCountryData('portugal');
// Promise = an object which is used as a placholder for the future result of asynchrous call.
// Promise lifecycle - pending, fulfilled, rejected.
// Fetch returns a promise, on whih we can call then() method, hich run as soon as promise is fulfilled.
// .json() method is available on all resolved values of the fetch method, i.e on response variable;
