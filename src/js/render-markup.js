import getRefs from './refs';
import countryMarkupTemplate from '../templates/country-card.hbs';
import countryListTemplate from '../templates/country-list.hbs';

const refs = getRefs();

function renderMarkup(country) {
  const markup = countryMarkupTemplate(country);
  refs.cardRef.innerHTML = markup;
}

function renderList(countries) {
  refs.listRef.innerHTML = countryListTemplate(countries);
}

export { renderList, renderMarkup };
