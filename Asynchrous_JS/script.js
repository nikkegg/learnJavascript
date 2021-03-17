'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// multiple ways of making HTTP request.
// 1. Old way:
const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}

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

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function(country) {
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found').then(data => {
    renderCountry(data[0]);
    const [neighbour] = data[0].borders;
    if (!neighbour) throw new Error('No neighbours found');
    return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found')
  }).then(data => renderCountry(data, 'neighbour')).catch(err => {
    console.log(`${err} Failed to fetch!`);
    renderError(`Something went wrong ${err.message}. Try again!`);
  }).finally(() => {
    countriesContainer.style.opacity = 1;
  })
};
// Promise = an object which is used as a placholder for the future result of asynchrous call.
// Promise lifecycle - pending, fulfilled, rejected.
// Fetch returns a promise, on whih we can call then() method, hich run as soon as promise is fulfilled. catch() is called hen promise is rejected. finally() is called always!
// .json() method is available on all resolved values of the fetch method, i.e on response variable;
// can add catch to the promise chain to handle error.
// Error handling in promises

const whereAmI = function(lat, lng) {
  return fetch(`https://geocode.xyz/${lat},${lng}?json=1`).then(response => {
    if (!response.ok) throw new Error(`Too many requests per second. Status: ${response.status}`);
    return response.json();
  }).then(data => {
    console.log(`You are in ${data.country}, ${data.city}`);
    return data.country;
  }).catch(err => {
    console.log(`Something went wrong: ${err.message}.`);
  })
}


// getCountryData('asasvasvas');

// Event loop in practice. Belo demonstrates how microtask queue get priority over callback queue. Order of execution is: first console log, last console.log
// promise, setTimeout callback
// If we add second promise, we can see that callbacks using timer can take much longer than specified time - this is because promises geet prioritised first
// in microtask queue.
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(response => console.log(response));
// Promise.resolve('Resolve promise 2').then(response => {
  //   for (let i = 0; i < 10000000000; i++) {}
  //   console.log(response);
  // })
  // console.log('Test end');

  btn.addEventListener('click', function() {
    const country = [whereAmI(52.508, 13.381), whereAmI(40.037, 34.873), whereAmI(-33.933, 18.474)];
    country.forEach(country => country.then(result => getCountryData(result)))
  });

  // Creating promises

  // const lotteryPromise = new Promise(function(resolve, reject) {
  //   console.log('Lottery draw is happening!');
  //   setTimeout(function() {
  //   if (Math.random() >= 0.5) {
  //     resolve('You WIN!');
  //   } else {
  //     reject(new Error('You lost!'));
  //   }}, 2000)
  // });

// lotteryPromise.then(resp => console.log(resp)).catch(err => console.log(err));

// Example of 'promisifying'. The benefit of beloew is that you escape callback hell, as you can return promise at each stage and chaing another promise in a linear way.

// const wait = function(seconds) {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
// .then(() => {
//   console.log('i waited for 2 seconds');
//   return wait(3)
// })
// .then(() => console.log('I waited for 3 seconds'));

// Creating fulffiled/rejected promises immediaitely
// Promise.resolve('abc').then(resp => console.log(resp)); // creates resolved promise, argument is returned value
// Promise.reject(new Error('abs')).catch(err => console.log(err));

// clearly geolocation api works in async way - console.log appears first.
// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.log(err));
// console.log('Getting position');

const getPosition = function() {
  return new Promise(function(resolve, reject) {
    // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err));
    // a simpler way:
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(res => {
  const {latitude, longitude} = res.coords
  return [latitude, longitude]
}).then(res => whereAmI(res)).then(res => getCountryData(res));
