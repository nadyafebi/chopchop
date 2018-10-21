'use strict';

const rp = require('request-promise');
const $ = require('cheerio');
const _ = require('lodash');
const configTime = require('../configs/time.json')
const configIngredient = require('../configs/ingredient.json')
const strQuantity = '(' + _.join(_.get(configIngredient, 'quantity'),'|') + ')';
const reQuantity = new RegExp(strQuantity);


function parseName(section){
    return section.children[0].data;
}

const reTime = new RegExp(/([0-9]+) (\w+)/);
function parseTime(section){
  const timeStr = section.children[0].data;

  const match = reTime.exec(timeStr);
  const number = match[1];
  const timeUnit = _.get(configTime, match[2], -1.0);
  return number * timeUnit;
}

function parseImage(section){
    return section.attribs.src;
}

function parseIngredients(sections) {
  return _.chain(sections)
    .map(span => _.chain(span)
      .get('children').head()
      .get('data')
      .value())
    .filter((str) => !(configIngredient['blacklist'].includes(str)))
    .filter((str) => !(_.nth(str, -1) === -1))
    .compact() // Remove blank values
    .map((str) => parseIngredient(str))
    .value();
}

const reIngredient = new RegExp(`([0-9\.]+(?:/[0-9]+)?)${strQuantity}(.*)`)
function parseIngredient(str) {
  const match = reIngredient.exec(str);
  let ingredient;
  if(match !== null){
    const [, quantityNum, quantityUnit, ingredientName] = reIngredient.exec(str);

    ingredient = {
      name: _.trim(ingredientName),
      howMany: quantityNum + quantityUnit
    }
  } else {
    ingredient = {
      name: _.trim(str),
      howMany: ""
    }
  }
  return ingredient;
}

function parseSteps(sections) {
    return _.chain(sections)
    .map(span => _.chain(span)
      .get('children').head()
      .get('data')
      .trim() // Remove trailing whitespace
      .value())
    .compact() // Remove blank values
    .value();
}

module.exports.parse = (async(url) => {
    const html = await rp(url);

    const nameSection = $('#recipe-main-content', html)[0];
    const timeSection = $('.ready-in-time', html)[0];
    const imgSection = $('img.rec-photo', html)[0];
    const ingredientsSections = $('span.recipe-ingred_txt', html);
    const stepsSections = $('span.recipe-directions__list--item', html);

    return {
      name: parseName(nameSection),
      time: parseTime(timeSection),
      img: parseImage(imgSection),
      ingredients: parseIngredients(ingredientsSections),
      steps: parseSteps(stepsSections),
      url: url
    };
});