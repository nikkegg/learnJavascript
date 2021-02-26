'use strict';

const Person = function(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this. Every instance will have the same code for this function. Better to use prototypes.
//   this.calcAge = () => {
//     console.log(2037 - this.birthYear)
//   }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas);
console.log(jonas.birthYear);

// behind the scenes of new operator
// 1. Empty object {} is created
// 2. Function is called and this = {}
// 3. {} is linked to a prototype
// 4. {} which was created is returned, which is usually not empty

console.log(jonas instanceof Person);

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge()

console.log(jonas.__proto__)
console.log(jonas.__proto__ === Person.prototype)
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));
// not property of object, so not own property, but rather a property of a prototype.
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.hasOwnProperty('species'));
console.log(jonas.hasOwnProperty('firstName'));

// Every object (e.g PErson) also has Object.protptye method available to it.
// This is where __proto__ andhasOwnProperty methods come from.
console.log(jonas.__proto__.__proto__)
console.dir(Person.prototype.constructor)

// Prototypes of Array. Creating array with array literals is just a shorthand for
//  const a = new Array
const arr = [3, 6, 4, 5, 6, 9, 3, 9, 9]
console.log(arr.__proto__)
console.log(arr.__proto__ === Array.prototype)

// Having prototype mechanism allows to easily add custom methods to existing object classes in JS! Below example of custom unique method:

Array.prototype.unique = function() {
  return [...new Set(this)]
}

console.log(arr.unique())

const h1 = document.querySelector('h1');
console.dir(h1)

// Coding Challenge 1

const Car = function(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function() {
  this.speed += 10
  console.log(this.speed)
}

Car.prototype.break = function () {
  this.speed -= 5
  console.log(this.speed)
}

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedez', 95);
console.log(car1, car2);
car1.break();
car2.accelerate();
