import { useEffect, useState } from "react";
import BookReview from "./BookReview";
import supabase from "./supabase";
import "./bookformstyles.css";

const bookList = [
  {
    id: 1,
    title: "Going Infinite: (The rise and fall of a new tycoon)",
    author: "Michael Lewis",
    started: "2024-01-11",
    finished: "2024-01014",
    rating: "5",
    reviewer: "Patrick Kennedy",
    review:
      "I always enjoy Michael Lewis books.  He has done his usual great job of writing an entertaining and insightful book here.  The subject of the book in Sam Bankman Fried and the rise and fall of FTX, a crypto-currency trading platform.  The story winds through Sam as a weird kid, whose only friends are from Math Club, through his educational experiences and then into his working career.  He was recruited from MIT into a trading firm called Jane Street Capital where is was his job to price ETF funds based on the value.  The training process that the new recruits were put through in Jane Street capital was interesting.  Effectively they were encouraged and coached in how to make bets and markets all through there training.  The process rewarded those who could make reasonably good expected value calculations quickly and with limited information.  The book documents Frieds personality quirks including, lack of empathy, inability to show emotions (he had to practice making facial expressions) and his addictive game playing.  The rest of the story is about the details of rise and fail of FTX and Alameda, his crypto trading companies. Very interesting and in some ways disturbing read.",
    Fict: 1,
    genre: 0,
  },

  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Harari",
    started: "2023-03-26",
    finished: "2023-03-30",
    rating: "5",
    reviewer: "Patrick Kennedy",
    review:
      "This was an interesting book that tried to take a logical and evolutionarily driven approach to the how’s and why’s humans have evolved the way they have.  The author is a secular, gay Israeli, so his opinions would be pretty left of center.  I did not agree with all of his thesis or follow the same line of reasoning, but the book was an interesting read.  ",
    fict: 1,
    genre: 0,
  },

  {
    id: 3,
    title: "The Alignment Problem",
    author: "Brian Christian",
    started: "2024-01-11",
    finished: "2024-01014",
    rating: "5",
    reviewer: "Patrick Kennedy",
    review:
      "This is a 5 star book.  The author is a very good story teller and he weaves interesting stories about the different major intellectual accomplishments associated with the development of Artificial Intelligence in a delightful way throughout the book.  This book could be thought of as a tutorial on how AI systems work.  It does a great job of outlining the theoretical concepts associated with different types of machine learning algorithms, some of the history and challenges associated with the various algorithms and what problems they are useful at solving.  But the book could also be seen as a history of the study of how humans learn.  The algorithms and strategies used to develop AI are in many cases directly copied or adapted from studies of how people learn.  There are as many quotes and discussions of the study of human learning as there are of machines.",
    Fict: 1,
    genre: 0,
  },
];

export default function DisplayBookList() {
  const [showForm, setShowForm] = useState(false);
  const [bookItems, setBookItems] = useState([]);
  // This State variable is used to regulate the page loading process.  When the page is loading it will start the process of requesting the data from the database, but there will be a delay before that is available.  This State will prevent the main page from loading until the data is returned.
  const [isLoading, setIsLoading] = useState(false);

  //This State Variable is used to determine how to sort or order the list of books.
  const [order, setOrder] = useState("id");
  /*This State variable will be run when the page is initially 
  loaded.  We don't want this function running on every refresh of the display.  The brackets at the end of the function definition ([]) is called the dependency array.  The function will run when the values listed in this dependency array change.
  
  The value(s) in this ba
  The internals of this function are copied directly from the supa-base documentation.  From the supabase UI:
  1) In the open project that contains the table that you want to select select the Project API tab
  2) Select the table that you want to read */
  useEffect(
    function () {
      /*async functions to request data from the database */
      async function getBooks() {
        //Set the State to indicate that the data is loading.  This will prevent the main page from being displayed and will show some text to the user so they know what is happening.
        setIsLoading(true);
        //Use the supaBase component to request the data.  All the data in the table will be requested and it will be sorted by the finished date in descending (last book finished will be first) order.  Additionally, the number of book reviews loaded is limited to 1000 records

        // let query = supabase..from("booklist")
        //         .select("*")
        //         if()

        const { data: booklist, error } = await supabase
          .from("booklist")
          .select("*")
          .order(order, { ascending: true })
          .limit(1000);

        if (!error) {
          //When the data has arrived, load it into the BookItems state
          setBookItems(booklist);
        } else alert("There was a problem getting the data");

        //Indicate that the data loading is complete
        setIsLoading(false);
      }
      getBooks();
    },
    [order]
  );

  function Loader() {
    return <p className="message">Loading ..</p>;
  }

  function Book({ book }) {
    return (
      <li>
        <p className="row">
          <span className="counter">{book.id}</span>
          <span className="book-name">Title: {book.title}</span>
        </p>

        <div className="row">
          <span className="author">Author: {book.author}</span>
          <span className="reviewer">Reviewer: {book.reviewer}</span>
        </div>
        <div className="row">
          <span className="started">Start Date: {book.started}</span>
          <span className="finished">Finished Date: {book.finished}</span>
        </div>
        <div className="row">
          <span className="rating">Rating: {book.rating}</span>
          <span className="fict">Fict: {book.fict}</span>
          <span className="genre">Genre: {book.genre}</span>
        </div>
        <div className="review">{book.review}</div>
      </li>
    );
  }

  function LoadBookList() {
    return (
      <ul>
        {bookItems.map((bookItem) => (
          <Book key={bookItem.id} book={bookItem} />
        ))}
      </ul>
    );
  }

  return (
    <>
      {/**********************************************************************
      This is the header at the top of the page. It will show the page title
      (Book List), the # of records that are being displayed and a button that
      will bring up the review form */}
      <header>
        <h1>Book List</h1>
        <span className="book-count">
          There are {bookItems.length} reviews in the database.
        </span>
        {/*The button will show different text depending on if the showForm event
        is set to true or false. When the button is clicked, the value of the
        showForm event is toggled */}
        <button className="add" onClick={() => setShowForm((show) => !show)}>
          {showForm ? "Close without saving" : "Add a review"}
        </button>
        {/* If the showForm event is true, then show form, otherwise, don't do
        anything. */}
        {showForm ? (
          <BookReview setBookItems={setBookItems} setShowForm={setShowForm} />
        ) : null}

        <div>
          <label>Order By</label>
          <p>
            <button className="filterButton" onClick={() => setOrder("title")}>
              Title
            </button>
            <button className="filterButton" onClick={() => setOrder("author")}>
              Author
            </button>
            <button
              className="filterButton"
              onClick={() => setOrder("reviewer")}
            >
              Reviewer
            </button>
            <button
              className="filterButton"
              onClick={() => setOrder("finished")}
            >
              Finished{" "}
            </button>
            <button className="filterButton" onClick={() => setOrder("rating")}>
              Rating
            </button>
            <button className="filterButton" onClick={() => setOrder("genre")}>
              Genre
            </button>
          </p>
        </div>
      </header>
      <div className="book-list-container">
        {isLoading ? <Loader /> : <LoadBookList />}
      </div>
    </>
  );
}
