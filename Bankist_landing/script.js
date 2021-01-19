'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn =>  btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Creating and inserting
// .insertAdjacentHTML
// Creates and stores dom element, without displaying it.
const message = document.createElement('div');
const header = document.querySelector('.header')
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies because they are tasty! <button class="btn btn--close-cookie">Got it!</button>';
// Adding HTML element asna first child of the header
// header.prepend(message);
// last child. Append and prepend ar mutually exclusive
header.append(message);
// Cloning node. Passing true will copy the node recursively
// const messageClone = message.cloneNode(true);
// Delete element
// Removes nodes from DOM
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  console.log(message.parentElement);
  message.remove()
})


// got get non-inline styles:
message.style.backgroundColor = '#37383d';
message.style.width = '100vw';
message.style.position = 'fixed';
message.style.bottom = '0';
message.style.zIndex = '1000';
console.log(getComputedStyle(message).color);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 +'px'
// document.documentElement.style.setProperty('--color-primary', 'orangered');




