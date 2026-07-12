const myLibrary = [];
const container = document.querySelector(".container");
const button = document.querySelector("button");

button.addEventListener("click", function(e) {
    const title = prompt("What is the title?");
    const author = prompt("Who is the author?");
    const pages = prompt("How many pages?");
    const read = prompt("Have you read it?");
    addBookToLibrary(title, author, pages, read);
    displayBooks();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    container.textContent = "";
    for (const book of myLibrary) {
        var bookView = document.createElement("div");
        bookView.classList.add("card");
        var title = document.createElement("p");
        title.textContent = book.title;
        bookView.appendChild(title);
        var author = document.createElement("p");
        author.textContent = book.author;
        bookView.appendChild(author);
        var pages = document.createElement("p");
        pages.textContent = book.pages;
        bookView.appendChild(pages);
        var read = document.createElement("p");
        read.textContent = book.read;
        bookView.appendChild(read);
        container.appendChild(bookView);
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.classList.add("remover");
        removeBtn.dataset.id = book.id;
        removeBtn.addEventListener("click", function(e) {
            for (var i=0; i<myLibrary.length; i++) {
                if (myLibrary[i].id == e.target.dataset.id) {
                    myLibrary.splice(i, 1);
                    displayBooks();
                }
            }
        });
        bookView.appendChild(removeBtn);

        if (book.read == false || book.read == "not read yet") {
            const readBtn = document.createElement("button");
            readBtn.innerText = "Read";
            readBtn.classList.add("reader");
            readBtn.dataset.id = book.id;
            bookView.appendChild(readBtn);
            readBtn.addEventListener("click", function(e) {
            for (var i=0; i<myLibrary.length; i++) {
                if (myLibrary[i].id == e.target.dataset.id) {
                    myLibrary[i].read = "read";
                    displayBooks();
                }
            }
        });
        }

    }
}

addBookToLibrary("Hamlet", "Shakespeare", 305, "not read yet");
addBookToLibrary("Lord of the Flies", "Golding", 278, "read");
addBookToLibrary("Northanger Abbey", "Austen", 342, "read");
displayBooks();