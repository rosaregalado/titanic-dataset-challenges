// ================================================================

// Titanic Dataset challenges! 

// Your goal is to write some functions that will extract
// relevant data from the dataset. 

// Write your code here in this file. 

// *************************************
// Test your code by running: `npm test`
// *************************************

// Each of the functions below expects to receive the Titanic data
// as the parameter data. Your goal is to extract the relevant 
// piece of information from the data and return it. 

// ===============================================================

// ---------------------------------------------------------------
// 1 -------------------------------------------------------------
// Return an array of all the values in data for a given property
// For example if property = 'fare' the output should be a list of 
// all fares something like: [7.3125, 15.75, 7.775, 10.5, ...]
// Or if property = 'age' -> [40, 26, 22, 28, 23, 45, 21, ...]

const getAllValuesForProperty = (data, property) => {
	// const values = [];
	// for (const passenger of data) {
	// 	const value = passenger[property];
	// 	values.push(value);
	// }
	// return values;
	return data.map((p) => {return p.fields[property]})
}

// 2 -------------------------------------------------------------
// Return an array where a given property matches the given value
// For example property = 'sex' and value = 'male' returns an 
// array of all the male passengers [{...}, {...}, {...}, ...]
// Here the goal is to return an array of passenger objects 
// that patch the property and value. 

const filterByProperty = (data, property, value) => {
	// const filteredPassengers = [];
  // for (const passenger of data) {
  //   if (passenger[property] === value) {
  //     filteredPassengers.push(passenger);
  //   }
  // }
	// return filteredPassengers;
	return data.filter((p) => {return p.fields[property] === value})
}

// 3 -------------------------------------------------------------
// Filter out missing values
// Return an array where the objects that have undefined for a 
// given property have been removed

const filterNullForProperty = (data, property) => {
	const filteredData = data.filter(passenger => passenger.fields[property] !== undefined);
  return filteredData;
}

// 4 -------------------------------------------------------------
// Abstract the sum by creating a function that returns the sum 
// for any (numeric) property
// Return the total of all values for a given property.
// You need to remove any missing values because n + undefined = NaN!

const sumAllProperty = (data, property) => {
	const filteredData = data.filter(p => p.fields[property] !== undefined);
	return filteredData.reduce((acc, p) => acc + p.fields[property], 0)
	// let sum = 0;
  // for (const passenger of data) {
  //   const value = passenger[property];
  //   if (typeof value === 'number') {
  //     sum += value;
  //   }
  // }
  // return sum;
}


// 5 -------------------------------------------------------------
// Count unique values for property. The goal here is return an 
// object with keys equal to the unique values for a property and
// values equal to the number of times that property appears. For
// example the embarked property has three unique values: S, C, 
// and Q, and a couple passengers have undefined for this property. 
// So the output should be: { S: 644, C: 168, Q: 77, undefined: 2 }
// That is 644 passengers embarked at South Hampton. 168 embarked 
// at Cherbourg, 77 emabrked at Queenstown, and 2 are undedfined

const countAllProperty = (data, property) => {
	// const counts = {};
  // for (const passenger of data) {
  //   const value = passenger[property];
  //   if (counts[value] === undefined) {
  //     counts[value] = 0;
  //   }
  //   counts[value]++;
  // }
	// return counts;
	const filteredData = data.map(p => p.fields[property]);
	return filteredData.reduce((counts, v) => {
		if (counts[v] === undefined) {
			counts[v] = 1;
		} else {
			counts[v]++;
		}
		return counts;
	}, {})
}

// Use reduce with an object as the starting accumulator! 


// 6 ------------------------------------------------------------
// Make histogram. The goal is to return an array with values 
// of a properties divided into buckets and counting the number
// of items in each bucket.
// step is the value division. For example if step were 10 and the 
// property was age. You would be counting how many passengers were 
// ages 0 - 10, 10 - 20, 20 - 30 etc. 

const makeHistogram = (data, property, step) => {
	// const histogram = [];
  // for (let i = 0; i < data.length; i++) {
  //   const value = data[i][property];
  //   const bucket = Math.floor(value / step);
  //   if (histogram[bucket] === undefined) {
  //     histogram[bucket] = 0;
  //   }
  //   histogram[bucket]++;
  // }
	// return histogram;
	const filteredData = data.filter(p => p.fields[property] !== undefined).map(p => p.fields[property]);
	const histogram = [];
	for (let i = 0; i < filteredData.length; i++) {
		const index = Math.floor(filteredData[i] / step);
		if (histogram[index] === undefined) {
			histogram[index] = 1;
		} else {
			histogram[index]++;
		}
	}
	return Array.from(histogram, v => v || 0);
}

// Note! There may not be no values for a particular step. For example
// if we get passenger ages in increments of 5 there are 0 passengers in the 
// 70 bracket but there are passengers in 60, and 80. So you might end up with 
// Age bucket
//   5 10 15 20  25  30 35 40 45 50 55 60 65 70 75            80  85
// [40,22,16,86,114,106,95,72,48,41,32,16,15, 4, 6,<1 empty item>, 1]
// There are 0 passengers in the 76 to 80 year age bucket. You may have the 
// right answer but if that slot in the array is empty the test will fail 
// becuase that index should show 0. There are 0 passengers in that age range. 


// 7 ------------------------------------------------------------
// normalizeProperty takes data and a property and returns an 
// array of normalized values. To normalize the values you need
// to divide each value by the maximum value in the array.

const normalizeProperty = (data, property) => {
	const filtered = data.filter((p) => {return p.fields[property] !== undefined}).map((p) => {return p.fields[property]}) 
	const max = Math.max(...filtered)
	return filtered.map((v) => {return v / max})
	// const normalizedValues = [];
  // let maxValue = Number.MIN_VALUE;
  // for (const passenger of data) {
  //   const value = passenger[property];
  //   if (value > maxValue) {
  //     maxValue = value;
  //   }
  // }
  // for (const passenger of data) {
  //   const value = passenger[property];
  //   const normalizedValue = value / maxValue;
  //   normalizedValues.push(normalizedValue);
  // }
	// return normalizedValues;
	
}

// Normalizing is an important process that can make many other
// operations easier. Normalizing allows you to take numbers in one 
// range and convert them to any other range. 
// For this example you need to find the max value first before 
// generating an array of normalized values.

// If the range of data included negative numbers or did not start at 0
// we might also need to find the minimum value. 

// 8 ------------------------------------------------------------
// Write a function that gets all unique values for a property. 
// Given the array of data and a property string it should return
// an array of all of the unique values under that property. 
// For example if the property string were "sex" this function 
// would return ['male', 'female']

const getUniqueValues = (data, property) => {
	// const uniqueValues = new Set();
  // for (const passenger of data) {
  //   const value = passenger[property];
  //   uniqueValues.add(value);
  // }
	// return Array.from(uniqueValues);
	const values = data.filter(p => p.fields[property] !== undefined).map(p => p.fields[property]);
	const unique = new Set(values);
	return Array.from(unique)
}

// There are a couple ways to do this. 
// Use an object and add each value as a key. The value can be anything. 
// Use a Set. Be sure to convert this to an array before returning! 

// --------------------------------------------------------------
// --------------------------------------------------------------
module.exports = {
	getAllValuesForProperty,
	filterByProperty,
	filterNullForProperty,
	sumAllProperty,
	countAllProperty,
	makeHistogram,
	normalizeProperty,
	getUniqueValues
}
