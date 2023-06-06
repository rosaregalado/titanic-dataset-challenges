// ================================================================

const { type } = require("os");

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

// =================================================================

// 1 ---------------------------------------------------------------
// Return the total number of passengers. 
// Returns a number.

const getTotalPassengers = (data) => {
	return data.length;
}

// 2 ---------------------------------------------------------------
// Return the number of surviving passengers. A passenger survived 
// if their survived property is "Yes".
// Return a number.

const getSurvivorCount = (data) => {
	const survivors = data.filter(passenger => passenger.fields.survived === "Yes");
	return survivors.length;
}

// 3 ---------------------------------------------------------------
// Return the number of passengers who did not survive. A passenger
// did not survive if their survived property is "No".
// Return a number.

const getCasualityCount = (data) => {
	const casualties = data.filter(passenger => passenger.fields.survived === 'No');
	return casualties.length;
}

// 4 ---------------------------------------------------------------
// Return the number of passengers in any class. This function 
// takes the data and the passenger class a string. Find all of the 
// passengers whose pclass matches and return the count. 
// Return a number

const countPassengersInClass = (data, pclass) => {
	const passengersInClass = data.filter(passenger => passenger.fields.pclass === pclass);
	return passengersInClass.length;
}

// 5 ---------------------------------------------------------------
// Return the number of survivors in a class. This function takes 
// the data and passenger class. 
// Return the count of survivors in that pclass.

const getSurvivorCountForClass = (data, pclass) => {
	const survivorsInClass = data.filter(passenger => passenger.fields.pclass === pclass && passenger.fields.survived === 'Yes');
	return survivorsInClass.length;
}

// 6 ---------------------------------------------------------------
// Return the number of passengers who did not survive in a class.
// This function takes the data and the passenger class and returns 
// the number of passengers who did not survive for that class. 

const getCasualityCountForClass = (data, pclass) => {
	const casualtiesInClass = data.filter(passenger => passenger.fields.pclass === pclass && passenger.fields.survived === 'No');
	return casualtiesInClass.length;
}

// 7 ---------------------------------------------------------------
// Return the age of the youngest passenger. You need to filter
// passenger data where the age is missing. 

const getMinAge = (data) => {
	const filteredData = data.filter(passenger => passenger.fields.age !== undefined);
	const minAge = Math.min(...filteredData.map(passenger => passenger.fields.age));
	return minAge;
}

// 8 ---------------------------------------------------------------
// Return the age of the oldest passenger. Filter passengers where 
// age is missing.

const getMaxAge = (data) => {
	const filteredData = data.filter(passenger => passenger.fields.age !== undefined);
	const maxAge = Math.max(...filteredData.map(passenger => passenger.fields.age));
	return maxAge;
}

// 9 ---------------------------------------------------------------
// Return the number of passengers that embarked at a given stop. 
// Each passenger has a embarked property with a value of: S, C,
// or Q. This function takes in the passenger data and the 
// embarkation code. Return the count of passenegers with that code.

const getEmbarkedCount = (data, embarked) => {
	const embarkedPassengers = data.filter(passenger => passenger.fields.embarked === embarked);
	return embarkedPassengers.length;
}

// 10 ---------------------------------------------------------------
// Return the lowest fair paid by any passenger. The fare is missing 
// for some passengers you'll need to filter this out!

const getMinFare = (data) => {
	const filteredData = data.filter(passenger => passenger.fields.fare !== undefined);
	const minFare = Math.min(...filteredData.map(passenger => passenger.fields.fare));
	return minFare;
}

// 11 ---------------------------------------------------------------
// Return the highest fare paid by any passenger. Some of the 
// passengers are missing data for fare. Be sure to filter these! 

const getMaxFare = (data) => {
	const filteredData = data.filter(passenger => passenger.fields.fare !== undefined);
	const maxFare = Math.max(...filteredData.map(passenger => passenger.fields.fare));
	return maxFare;
}

// 12 ---------------------------------------------------------------
// Return the count of passengers by gender. Each passenger object has
// "sex" property that is either "male" or "female"

const getPassengersByGender = (data, gender) => {
	const passengersByGender = data.filter(passenger => passenger.fields.sex === gender);
	return passengersByGender.length;
}

// 13 ---------------------------------------------------------------
// Return the number of passengers who survived by gender. This 
// function receives parameters of data and gender. Match the gender
// to the "sex" property and check the "survived" property. 

const getSurvivorsByGender = (data, gender) => {
	const survivorsByGender = data.filter(passenger => passenger.fields.sex === gender && passenger.fields.survived === 'Yes');
	return survivorsByGender.length;
}

// 14 ---------------------------------------------------------------
// Return the number of passengers who did not survived by gender. 

const getCasualitiesByGender = (data, gender) => {
	const casualitiesByGender = data.filter(passenger => passenger.fields.sex === gender && passenger.fields.survived === "No");
	return casualitiesByGender.length;
}

// 15 --------------------------------------------------------------
// Return the total of all fares paid. Add up all of the fares and 
// return that number. Be sure to filter the passengers records 
// where the fare is missing! 

const getTotalFare = (data) => {
	const fares = data
		.filter(passenger => typeof passenger.fields.fare === "number")
		.map(passenger => passenger.fields.fare);

	return fares.reduce((total, fare) => total + fare, 0);
}

// 16 --------------------------------------------------------------
// Return the average fare paid. Add up all of the fares and divide 
// by the number of passengers. Be sure to filter passengers who are
// missing a fare! 

const getAverageFare = (data) => {
	const fares = data
		.filter(passenger => typeof passenger.fields.fare === 'number')
		.map(passenger => passenger.fields.fare);

	if (fares.length === 0) {
		return 0;
	}

	const totalFare = fares.reduce((total, fare) => total + fare, 0);
	return totalFare / fares.length;
}

// 17 --------------------------------------------------------------
// Return the median fare. The median is the value equal distance
// from the minimum and maximum values. Filter passengers who are 
// missing fares. Sort the passengers on the fare pick the one in
// the middle: [11,33,77] <- 33 is the median. If number of items 
// is even average the two middle values. For example: [2,4,5,16]
// 4 + 5 = 9 / 2 median is 4.5!

const getMedianFare = (data) => {
	const fares = data
		.filter(passenger => typeof passenger.fields.fare === 'number')
		.map(passenger => passenger.fields.fare);

	if (fares.length === 0) {
		return 0;
	}

	fares.sort((a, b) => a - b);
	const middle = Math.floor(fares.length / 2);

	// if number is even, return avg of two middle values
	if (fares.length % 2 === 0) {
		return (fares[middle - 1] + fares[middle]) / 2;
	} else {
		return fares[middle];
	}
}

// 18 --------------------------------------------------------------
// Return the average age of all passengers. Add all ages and divide 
// by the number of passenegers. Be sure to filter where ages are not 
// available. 

const getAverageAge = (data) => {
	const ages = data
		.filter(passenger => typeof passenger.fields.age === "number")
		.map(passenger => passenger.fields.age);

	if (ages.length === 0) {
		return 0;
	}

	const totalAge = ages.reduce((total, age) => total + age, 0);
	return totalAge / ages.length;
}

// 19 --------------------------------------------------------------
// Return the median age from passengers.

const getMedianAge = (data) => {
	const ages = data
		.filter(passenger => passenger.fields.age !== null && passenger.fields.age !== undefined)
		.map(passenger => passenger.fields.age)
		.sort((a, b) => a - b);

	const middle = Math.floor(ages.length / 2);
	let medianAge;

	if (ages.length % 2 === 0) {
		const middleAges = [ages[middle - 1], ages[middle]];
		medianAge = middleAges.reduce((a, b) => a + b) / 2;
	} else {
		medianAge = ages[middle]
	}
	return medianAge;
}

// 20 --------------------------------------------------------------
// Add up all of the ages for the gender provided and divide by the 
// the total number. 

const getAverageAgeByGender = (data, gender) => {
	const genderPassengers = data.filter(passenger => passenger.fields.sex === gender);
	const ages = genderPassengers
		.filter(passenger => passenger.fields.age !== null && passenger.fields.age !== undefined)
		.map(passenger => passenger.fields.age);

	if (ages.length === 0) {
		return 0;
	}

	const sum = ages.reduce((a, b) => a + b);
	const averageAge = sum / ages.length;
	return averageAge;
}

// --------------------------------------------------------------
// --------------------------------------------------------------
module.exports = {
	getTotalPassengers,
	getSurvivorCount,
	getCasualityCount,
  countPassengersInClass,
  getSurvivorCountForClass,
	getCasualityCountForClass,
	getMinAge,
	getMaxAge,
	getEmbarkedCount,
	getMaxFare,
	getMinFare,
	getPassengersByGender,
	getSurvivorsByGender,
	getCasualitiesByGender,
	getTotalFare,
	getAverageFare,
	getMedianFare,
	getAverageAge,
	getMedianAge,
	getAverageAgeByGender
}