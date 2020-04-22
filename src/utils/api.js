const API_KEY_NY_TIMES = process.env.API_KEY_NY_TIMES
const API_KEY_GOOGLE_BOOKS = process.env.API_KEY_GOOGLE_BOOKS
const categories = ['combined-print-and-e-book-fiction', 'combined-print-and-e-book-nonfiction', 'animals', 'business-books', 'celebrities', 'education', 'food-and-fitness', 'health', 'science', 'sports', 'travel']

export function fetchBooks(category) {
  return fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${API_KEY_NY_TIMES}`)
    .then((response) => {
      if (response.status === 429) {
        return { status: 'too-many-requests' }
      }
      return response.json()
    })
    .then((data) => {
      if (data.status === 'too-many-requests') {
        return data
      }
      return data.results.books
    })
    .catch((err) => {
      throw new Error(err)
    });
}

export function fetchCategories() {
  return fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY_NY_TIMES}`)
    .then((response) => {
      if (response.status === 429) {
        return { status: 'too-many-requests' }
      }
      return response.json()
    })
    .then((data) => {
      if (data.status === 'too-many-requests') {
        return data
      }
      return data.results.reduce((total, result) => {
        if (categories.includes(result.list_name_encoded)) {
          if (result.list_name.indexOf('Combined Print and E-Book') >= 0) {
            total.push({ list_name: result.list_name.slice('Combined Print and E-Book'.length + 1), list_name_encoded: result.list_name_encoded })
          } else {
            total.push({ list_name: result.list_name, list_name_encoded: result.list_name_encoded })
          }
        }
        return total
      }, [])
    })
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
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.isbn13}&key=${API_KEY_GOOGLE_BOOKS}`)
      .then((res) => res.json())
  }))



}