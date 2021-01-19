
// Select, create, delete


// Select entire page - from opening html to closing </html> tags
// Syntax below is equivalent to querySelector for given
// DOM elements.

console.log(document.documentElement)

console.log(document.body)
// below return HTML collection - gets updated in console when you work with
// HtML automatically. This is different from Node list which is static.
const allButtons = document.getElementsByTagName('button');
console.log(allButtons)

// Setting document properties 
// document.documentElement.style.setProperty('--color-primary', 'orangered');
// Attributes


const logo = document.querySelector('.nav__logo');
console.log(logo.src);
// To get a class
console.log(logo.className);
// to obtain non absolute src/href use elemnt.getAttribute('src') instead of elemnt.src
// To acces data-attributes;
// element.dataset.camelCasedAttributeName

// Classes

// logo.classList.add('c1', 'c2'...)
// logo.classList.remove('')
// logo.classList.toggle('')
// logo.classList.contains('className')


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

// to get x,y coordinates of the window when scrolled from the top:

// window.pageXOffset
// Height/width of the viewport
// document.documentElement.clientHeight
// document.documentElement.clientWidth 
