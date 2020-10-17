import $ from 'jquery';
import handlers from './bookmarks-list';
import render from './render';
import api from './api';
import './styles.css';

function main() {
  api.getBookmarks();
  handlers.handleFormSubmit();
  handlers.handleToggleInformation();
  handlers.handleAddBookmark();
  handlers.handleDelete();
  handlers.handleFormCancellation();
  handlers.handleFilterSelection();
  render.render();
}

$(main);