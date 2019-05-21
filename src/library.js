/*
  Třída pro knihovnu.

  Vlastnosti:
  - booklist: pole knih (objektů třídy Book)
  - lastBook: poslední přečtená kniha (objekt třídy Book)
  - currentBook: aktuálně čtená kniha (objekt třídy Book)
  - nextBook: příští kniha k přečtení (objekt třídy Book)
  - unreadBooks: počet nepřečtených knih

  Metody:
  - addBook(book): přidá knihu do knihovny
  - listAllBooks(): výpis všech knih v knihovně
  - startReadingNextBook(): začne čtení další knihy (tj. příští knihu přesune do aktuálně čtené knihy a do příští knihy vloží první nepřečtenou knihu v seznamu)
*/
export default class Library {

  constructor(config) {
    this.bookList = [];
    this.lastBook = null;
    this.currentBook = null;
    this.nextBook = null;
    this.unreadBooks = 0;

    // konfigurace ovládacích HTML prvků
    this.listElement = document.querySelector(config.list);
    this.allBooksBtnElement = document.querySelector(config.allBooksButton);
    this.unreadBooksBtnElement = document.querySelector(config.unreadBooksButton);
    this.readBooksBtnElement = document.querySelector(config.readBooksButton);
    this.finishBtnElement = document.querySelector(config.finishButton);
    this.nextBtnElement = document.querySelector(config.nextButton);
    this.countElement = document.querySelector(config.count);
    this.unreadCountElement = document.querySelector(config.unreadCount);
    this.lastBookElement = document.querySelector(config.lastBook);

    // nastavíme akce na ovládací tačítka
    this.setupControls();
  }


  /* nastaví event listenery pro ovládací tlačítka */
  setupControls() {
    // zobrazení všech knih
    this.allBooksBtnElement.addEventListener('click', () => {
      this.listAllBooks();
      this.updateStatus();
    });

    // zobrazení nepřečtených knih
    this.unreadBooksBtnElement.addEventListener('click', () => {
      this.listUnreadBooks();
      this.updateStatus();
    });

    // zobrazení přečtených knih
    this.readBooksBtnElement.addEventListener('click', () => {
      this.listReadBooks();
      this.updateStatus();
    });

    // tlačítko pro dokončení aktuální knihy
    this.finishBtnElement.addEventListener('click', () => {
      this.finishCurrentBook();
      this.listAllBooks();
      this.updateStatus();
    });

    // tlačítko pro čtení další knihy v pořadí
    this.nextBtnElement.addEventListener('click', () => {
      this.startReadingNextBook();
      this.listAllBooks();
      this.updateStatus();
    });
  }


  /* přidat knihu do knihovny */
  addBook(book) {
    this.bookList.push(book);

    if (!book.isRead) {
      this.unreadBooks++;
      if (this.nextBook === null) {
        this.nextBook = book;
      }
    }
  }


  /* výpis všech knih v knihovně */
  listAllBooks() {
    this.renderHTMLOutput(this.bookList);
  }


  /* výpis všech nepřečtených knih */
  listUnreadBooks() {
    const unread = this.bookList.filter(book => !book.isRead);
    this.renderHTMLOutput(unread);
  }


  /* výpis všech přečtených knih */
  listReadBooks() {
    const unread = this.bookList.filter(book => book.isRead);
    this.renderHTMLOutput(unread);
  }


  /* aktualizuje status - počty knih, poslední přečtená, ... */
  updateStatus() {
    this.countElement.textContent = this.bookList.length;
    this.unreadCountElement.textContent = this.unreadBooks;
    if (this.lastBook !== null) {
      this.lastBookElement.textContent = `${this.lastBook.title} (${this.lastBook.author}, ${this.lastBook.year})`;
    }
  }

  /*
    přijme jako parametr pole knih (všechny nebo nepřečtené)
    a do HTML prvku s id="booklist" na stránce vloží
    HTML kód se seznamem knih
  */
  renderHTMLOutput(list) {
    const output = list.reduce((prev, curr) => {
      return prev + curr.renderHTML(curr === this.currentBook);
    }, '');
    this.listElement.innerHTML = output;
  }


  /* začít číst další knihu */
  startReadingNextBook() {
    if (this.nextBook !== null) {
      // příští knihu ke čtení dáme do aktuálně čtené knihy
      this.currentBook = this.nextBook;
      this.nextBook = null;

      // do příští knihy ke čtení dáme první nepřečtenou knihu v seznamu
      for (let book of this.bookList) {
        if (!book.isRead && book !== this.currentBook) {
          this.nextBook = book;
          break;
        }
      }
    }
  }


  /* dokončí aktuálně čtenou knihu */
  finishCurrentBook() {
    if (this.currentBook !== null) {
      this.currentBook.read();
      this.lastBook = this.currentBook;
      this.currentBook = null;
      this.unreadBooks--;
    }
  }

}