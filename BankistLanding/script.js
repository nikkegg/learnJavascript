'use strict';

// Declarations
const select = item => document.querySelector(item);
const modal = select('.modal');
const overlay = select('.overlay');
const btnCloseModal = select('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = select('.btn--scroll-to');
const section1 = select('#section--1');


///////////////////////////////////////


// Modal windows
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

// Cookie message
const message = document.createElement('div');
const header = select('.header')
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies because they are tasty! <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
select('.btn--close-cookie').addEventListener('click',
  () => {
    message.remove()
  })

message.style.backgroundColor = '#37383d';
message.style.width = '100vw';
message.style.position = 'fixed';
message.style.bottom = '0';
message.style.zIndex = '1000';
message.style.height = Number.parseFloat(getComputedStyle(message).height,
  10) + 40 + 'px'

// 'Learn more' link smooth scrolling
// Adding scrolling. Coordinates to which to scoll to are given by top/left of the section1 + the 
// amount scrolled already. This is because getBoundingClientRect is relevant to the top of the 
// of the viewport and not to the top of the page.
// Number of pixels scrolled to the left and right is given by window.pageX/YOffset

btnScrollTo.addEventListener('click', (e) => {
  const s1Coordinates = section1.getBoundingClientRect();
  window.scrollTo({
    top: s1Coordinates.top + window.pageYOffset,
    left: s1Coordinates.left + window.pageXOffset,
    behavior: 'smooth'
  });
})

// Page navigation. Not efficient solution, as it is using a loop
// and copying the same functionality.

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = e.currentTarget.getAttribute('href');
//     const coordinates = select(id).getBoundingClientRect();
//     window.scrollTo({top: coordinates.top + window.pageYOffset, left: coordinates.left + window.pageXOffset, behavior: 'smooth'});
//   })
// })

// Same functionality but using event delegation and bubbling.
// In here we attach event listener to the common parent element,
// The fi d out where event happend  y using e.target,
// and scroll to the id given in the href of this element.
select('.nav__links').addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.target.getAttribute('href');
      const coordinates = select(id).getBoundingClientRect();
      window.scrollTo({
        top: coordinates.top + window.pageYOffset,
        left: coordinates
          .left + window.pageXOffset,
        behavior: 'smooth'
      });
})












