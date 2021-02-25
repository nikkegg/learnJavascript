'use strict';

const Person = function(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this. Every instance will have the same code for this function. Better to use prototypes.
  this.calcAge = () => {
    console.log(2037 - this.birthYear)
  }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas)
console.log(jonas.birthYear)

// behind the scenes of new operator
// 1. Empty object {} is created
// 2. Function is called and this = {}
// 3. {} is linked to a prototype
// 4. {} which was created is returned, which is usually not empty

console.log(jonas instanceof Person)
