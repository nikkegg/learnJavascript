
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
