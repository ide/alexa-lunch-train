import 'instapromise';

import Yelp from 'yelp';

import assert from 'assert';
import fs from 'fs';
import process from 'process';

async function defineRestaurantsAsync() {
  let location = '200 University Ave, Palo Alto, CA';
  let restaurants = [
    ...await getTopBusinessesAsync(location, 'food', 600),
    ...await getTopBusinessesAsync(location, 'restaurants'),
  ];

  restaurants = restaurants.map(normalizeName);
  restaurants = [...new Set(restaurants)];
  restaurants.sort();

  await fs.promise.writeFile(
    'model/restaurants.txt',
    restaurants.join('\n'),
    'utf8',
  );
  console.log(`Saved ${restaurants.length} restaurants.`);
}

async function getTopBusinessesAsync(
  location: string,
  category: string,
  count?: number,
): Promise<string[]> {
  if (typeof count === 'number') {
    if (count <= 0) {
      return [];
    }
    console.log(`Fetching ${count} restaurants...`);
  }

  let yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET,
  });

  let offset = 0;
  let businesses = [];
  do {
    let result = await yelp.search({
      location,
      limit: (count != null) ? Math.min(count - businesses.length, 20) : 20,
      offset,
      category_filter: category,
    });

    // Errors have a status code field
    if (result.statusCode) {
      break;
    }

    if (!result.businesses.length) {
      break;
    }

    if (count == null) {
      assert.equal(typeof result.total, 'number');
      count = Math.min(result.total, 1000);
      console.log(`Fetching ${count} restaurants...`);
    }

    businesses.push(...result.businesses);
    offset += result.businesses.length;
    console.log(`Fetched ${offset} restaurants...`);
  } while (businesses.length < count);

  return businesses.map(business => business.name);
}

function normalizeName(name: string): string {
  return name.replace(/( - |: ).*$/, '');
}

defineRestaurantsAsync().catch(error => {
  console.error(error);
});
