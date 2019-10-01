// listen for form submit
document.querySelector('#myForm').addEventListener('submit', saveBookmark)

// Save bookmarks
function saveBookmark(e) {
  // get form values
  const siteName = document.querySelector('#siteName').value
  const siteUrl = document.querySelector('#siteUrl').value

  // validate form
  if (!validateForm(siteName, siteUrl)) {
    // both conditions inside validate form function
    // must be true or the entire save bookmark function
    // should be exited
    return false
  }

  // create object of bookmarks to save them in localStorage
  const bookmark = {
    name: siteName,
    url: siteUrl
  }

  // local storage test
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

  // Clear form
  document.getElementById('myForm').reset()

  // Re - fetch bookmarks to display
  fetchBookmarks()

  // Prevent form from submitting
  e.preventDefault()
}

// Fetch bookmarks
function fetchBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  // console.log(bookmarks)

  // Get output ID
  const bookmarksResults = document.getElementById('bookmarkResults')

  // Build output
  bookmarksResults.innerHTML = ''
  for (let i = 0; i < bookmarks.length; i++) {
    const name = bookmarks[i].name
    const url = bookmarks[i].url

    bookmarksResults.innerHTML += `<div class="card card-body bg-light text-center" >
      
            <h3>${name}
              <a class="btn btn-primary" target="_blank" href=${addhttp(
                url
              )}>Visit</a>
              <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">Delete Bookmark</a>
            </h3> 
      </div>`
  }
}

// Delete bookmarks
function deleteBookmark(url) {
  // get bookmarks from local storage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

  // loop through the bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    if (url === bookmarks[i].url) {
      //remove from the array
      bookmarks.splice(i, 1)
    }
  }
  // reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  // re- fetch bookmarks to display correct amount to user
  fetchBookmarks()
}

// Validate form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form')
    //return false so form doesn't submit if input not entered
    return false
  }

  //create regex to verify that url entered is valid
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  const regex = new RegExp(expression)

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL')
    //return false so form doesn't submit if url not valid
    return false
  }

  return true
}

// add http on if it isn't present already for better UX
function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = `http://${url}`
  }
  return url
}
