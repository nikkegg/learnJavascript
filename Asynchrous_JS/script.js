'use strict';

const btn = document.querySelector('.btn-country');
btn.style.display = 'none';
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images')
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

// const whereAmI = function(lat, lng) {
//   return fetch(`https://geocode.xyz/${lat},${lng}?json=1`).then(response => {
//     if (!response.ok) throw new Error(`Too many requests per second. Status: ${response.status}`);
//     return response.json();
//   }).then(data => {
//     console.log(`You are in ${data.country}, ${data.city}`);
//     return data.country;
//   }).catch(err => {
//     console.log(`Something went wrong: ${err.message}.`);
//   })
// }


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

  // btn.addEventListener('click', function() {
  //   const country = [whereAmI(52.508, 13.381), whereAmI(40.037, 34.873), whereAmI(-33.933, 18.474)];
  //   country.forEach(country => country.then(result => getCountryData(result)))
  // });

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

const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

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

// getPosition().then(res => {
//   const {latitude, longitude} = res.coords
//   return [latitude, longitude]
// }).then(res => whereAmI(res)).then(res => getCountryData(res));
let currentImg;
const createImage = imgPath => {
  return new Promise(function(resolve, reject) {
    const img = document.createElement('img');
    img.src = `/img/${imgPath}`;
    img.addEventListener('load', function() {
      images.append(img);
      resolve(img);
    })
    img.addEventListener('error', function () {
      reject(new Error('Something went wrong'));
    })
  });
}
// createImage('img-1.jpg')
// .then(img => {
//   currentImg = img;
//   return wait(2)
// })
// .then(() => {
//   currentImg.style.display = 'none';
//   return createImage('img-2.jpg');
// })
// .then(img => {
//     currentImg = img;
//     return wait(2)
//   })
// .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img-3.jpg');
//   })
// .then(response => wait(2))
// .then(() => currentImg.style.display ='none')
// .catch(err => console.error(err.message))


// Async await
// Async makes functions execute asynchrounsly and return a Promise.
// await statement = reuqires a Promise. Stops execution of the function until promise is fulfilled. The reason why this is still non-blocking is because of the async keyword - it does not run on main execution thread.
// So inside the async function code is beign executed synchronously, which is why console.log are appear in th4 same order as they were written
// Basically await provides convinient way of extracting values of the Promises. But it onlt works this way inside async function! If you store value of async function in a varibale, you will get a PRomise.


// const test = async function(country) {
//   await fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(resp => console.log('pum'));
//   console.log('lalala')
//   console.log('purum')
// }

// test('Portugal')
// console.log('Proof that function test is async');

const whereAmI = async function(country) {
  try {
  const myCoordinates = await getPosition();
  const { latitude: lat, longitude: lng } = myCoordinates.coords;
  const myCountryResp = await (await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`))
  if (!myCountryResp.ok) {
    throw new Error('Cant find the country pumpurum');
  }
  const myCountryJSON = await myCountryResp.json();
  getCountryData(myCountryJSON.country);
  return 'Experiment'
  } catch (err) {
    console.error(err);
    renderError(`${err.message}`);

    // Reject promise returned from the async function. Do this so you can catch it with catch handler/
    throw err;
  }
}


// Returning values from async functions. If you try and store value of asyn function into variable, you will get a promise (container which you can not use). So if you want to get value out of the promise you have to chain then or use immedistely invoked functions expressions..

// handling with then
const city = whereAmI();
console.log('1: Will get location');
whereAmI().then(resp => console.log(resp)).catch(err => console.error(`2. ${err.message}`)).finally(() => console.log('3: Finished getting location'));
// handlin with IIFEs

// (async function() {
//   try {
//     console.log('1: Will get location');
//     const location = await whereAmI();
//     console.log(`2. ${location}`)
//   } catch(err) {
//       console.error(`2. ${err.message}`)
//   }
//   console.log('3: Finished getting location')
// })()



// Below promises run sequentially because of await. However it is possible to run them in parallel using Promise.all. You can see the difference by inspecting Chromes Network tab - request for all 3 countries runs in parallel
// Important note Promise.all shortcuits if one of the promises rejects. If this is undesired behaviour, use Promise.allSettled instead, which behaves the same Promise.all but does not shortcircuit if one of the promises gets rejected.
const get3Countries = async function(c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
    ]);
    console.log(data);
  } catch(err) {
    console.log(err);
  }
}

// get3Countries('tanzania', 'portugal', 'russia')

// Promise combinators: race, settled, any/
// Resulting value of Promise.race is the first resolved promise. Race shortcuits if one of the Promises is rejected.
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexico`)
//   ]);
//   console.log(res[0]);
// })();

// With the timeout function below, canuse race when calling a promise - if it takes too long for promise to be fulfilled (e.g user has slow minternet connection, the fetch will be aborted with rejection from timeout function.)
const timeout = function(sec) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
     reject(new Error('Request took too long'));
    }, sec * 1000);
  })
}

// Promise.race([getJSON(`https://restcountries.eu/rest/v2/name/italy`), timeout(0.2)]).then(resp => console.log(resp[0])).catch(err => console.error(err.message));

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success')
// ]).then(res => console.log(res));

// Coding challenge 2
const loadAll = async function(images) {
  const imgs = images.map(image => createImage(image));
  // const imgs = images.map(async image => await createImage(image));
  const data = await Promise.all(imgs);
  data.forEach(dataPoint => dataPoint.classList.add('parallel'))
}

loadAll(['img-1.jpg', 'img-2.jpg', 'img-3.jpg']);
