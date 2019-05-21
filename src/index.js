/* import modulů */
import Book from './book';
import Library from './library';


/* založíme objekt knihovny (třída Library) */
let knihovna = new Library({
  list: '#booklist',
  allBooksButton: '#allbooks',
  unreadBooksButton: '#unreadbooks',
  readBooksButton: '#readbooks',
  finishButton: '#finish',
  nextButton: '#next',
  count: '#count',
  unreadCount: '#unread',
  lastBook: '#last'
});

/* přidáme do knihovny knihy */
knihovna.addBook( new Book('Leo Tolstoy', 'Anna Karenina', 1877, 'anna-karenina.jpg') );
knihovna.addBook( new Book('Charles Dickens', 'A Tale of Two Cities', 1859, 'a-tale-of-two-cities.jpg') );
knihovna.addBook( new Book('Jack London', 'The Call of the Wild', 1903, 'call-of-the-wild.jpg') );
knihovna.addBook( new Book('Miguel de Cervantes', 'Don Quixote', 1605, 'don-quixote.jpg') );
knihovna.addBook( new Book('Robert Louis Stevenson', 'Strange Case of Dr Jekyll and Mr Hyde', 1886, 'dr-jekyll-and-mr-hyde.jpg') );
knihovna.addBook( new Book('Brothers Grimm', 'Grimms\' Fairy Tales', 1812, 'grimms-fairy-tales.jpg') );
knihovna.addBook( new Book('Jonathan Swift', 'Gulliver\'s Travels', 1726, 'gullivers-travels.jpg') );
knihovna.addBook( new Book('Joseph Conrad', 'Heart of Darkness', 2005, 'heart-of-darkness.jpg') );
knihovna.addBook( new Book('Charlotte Brontë', 'Jane Eyre', 1847, 'jane-eyre.jpg') );
knihovna.addBook( new Book('Jules Verne', 'Journey to the Center of the Earth', 1864, 'journey-to-the-centre-of-the-earth.jpg') );
knihovna.addBook( new Book('Jane Austen', 'Pride and Prejudice', 1813, 'pride-and-prejudice.jpg') );
knihovna.addBook( new Book('Mark Twain', 'Adventures of Huckleberry Finn', 1884, 'the-adventures-of-huckleberry-finn.jpg') );
knihovna.addBook( new Book('Arthur Conan Doyle', 'The Adventures of Sherlock Holmes', 1892, 'the-adventures-of-sherlock-holmes.jpg') );
knihovna.addBook( new Book('Alexandre Dumas', 'The Count of Monte Cristo', 1844, 'the-count-of-monte-christo.jpg') );
knihovna.addBook( new Book('Rudyard Kipling', 'The Jungle Book', 1894, 'the-jungle-book.jpg') );
knihovna.addBook( new Book('H. G. Wells', 'The War of the Worlds', 1897, 'the-war-of-the-worlds.jpg') );

// nasimulujeme, že jsou nějaké knihy v knihovně už přečtené
knihovna.bookList[1].read();
knihovna.bookList[2].read();
knihovna.bookList[4].read();
knihovna.bookList[7].read();
knihovna.bookList[11].read();
knihovna.bookList[12].read();
knihovna.bookList[14].read();
knihovna.unreadBooks -= 7;
knihovna.lastBook = knihovna.bookList[14];

/* vypíšeme knihy v knihovně */
knihovna.listAllBooks();
knihovna.updateStatus();


