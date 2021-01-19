'use strict';

///////////////////////////////////////
// Modal window
const select = item => document.querySelector(item);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Creating and inserting
// .insertAdjacentHTML
// Creates and stores dom element for cookie message, without displaying it.
const message = document.createElement('div');
const header = document.querySelector('.header')
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies because they are tasty! <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click',
  () => {
    console.log(message.parentElement);
    message.remove()
  })

// Adding cookie message
message.style.backgroundColor = '#37383d';
message.style.width = '100vw';
message.style.position = 'fixed';
message.style.bottom = '0';
message.style.zIndex = '1000';
message.style.height = Number.parseFloat(getComputedStyle(message).height,
  10) + 40 + 'px'

// Adding scrolling. Coordinates to which to scoll to are given by top/left of the section1 + the 
// amount scrolled already. This is because getBoundingClientRect is relevant to the top of the 
// of the viewport and not to the top of the page.
// Number of pixels scrolled to the left and right is given by window.pageX/YOffset
const btnScrollTo = select('.btn--scroll-to');
const section1 = select('#section--1');
btnScrollTo.addEventListener('click', (e) => {
  const s1Coordinates = section1.getBoundingClientRect();
  window.scrollTo({
    top: s1Coordinates.top + window.pageYOffset,
    left: s1Coordinates.left + window.pageXOffset,
    behavior: 'smooth'
  });
})
