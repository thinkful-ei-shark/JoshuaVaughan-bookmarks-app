
import $ from 'jquery';
/* eslint-disable strict */
import store from './store';


const noBookmarks = () => {
  const empty = `
  <li style="font-size: small; text-align: center;"><h3>No Bookmarks Available</h3> Please add a bookmark or change filter criteria.</li>
  `;

  return empty;
};

const initialRender = () => {
   
  const template = `
  <div class="control-buttons">
    <button class="new-bookmark">Add Bookmark</button>
    <select name="rating" class="filter-selector" aria-label="rating-dropdown" 
    placeholder="Filter">
        <option class="filter-by" value="0" name="placeholder">All</option>
        <option class="filter-by" value="1" name="one">1 star+</option>
        <option class="filter-by" value="2" name="two">2 star+</option>
        <option  class="filter-by" value="3" name="three">3 star+</option>
        <option class="filter-by" value="4" name="four">4 star+</option>
        <option class="filter-by" value="5" name="five">5 star+</option>
      </select>
  </div>
  <section id="list-container"></section>
  `;

  return template;
};

const formTemplate = `<form id="submit-bookmark">
<label for="title">Title</label>
<input required type="text" id="title" placeholder="e.g. Amazon Wishlist" />
<label for="url">Website</label>
<input required type="url" id="url" placeholder="e.g. https://www.test.com" />
<label for="desc">Description</label>
<input type="text" id="desc" placeholder="e.g. My Wishlist" />
<label for="rating" placeholder="1">Rating</label>
<input required type="number" id="rating" min="1" max="5" />
<br />
<button type="submit" id="submit">Submit</button>
<button type="button" id="cancel">Cancel</button>
</form>`;

// const generateError = function (message) {
//   return `
//         <section class="error-content">
//           <button id="cancel-error">X</button>
//           <p>${message}</p>
//         </section>
//       `;
// };

// const renderError = function () {
//   if (store.error) {
//     const el = generateError(store.error);
//     $('.error-container').html(el);
//   } else {
//     $('.error-container').empty();
//   }
// };

const generateBookmarkItem = (bookmarkItem) => {

  return `<li id=${bookmarkItem.id}>
      <h4><a href="${bookmarkItem.url}" target="_blank">${bookmarkItem.title}</a><div class="rating" style="font-size: small;">Rating: ${bookmarkItem.rating} Stars</div></h4>
      
      <div style="display: ${bookmarkItem.expanded ? 'block' : 'none'}"><div class="desc">${bookmarkItem.desc}</div> <br /><div class ="url"> ${bookmarkItem.url}</div></div>
      <button id="expand-btn">${bookmarkItem.expanded ? 'Collapse' : 'Expand'}</button>
      <button id="delete-btn">Delete</button>
    </li>`;
};

const getBookmarks = () => {
  if (store.filter) {
    $('.filter-selector').val(store.filter);
    return store.bookmarks.filter((bookmark) => {
      if (bookmark.rating >= parseInt(store.filter)) {
        return bookmark;
      }
    });
  }
  return store.bookmarks;
};

const render = function () {
  // Filter item list if store prop is true by item.checked === false
  let html = '';
  if (!store.adding) {
    $('main').html(initialRender());
    const bookmarks = getBookmarks();
    console.log(bookmarks);
    if (bookmarks.length < 1) {
      html += noBookmarks();
    }
    bookmarks.forEach((bookmarkItem) => {
      html += generateBookmarkItem(bookmarkItem);
    });
  } else {
    html += `${formTemplate}`;
  }
    

  // store.store.bookmarks.forEach((bookmarkItem) => {
  //   html += generateBookmarkItem(bookmarkItem);
  // })
  // render the shopping list in the DOM
  // const shoppingListItemsString = generateShoppingItemsString(items);
  
  // insert that HTML into the DOM
  $('#list-container').html(`<ul>${html}</ul>`);
};

export default {
  render
};