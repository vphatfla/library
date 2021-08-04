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
        for (i in myLibrary){
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
    addBookToLibrary(titleField.value, authorField.value, pagesField.value, readField.checked);
    displayBook();
});


// search book button 
searchButton.addEventListener('click',function(){
    let title = titleField.value.toUpperCase();
    let author = authorField.value.toUpperCase();
    let pages = parseInt(pagesField.value);
    let readCheck = readField.checked;
    let searchLibrary = [];
    for (i in myLibrary){
        let check = true;
        if (myLibrary[i].title.toUpperCase() != title && title != '') {check = false; console.log(check);}
        else if (myLibrary[i].author.toUpperCase() != author && author != '') {check =false;console.log(check);}
        else if (myLibrary[i].pages != pages && !isNaN(pages)) {check = false; console.log(check);}
        else if (myLibrary[i].read != readCheck && readCheck != false){ check = false; console.log(check);}
        if (check) searchLibrary.push(myLibrary[i]);
    }
    console.log(searchLibrary);
});
