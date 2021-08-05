const container = document.querySelector('.container');
const addButton = document.querySelector('.addBook');
const titleField = document.getElementById('title');
const authorField =document.getElementById('author');
const pagesField = document.getElementById('pages');
const readField = document.getElementById('readStatus');
const searchButton = document.querySelector('.searchBook');
let deleteButtons = container.querySelectorAll('button');


// get data from localstorage
let myLibrary =[];
try{
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary == null) myLibrary = [];
} catch{
}

displayBook();
// object literal of book
function Book(title, author, pages, read){
    this.title =title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// add a new book
function addBookToLibrary(title, author, pages, read){
    let titleBook = new Book(title, author, pages, read);
    myLibrary.push(titleBook);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// delete the whole libary 
function deleteLibrary(){
    myLibrary = [];
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

//remove item based on index from library
function removeItem(indexOfBook){
    myLibrary.splice(indexOfBook,1);
}

//display every book from myLibrary, set up id = index of book in myLibrary 
function displayBook(){
    container.innerHTML = '';
    let content = '';
    if (myLibrary.length == 0) {
        container.textContent = 'Your library is empty';
    } 
    else 
        myLibrary.sort();
        for (i in myLibrary){
            console.log('display inside loop');
            content = `${myLibrary[i].title} by ${myLibrary[i].author}, ${myLibrary[i].pages} pages`;
            if (myLibrary[i].read == true) (content += ' Already Read')
            else (content += ' Not read yet');
            
            let divBook = document.createElement('div');

            let button = document.createElement('button');
            button.innerHTML = 'Delete';
            button.setAttribute('id', i);

            divBook.textContent = content;
            divBook.appendChild(button);
            container.appendChild(divBook);
        }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); // save library 
    console.log('execute displayBook');    
    // call delete function
    deleteButtons = container.querySelectorAll('button');
    deleteButtons.forEach(deleteButton => {deleteButton.addEventListener('click', deleteBook)});
}

// delete function
function deleteBook(){
    let index = parseInt(this.id);
    removeItem(index);
    console.log('executed');
    displayBook();
}

// call function for add button
addButton.addEventListener('click', function(){
    if (titleField.value != '' && authorField.value != ''){
        if (pagesField.value != ''){
            addBookToLibrary(titleField.value, authorField.value, pagesField.value, readField.checked);
        }
        else alert('Please input number of pages');
    }
    else alert('Please input Title/Author');
    displayBook();
});


// search book button 
searchButton.addEventListener('click',searchButtonFunction);
// search function 
function searchButtonFunction(){
    let title = titleField.value.toUpperCase();
    let author = authorField.value.toUpperCase();
    let pages = parseInt(pagesField.value);
    let readCheck = readField.checked;
    let searchLibrary = [];
    for (i in myLibrary){
        let check = true;
        if (myLibrary[i].title.toUpperCase() != title && title != '') {check = false; }
        else if (myLibrary[i].author.toUpperCase() != author && author != '') {check =false;}
        else if (myLibrary[i].pages != pages && !isNaN(pages)) {check = false; }
        else if (myLibrary[i].read != readCheck && readCheck != false){ check = false; }
        if (check) searchLibrary.push(myLibrary[i]);
    }
    displaySearch(searchLibrary);
}
// display library when search with filters (title, author, ...)

function displaySearch(library){
    container.innerHTML = '';
    let content  = '';
    if (library.length == 0) {
        container.textContent = 'There is no book that\'s matched your search';
    }
    else {
        for (i in library){
            content = `${library[i].title} by ${library[i].author}, ${library[i].pages} pages`;
            if (library[i].read == true) (content += ' Already Read')
            else (content += ' Not read yet');
            
            let divBook = document.createElement('div');

            let button = document.createElement('button');
            button.innerHTML = 'Delete';
            button.setAttribute('id', library[i].title);

            divBook.textContent = content;
            divBook.appendChild(button);
            container.appendChild(divBook);
        }
    }
    // deletebutton is nodelist of deletebutton in searchlist
    deleteButtons = container.querySelectorAll('button');
    deleteButtons.forEach(deleteButton => {deleteButton.addEventListener('click', deleteBookSearch)});
    // reset button must be declared after deleteButton, because deletebutton get all the 'button' inside container. 
    let buttonResetAfterSearch = document.createElement('button');
    buttonResetAfterSearch.innerHTML = 'Reset Library';
    container.appendChild(buttonResetAfterSearch);
    buttonResetAfterSearch.addEventListener('click', displayBook);
}

// delete function for search library only, different: replace the display() for the whole library by call the searchButtonFunction() -> displaySearch(); deleting based on id = title of the book
function deleteBookSearch(){
    let id  = this.id;
    for (i in myLibrary){
        if (myLibrary[i].title == id) { removeItem(i); break; };
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); // save library
    searchButtonFunction();
}