import BookReview from "./BookReview";
import DisplayBookList from "./bookList";

function App() {
  const appTitle = "Home";
  <h1>{appTitle}</h1>;
  return (
    <>
      {/* <h1>Books</h1> */}
      {/* <BookReview /> */}
      <DisplayBookList />
    </>
  );
}
export default App;
