//UI elements.
const bookTitleEL = document.querySelector('#bookTitle'),
  bookAuthorEL = document.querySelector('#bookAuthor'),
  isbnEL = document.querySelector('#ISBN'),
  formEL = document.querySelector('.addBookForm'),
  addBookEL = document.querySelector('#btnAddBook'),
  errMsgEL = document.querySelector('#errMsg'),
  tBody = document.querySelector('#bookTableBody')
removeAllBooksEL = document.querySelector('#btnRemoveAll');



//Classes      
//Book class.
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI class.
class UI {
  //addBook function to the UI table.
  static addBook(e) {
    //prevent default behavior of form.
    e.preventDefault();

    //Read inputs from UI
    let title = bookTitleEL.value,
      author = bookAuthorEL.value,
      isbn = isbnEL.value;

    //Reset UI form elements.
    bookTitleEL.value = '';
    bookAuthorEL.value = '';
    isbnEL.value = '';
    
    let ISBNlist = [];
    let booksInDB = Store.getBook();
    booksInDB.forEach(function(book){
      ISBNlist.push(book.isbn);
    });

    //Check for mandatory fields and message if needed.
    if (title === '' || author === '' || isbn === '') {
      UI.setMessage('Enter in all fields !!', 'danger');
    } else if (ISBNlist.indexOf(isbn) != -1) {
      UI.setMessage('Book cannot be added. ISBN already exists !!', 'warning');
    }
    else {
      UI.displayBook(title, author, isbn);
      Store.addBook(new Book(title, author, isbn));
      UI.setMessage('Book added succesfully !!', 'success');
    }
  }

  static displayBook(title, author, isbn){
          //create a new book object and append to array
          let book = new Book(title, author, isbn);
          //function to create a row for newly added book
          let tRow = document.createElement('tr');
          tRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button></td>        
          `;
          tBody.appendChild(tRow);
  }

  static removeAllBooks(e) {
    let response = confirm("Are you sure to remove all books? It can't be undone");
    if (response === true) {
      tBody.innerHTML = '';
      Store.removeAllBooks();
    }
  }

  static removeBook(e) {
    if (e.target.parentNode.className === 'close') {
      let isbnToRemove = e.target.parentNode.parentNode.previousSibling.previousSibling.textContent;
      console.log(e.target.parentNode.parentNode.previousSibling.previousSibling);
      e.target.parentNode.parentNode.parentNode.remove();
      Store.removeBook(isbnToRemove);
    }
  }

  static setMessage(message, messageType) {
    let div = document.createElement('div');
    div.className = `alert mt-2 alert-${messageType}`;
    div.setAttribute('role', 'alert');
    div.setAttribute('id', 'msgID');
    div.textContent = message;
    document.querySelector('.form-group').appendChild(div);
    setTimeout(function () {
      document.querySelector('#msgID').remove();
    }, 3000);
  }
}

// store class

class Store {

  static getBook() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book){
    let books = Store.getBook();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }

  static removeAllBooks(){
    localStorage.setItem('books',JSON.stringify([]));
  }

  static removeBook(isbnToRemove){
    let books = Store.getBook();
    console.log(isbnToRemove);
    books.forEach(function(book, index){
      if(book.isbn === isbnToRemove){
        books.splice(index,1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books));        
  }

  static displayBook(){
    console.log('hi');
    let books = Store.getBook();
    books.forEach(function(book){
      UI.displayBook(book.title, book.author, book.isbn);
    })
  }

}

//Even listeners
addBookEL.addEventListener('click', UI.addBook);
removeAllBooksEL.addEventListener('click', UI.removeAllBooks);
tBody.addEventListener('click', UI.removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBook);