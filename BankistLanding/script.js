'use strict';

// Helper functions
const select = item => document.querySelector(item);

// Declarations

// Modal
const modal = select('.modal');
const overlay = select('.overlay');
const btnCloseModal = select('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Smooth scrolling to an element
const btnScrollTo = select('.btn--scroll-to');
const section1 = select('#section--1');

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = select('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Navigation fade effect
const nav = select('.nav');

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
// Then find out where event happend  y using e.target,
// and scroll to the id given in the href of this element.
select('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const coordinates = select(id).getBoundingClientRect();
    window.scrollTo({
      top: coordinates.top + window.pageYOffset,
      left: coordinates
        .left + window.pageXOffset,
      behavior: 'smooth'
    });
  }
})

// Tabbed component

tabsContainer.addEventListener('click', e => {
  // Find clicked tab
  const clicked = e.target.closest('.btn');
  if (!clicked) return;
  // Activate tab
  tabs.forEach(tab => tab.classList.remove(
    'operations__tab--active'))
  clicked.classList.add('operations__tab--active');
  // Activate content area
  tabsContent.forEach(c => c.classList.remove(
    'operations__content--active'));
  select(`.operations__content--${clicked.dataset.tab}`).classList.add(
    'operations__content--active');
});

// Nav fade effect
// Using mousover, because mousenter does not bubble.
const handleHover = function(e) {
    if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll(
      '.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(sibling => {
      if (sibling != link) sibling.style.opacity = this;
      if (sibling != logo) logo.style.opacity = this;
    })
  }
}
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
