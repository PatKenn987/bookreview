import { useState } from "react";
import "./bookformstyles.css";

const FictionCategories = [
  { id: 1, name: "Adventure" },
  { id: 2, name: "Classics" },
  { id: 3, name: "Crime" },
  { id: 4, name: "Folk tales" },
  { id: 5, name: "Fantasy" },
  { id: 6, name: "Historical Fiction" },
  { id: 7, name: "Horror" },
  { id: 8, name: "Humor and Satire" },
  { id: 9, name: "Literary Fiction" },
  { id: 10, name: "Mystery" },
  { id: 11, name: "Poetry" },
  { id: 12, name: "Plays" },
  { id: 13, name: "Romance" },
  { id: 14, name: "Science Fiction" },
  { id: 15, name: "Short Stories" },
  { id: 16, name: "Thrillers" },
  { id: 17, name: "War" },
  { id: 18, name: "Women's Fiction" },
  { id: 19, name: "Young Adult" },
];

const NonFictionCategories = [
  { id: 1, name: "Autobiography" },
  { id: 2, name: "Biography" },
  { id: 3, name: "Biology" },
  { id: 4, name: "Business" },
  { id: 5, name: "Essays" },
  { id: 6, name: "History" },
  { id: 7, name: "Mathematics" },
  { id: 8, name: "Philosophy" },
  { id: 9, name: "Plays" },
  { id: 10, name: "Politics" },
  { id: 11, name: "Psychology" },
  { id: 12, name: "Self-help" },
  { id: 13, name: "Technology" },
];

function BookReview() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [rank, setRank] = useState("");
  const [user, setUser] = useState("");
  const [fiction, setFiction] = useState(false);
  const [genre, setGenre] = useState("");
  const [review, setReview] = useState("");

  function ConfigureGenreSelect() {
    console.log({ fiction });

    if (fiction === true) {
      return (
        <select
          placeholder="Select Genre:"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Select Genre:</option>
          {FictionCategories.map((fCat) => (
            <option key={fCat.id} value={fCat.id}>
              {fCat.name}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <select
          placeholder="Select Genre:"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Select Genre</option>
          {NonFictionCategories.map((fCat) => (
            <option key={fCat.id} value={fCat.id}>
              {fCat.name}
            </option>
          ))}
        </select>
      );
    }
  }

  return (
    <>
      <header> Please add a new Book Review</header>
      <form className="book-review-form">
        <label className="title">Provide Title for book </label>
        <div className="inputbox">
          <input
            type="text"
            id="title"
            placeholder="Book Title"
            maxLength="100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <label htmlFor="author">Provide Book Author</label>
        <div className="inputbox">
          <input
            type="text"
            id="author"
            placeholder="Book Author"
            maxLength="70"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <label htmlFor="startDate">Started reading?</label>
        <div className="inputbox">
          <input
            type="date"
            id="startDate"
            placeholder="Start Date"
            value={startdate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <label htmlFor="finishDate">Finished reading?</label>
        <div className="inputbox">
          <input
            type="date"
            id="finishDate"
            placeholder="End Date"
            value={enddate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <label>Rank Book</label>
        <div className="inputbox">
          <input
            type="number"
            placeholder="Rating (0-5)"
            min="0"
            max="5"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
        </div>
        <label>Who are you?</label>
        <div className="select">
          <select
            value={user}
            name="slct"
            id="slct"
            onChange={(e) => setUser(e.target.value)}
          >
            <option value="">Choose User</option>
            <option value="1">Patrick Kennedy</option>
            <option value="2">Ann Kennedy</option>
          </select>
        </div>
        <label>Was this a fiction book?</label>
        <input
          type="checkbox"
          placeholder="Fiction"
          checked={fiction}
          onChange={(e) => setFiction(e.target.value)}
        />
        <label>Please select genre</label>
        <div>
          <ConfigureGenreSelect />
        </div>
        <div className="review">
          <textarea
            className="textArea"
            type="text"
            cols="120"
            rows="5"
            id="review"
            placeholder="Review"
            maxLength="1200"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button>Save Review</button>
      </form>
    </>
  );
}
export default BookReview;
