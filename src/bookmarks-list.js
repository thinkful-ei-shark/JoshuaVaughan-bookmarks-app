/* eslint-disable no-console */
import $ from 'jquery';
import store from './store';
import api from './api';
import render from './render';

// **** User Story 1: Add Bookmarks to my Bookmark List ****

// Step 1: Submitting the form to generate a bookmark
const handleFormSubmit = function() {
  // Part 1: listen for the click of the submit button, declare it as a const variable
  $('body').on('submit', '#submit-bookmark', function(e) {
    // Part 2: prevent the default function of the button on click
    e.preventDefault();
    // part 3: confirm the button click was heard
    console.log('Submit button clicked');
    // part 4: set named variables to each form input
    const title = $('#title');
    const url = $('#url');
    const description = $('#desc');
    const rating = $('#rating');
    // part 5: create a named variable that generates an object from the input values of the form
    const data = {title: title.val(), url: url.val(), desc: description.val(), rating: rating.val(), expanded: false};
    console.log(data);
    // part 6: create a store in store.js. let it equal an object, within which contains a property "bookmarks", to whit is assigned the value of an empty array. Export it from store.js and import it to bookmarks-list.js
    // part 7: push the newly generated object to the local store you created in the previous step
    
    //part 8: Create a file called api.js and create fetch, post and delete request functions. these will be referenced and used throughout the rest of the app, though only the fetch and post will be used in THIS handler, we might as well make the DELETE as we will need it later and it is simple to draft. Take note of the inputs of DELETE function, however, as they will come in later. ****MAKE SURE YOU EXPORT THE FUNCTIONS AND IMPORT THEM HERE****
    //part 9: Perform a POST and call the formSubmit listener. This should post the object to the API
    store.adding = false;
    api.createApiBookmark(data).then((item) => {
      store.bookmarks.push(item);
      render.render();
    }).catch((err) => {
      // form validation errors from API
    });
    //part 10: console.log the API list and the local store to confirm the new item has been POSTed(API) and added(local store).
    console.log('The bokmark data has been pushed to the local store AND the API store.');
    // part 11: render the local store to the bookmark list on the DOM
    
  });
};
//  Step 2: 

// Part 1: 
  
const handleToggleInformation = () => {
  $('body').on('click', '#expand-btn', function(e) {
    const expandId = $(e.target).parent().attr('id');
    console.log(expandId);
    const { bookmarks } = store;
    store.bookmarks = bookmarks.filter(bookmarkItem => {
      if (bookmarkItem.id === expandId) {
        bookmarkItem.expanded = !bookmarkItem.expanded;
      }
      return bookmarkItem;
    });
    render.render();
  });
};


// const handleNewButton () => {
//   $("main").on("click", "#new-btn", function(e) {
    


//   })
// }
//  part 3: create a file called render.js 

// Part 4: render the local store to the unordered list on the DOM

const handleAddBookmark = () => {
  $('body').on('click', '.new-bookmark', () => {
    console.log('add bookmark clicked');
    store.adding = true;
    render.render();
  });
};

const getItemIdFromElement = function (item) {
  return $(item).closest('li').attr('id');
};

const handleDelete = () => {
  $('body').on('click', '#delete-btn', (e) => {
    console.log('the delete button has ran');
    const id = getItemIdFromElement(e.currentTarget);
    api.deleteBookmark(id).then(() => {
      api.getBookmarks();
      store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
      render.render();
    });
  } );
};



const handleFilterSelection = () => {
  $('body').on('change', '.filter-selector', (e) => {
    const selected = $(e.target).find(':selected').val();
    store.filter = selected;
    render.render();
  });
};

const handleFormCancellation = () => {
  $('body').on('click', '#cancel', () => {
    store.adding = !store.adding;
    render.render();
  });
};


export default { 
  handleFormSubmit,
  handleToggleInformation,
  handleAddBookmark,
  handleFormCancellation,
  handleFilterSelection,
  handleDelete
};