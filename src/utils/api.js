const API_KEY = process.env.API_KEY

console.log(process.env.API_KEY)

export function fetchBooks(category) {
  return fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => data.results.books)
    .catch((err) => {
      throw new Error(err)
    });
}

export function fetchCategories() {
  return fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => data.results.slice(25))
    .catch((err) => {
      throw new Error(err)
    });
}

export function fetchBookInfo(isbns) {
  if (isbns.length < 1) {
    return new Promise((resolve, reject) => {
      resolve([{ "totalItems": 1, items: [{ volumeInfo: { title: 'Book info not found' } }] }])
    })
  }
  return Promise.all(isbns.map((isbn) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.isbn13}`)
      .then((res) => res.json())
  }))



}