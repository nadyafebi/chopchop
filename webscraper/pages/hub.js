'use strict';

const rp = require('request-promise');
const $ = require('cheerio');
const _ = require('lodash');

module.exports.parse = (async(url) => {
  const html = await rp(url);

  const articleSections = $('article.fixed-recipe-card', html);
  const articles = _.chain(articleSections)
    .map(card => _.chain(card)
      .get('children')
      .filter({
        type: 'tag',
        name: 'div',
        attribs: { class: 'grid-card-image-container' }
      }).head()
      .get('children')
      .filter({
        type: 'tag',
        name: 'a'
      }).head()
      .get('attribs')
      .get('href')
      .value())
    .value();

  return articles;
});