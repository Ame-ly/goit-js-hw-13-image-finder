const API_KEY = '21200739-c1a4d2f91a97c5d854a9d8dd6';

const BASE_URL = 'https://pixabay.com/api';
// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    //  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
      //  return console.error
    }
    const result = await response.json();

    console.log(result);
    this.incrementPage();
    return await Promise.resolve(result.hits);

    //  const p = fetch(url, options)
    //    const r = await response.json(p);
    //   this.incrementPage(r);
    //  return r;

    // .then(data => {
    //   this.incrementPage();
    //   return data;
    // });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
