document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById('bookForm');
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');

    const BOOKS_KEY = 'BOOKS';
    let books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];

    function saveBooks() {
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }

    function createBookElement(book) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('border', 'border-secondary', 'p-2', 'm-2');
        bookItem.innerHTML = `
            <h5>Judul Buku: ${book.title}</h5>
            <p>Penulis Buku: ${book.author}</p>
            <p>Tahun Terbit Buku: ${book.year}</p>
            <div class="container-fluid d-flex justify-content-around">
            <button class="col-5 btn btn-warning" onclick="toggleBookStatus(${book.id})">${book.isComplete ? 'Belum Selesai' : 'Selesai'} Dibaca</button>
            <button class="col-5 btn btn-danger" onclick="deleteBook(${book.id})">Hapus</button>
            </div>
        `;
        return bookItem;
    }

    function renderBooks() {
        incompleteBookshelfList.innerHTML = '';
        completeBookshelfList.innerHTML = '';

        for (const book of books) {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                completeBookshelfList.appendChild(bookElement);
            } else {
                incompleteBookshelfList.appendChild(bookElement);
            }
        }
    }

    function toggleBookStatus(bookId) {
        const book = books.find(b => b.id === bookId);
        if (book) {
            book.isComplete = !book.isComplete;
            saveBooks();
            renderBooks();
        }
    }

    function deleteBook(bookId) {
        books = books.filter(b => b.id !== bookId);
        saveBooks();
        renderBooks();
    }

    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const year = parseInt(document.getElementById('bookYear').value);
        const isComplete = document.getElementById('isComplete').checked;

        const book = {
            id: +new Date(),
            title,
            author,
            year,
            isComplete
        };

        books.push(book);
        saveBooks();
        renderBooks();
        bookForm.reset();
    });

    window.toggleBookStatus = toggleBookStatus;
    window.deleteBook = deleteBook;

    renderBooks();
});

function searchBooks() {
    const query = document.getElementById('searchBook').value.toLowerCase();
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');

    const BOOKS_KEY = 'BOOKS';
    let books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.year.toString().includes(query)
    );

    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    for (const book of filteredBooks) {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
            completeBookshelfList.appendChild(bookElement);
        } else {
            incompleteBookshelfList.appendChild(bookElement);
        }
    }
}

function createBookElement(book) {
    const bookItem = document.createElement('div');
    bookItem.classList.add('border', 'border-secondary', 'p-2', 'm-2');
    bookItem.innerHTML = `
    <h5>Judul Buku: ${book.title}</h5>
    <p>Penulis Buku: ${book.author}</p>
    <p>Tahun Terbit Buku: ${book.year}</p>
        <div class="container-fluid d-flex justify-content-around">
            <button class="col-5 btn btn-warning" onclick="toggleBookStatus(${book.id})">${book.isComplete ? 'Belum Selesai' : 'Selesai'} Dibaca</button>
            <button class="col-5 btn btn-danger" onclick="deleteBook(${book.id})">Hapus</button>
        </div>
    `;
    return bookItem;
}