const normalize = (data) => data
  .map(({ name, country }) => ({ city: name.toLowerCase(), country: country.toLowerCase() }))
  .map(({ city, country }) => ({ city: city.trim(), country: country.trim() }))
  .map(({ city, country }) => [country, city])
  .sort() // sort countries and cities
  .reduce((acc, [country, city]) => {
    const citiesAcc = acc[country] ?? [];
    const cities = citiesAcc.concat(city);
    const uniqueCities = new Set(cities);
    return { ...acc, [country]: [...uniqueCities] };
  }, {});

module.exports = normalize;
