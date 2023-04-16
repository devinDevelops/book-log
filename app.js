const headerLogNewBookBTN = document.querySelector('header button');
const formCloseBTN = document.querySelector('.close-form-btn');
const formLogNewBookBTN = document.getElementById('log-book');
const blurContainer = document.querySelector('.blur-container');
const formContainerEl = document.querySelector('.form-container');

let currentIndex = 0;

let library = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  const titleINPUT = document.getElementById('title');
  const authorINPUT = document.getElementById('author');
  const pagesINPUT = document.getElementById('pages');
  const readStatusBool = document.querySelector('input[type="radio"]:checked');

  if (
    titleINPUT.value === '' ||
    authorINPUT.value === '' ||
    pagesINPUT.value === '' ||
    !readStatusBool
  ) {
    checkInput();
  } else {
    const book = new Book(
      titleINPUT.value,
      authorINPUT.value,
      pagesINPUT.value,
      readStatusBool.value
    );

    library.push(book);
    logNewBook();
    clearFormValues();
    toggleBlur();
  }
}

function logNewBook() {
  const tableBodyEL = document.querySelector('tbody');
  const trEL = document.createElement('tr');
  const titleTD = document.createElement('td');
  const authorTD = document.createElement('td');
  const pagesTD = document.createElement('td');
  const readStatusTD = document.createElement('td');
  const readStatusBTN = document.createElement('button');
  const trashBTN = document.createElement('img');
  const newBook = library[currentIndex];

  trashBTN.classList.add('delete-btn');
  trashBTN.setAttribute('src', 'icons/trash.png');
  trashBTN.setAttribute('alt', 'Delete row');

  titleTD.textContent = newBook.title;
  authorTD.textContent = newBook.author;
  pagesTD.textContent = newBook.pages;
  readStatusBTN.textContent = newBook.readStatus;

  readStatusBTN.classList.add('read-status-btn');

  if (newBook.readStatus == 'Read') {
    readStatusBTN.classList.add('have-read');
  }

  readStatusTD.appendChild(readStatusBTN);
  readStatusTD.appendChild(trashBTN);
  trEL.appendChild(titleTD);
  trEL.appendChild(authorTD);
  trEL.appendChild(pagesTD);
  trEL.appendChild(readStatusTD);
  tableBodyEL.appendChild(trEL);

  currentIndex++;
  toggleFormDisplay();

  readStatusBTN.addEventListener('click', changeReadStatus);
  trashBTN.addEventListener('click', deleteBook);
}

function clearFormValues() {
  const readStatusBool = document.querySelector('input[type="radio"]:checked');
  const textFormInputs = document.querySelectorAll(
    'input:not(input[type="radio"])'
  );

  if (readStatusBool) readStatusBool.checked = false;
  textFormInputs.forEach(input => (input.value = ''));
}

function toggleFormDisplay() {
  formContainerEl.classList.toggle('hidden');
}

function toggleBlur() {
  blurContainer.classList.toggle('blur');
}

function changeReadStatus(e) {
  const readStatusBTN = e.target;

  readStatusBTN.classList.toggle('have-read');
  readStatusBTN.textContent === 'Not Read'
    ? (readStatusBTN.textContent = 'Read')
    : (readStatusBTN.textContent = 'Not Read');
}

function deleteBook(e) {
  e.target.parentNode.parentNode.remove();
}

function checkInput() {
  const textFormInputs = document.querySelectorAll(
    'input:not(input[type="radio"])'
  );
  const radioInputChecked = document.querySelector(
    'input[type="radio"]:checked'
  );
  const firstFormRadio = document.querySelector('input[type="radio"]');

  if (!radioInputChecked) {
    firstFormRadio.setCustomValidity('Please select a value');
    firstFormRadio.reportValidity();
  }

  textFormInputs.forEach(input => {
    if (input.value === '') {
      input.setCustomValidity('Please enter a value');
      input.reportValidity();
    }
  });
}

headerLogNewBookBTN.addEventListener('click', toggleFormDisplay);
headerLogNewBookBTN.addEventListener('click', toggleBlur);
formCloseBTN.addEventListener('click', toggleFormDisplay);
formCloseBTN.addEventListener('click', clearFormValues);
formCloseBTN.addEventListener('click', toggleBlur);

formLogNewBookBTN.addEventListener('click', addBookToLibrary);
