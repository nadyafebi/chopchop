'use strict';

const recipe = require('./pages/recipe');
const hub = require('./pages/hub');

const hubURL = "https://www.allrecipes.com/recipes/22461/everyday-cooking/allrecipes-magazine-recipes/breakfast-and-brunch/";

/*recipe.parse('https://www.allrecipes.com/recipe/247066/parmesan-crusted-pork-chops/').then((result) => {
    console.log(JSON.stringify(result, null, 2))
});*/

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// self-invoking async function
(async(hubURL) => {
    const pageURLs = await hub.parse(hubURL);

    /* Note: this can be done MUCH faster using something like Promise.map.
    I'm using for ... await to go easy on the server and
     prevent our IP from being blocked. */
    let pageObjects = [];

    for(let i = 0; i < pageURLs.length; i++){
        console.log(`Retreiving and parsing '${pageURLs[i]}'...`)
        const pageObject = await recipe.parse(pageURLs[i]);

        await sleep(100);
        pageObjects.push(pageObject);
    }

    console.log(JSON.stringify(pageObjects, null, 2));
})(hubURL);
