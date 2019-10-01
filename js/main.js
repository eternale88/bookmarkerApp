// listen for form submit
document.querySelector('#myForm').addEventListener('submit', saveBookmark)

// Save bookmarks
function saveBookmark(e) {
  // get form values
  const siteName = document.querySelector('#siteName').value
  const siteUrl = document.querySelector('#siteUrl').value

  // create object of bookmarks to save them in localStorage
  const bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Persist our bookmarks into storage
  // localStorage.setItem('bookmarks', JSON.stringify(bookmark))
  // console.log(localStorage.getItem('bookmarks'))
  // localStorage.removeItem('bookmarks')
  // console.log(localStorage.getItem('bookmarks'))

  // test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    // init array
    let bookmarks = []
    bookmarks.push(bookmark)

    //set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    // add another bookmark to array
    bookmarks.push(bookmark)

    // save to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  // Prevent form from submitting
  e.preventDefault()
}
