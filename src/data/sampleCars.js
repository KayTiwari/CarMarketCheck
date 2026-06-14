// Curated sample inventory used when no live MarketCheck API key is configured.
// `estimate` stands in for a KBB-style fair market value so the deal engine has
// something to compare the asking price against.
const sampleCars = [
  { id: "1", year: 2019, make: "Toyota", model: "Camry SE", price: 17995, estimate: 20800, miles: 48211, city: "Salt Lake City", state: "UT", dealer: "Wasatch Auto", url: "https://www.marketcheck.com/" },
  { id: "2", year: 2018, make: "Honda", model: "Civic EX", price: 16490, estimate: 18200, miles: 53120, city: "Salt Lake City", state: "UT", dealer: "Mountain Honda", url: "https://www.marketcheck.com/" },
  { id: "3", year: 2020, make: "Mazda", model: "CX-5 Touring", price: 22900, estimate: 24100, miles: 39875, city: "Sandy", state: "UT", dealer: "Sandy Motors", url: "https://www.marketcheck.com/" },
  { id: "4", year: 2017, make: "Ford", model: "F-150 XLT", price: 27450, estimate: 31200, miles: 71044, city: "Provo", state: "UT", dealer: "Provo Truck Center", url: "https://www.marketcheck.com/" },
  { id: "5", year: 2021, make: "Tesla", model: "Model 3 Standard Range", price: 31990, estimate: 33500, miles: 28760, city: "Salt Lake City", state: "UT", dealer: "EV Direct", url: "https://www.marketcheck.com/" },
  { id: "6", year: 2016, make: "Subaru", model: "Outback 2.5i Premium", price: 15990, estimate: 15200, miles: 88210, city: "Ogden", state: "UT", dealer: "Ogden Subaru", url: "https://www.marketcheck.com/" },
  { id: "7", year: 2019, make: "Chevrolet", model: "Equinox LT", price: 18250, estimate: 19900, miles: 51330, city: "West Valley City", state: "UT", dealer: "Valley Chevy", url: "https://www.marketcheck.com/" },
  { id: "8", year: 2015, make: "BMW", model: "328i", price: 13990, estimate: 16400, miles: 96500, city: "Salt Lake City", state: "UT", dealer: "Euro Imports", url: "https://www.marketcheck.com/" },
  { id: "9", year: 2020, make: "Toyota", model: "RAV4 XLE", price: 26995, estimate: 27200, miles: 36110, city: "Lehi", state: "UT", dealer: "Lehi Toyota", url: "https://www.marketcheck.com/" },
  { id: "10", year: 2018, make: "Jeep", model: "Grand Cherokee Laredo", price: 21490, estimate: 24800, miles: 62890, city: "Murray", state: "UT", dealer: "Murray Jeep", url: "https://www.marketcheck.com/" },
  { id: "11", year: 2017, make: "Honda", model: "Accord Sport", price: 17250, estimate: 18600, miles: 67400, city: "Sandy", state: "UT", dealer: "Sandy Motors", url: "https://www.marketcheck.com/" },
  { id: "12", year: 2021, make: "Hyundai", model: "Tucson SEL", price: 23990, estimate: 23400, miles: 31220, city: "Salt Lake City", state: "UT", dealer: "Capitol Hyundai", url: "https://www.marketcheck.com/" },
  { id: "13", year: 2014, make: "Toyota", model: "Tacoma PreRunner", price: 23990, estimate: 27900, miles: 109800, city: "Provo", state: "UT", dealer: "Provo Truck Center", url: "https://www.marketcheck.com/" },
  { id: "14", year: 2019, make: "Volkswagen", model: "Golf GTI", price: 21900, estimate: 22600, miles: 44120, city: "Salt Lake City", state: "UT", dealer: "Euro Imports", url: "https://www.marketcheck.com/" },
  { id: "15", year: 2016, make: "Ford", model: "Mustang GT", price: 25990, estimate: 29400, miles: 51880, city: "Ogden", state: "UT", dealer: "Ogden Performance", url: "https://www.marketcheck.com/" },
  { id: "16", year: 2020, make: "Kia", model: "Telluride EX", price: 33490, estimate: 35900, miles: 41250, city: "Lehi", state: "UT", dealer: "Lehi Kia", url: "https://www.marketcheck.com/" },
  { id: "17", year: 2018, make: "Nissan", model: "Rogue SV", price: 16990, estimate: 17100, miles: 59340, city: "West Valley City", state: "UT", dealer: "Valley Nissan", url: "https://www.marketcheck.com/" },
  { id: "18", year: 2015, make: "Audi", model: "A4 Premium", price: 14990, estimate: 16900, miles: 92100, city: "Salt Lake City", state: "UT", dealer: "Euro Imports", url: "https://www.marketcheck.com/" },
  { id: "19", year: 2022, make: "Toyota", model: "Corolla LE", price: 21490, estimate: 21900, miles: 22980, city: "Sandy", state: "UT", dealer: "Sandy Motors", url: "https://www.marketcheck.com/" },
  { id: "20", year: 2017, make: "Chevrolet", model: "Silverado 1500 LT", price: 28990, estimate: 33100, miles: 78650, city: "Murray", state: "UT", dealer: "Murray Chevy", url: "https://www.marketcheck.com/" },
];

export default sampleCars;
