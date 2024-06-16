document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const categoryList = document.getElementById("category-list");
  const historyList = document.getElementById("history-list");
  const addBookForm = document.getElementById("add-book-form");
  const searchBar = document.getElementById("search-bar");

  let books = [];
  let borrowingHistory = [];

  function displayBooks(filter = "") {
    bookList.innerHTML = "";
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(filter.toLowerCase())
    );
    filteredBooks.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.innerHTML = `
                <img src="${book.coverImage}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.category}</p>
                <button onclick="borrowBook('${book.title}')">Borrow</button>
            `;
      bookList.appendChild(bookCard);
    });
  }

  function displayCategories() {
    const categories = [...new Set(books.map((book) => book.category))];
    categoryList.innerHTML = "";
    categories.forEach((category) => {
      const li = document.createElement("li");
      li.textContent = category;
      categoryList.appendChild(li);
    });
  }

  function displayHistory() {
    historyList.innerHTML = "";
    borrowingHistory.forEach((record) => {
      const li = document.createElement("li");
      li.textContent = `${record.bookTitle} borrowed on ${record.date}`;
      historyList.appendChild(li);
    });
  }

  function borrowBook(title) {
    const date = new Date().toLocaleDateString();
    borrowingHistory.push({ bookTitle: title, date });
    displayHistory();
  }

  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const category = document.getElementById("book-category").value;
    const coverImage =
      document.getElementById("book-cover").value || "default-cover.jpg";

    books.push({ title, author, category, coverImage });
    displayBooks();
    displayCategories();
    addBookForm.reset();
  });

  searchBar.addEventListener("input", (event) => {
    displayBooks(event.target.value);
  });

  // Initial display
  displayBooks();
  displayCategories();
  displayHistory();
});
