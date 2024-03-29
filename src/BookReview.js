import { useState } from "react";
import supabase from "./supabase";
import "./bookformstyles.css";

const FictionCategories = [
  { id: 101, name: "Adventure" },
  { id: 102, name: "Classics" },
  { id: 103, name: "Crime" },
  { id: 104, name: "Folk tales" },
  { id: 105, name: "Fantasy" },
  { id: 106, name: "Historical Fiction" },
  { id: 107, name: "Horror" },
  { id: 108, name: "Humor and Satire" },
  { id: 109, name: "Literary Fiction" },
  { id: 110, name: "Mystery" },
  { id: 111, name: "Poetry" },
  { id: 112, name: "Plays" },
  { id: 113, name: "Romance" },
  { id: 114, name: "Science Fiction" },
  { id: 115, name: "Short Stories" },
  { id: 116, name: "Thrillers" },
  { id: 117, name: "War" },
  { id: 118, name: "Women's Fiction" },
  { id: 119, name: "Young Adult" },
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
  { id: 12, name: "Science" },
  { id: 13, name: "Self-help" },
  { id: 14, name: "Technology" },
];
export default function BookReview({ setBookItems, setShowForm }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [started, setStartDate] = useState("");
  const [finished, setEndDate] = useState("");
  const [rating, setRank] = useState("");
  const [reviewer, setUser] = useState("");
  const [fict, setFiction] = useState(false);
  const [genre, setGenre] = useState("");
  const [review, setReview] = useState("");
  const reviewMaxLength = 1200;

  //When a fact is being uploaded to the database, we want to
  //1) Make sure the user does not hit the Submit button multiple //times and enter multiple recorse
  //2) Keep the user informed of the current status.
  const [isUploading, setIsUploading] = useState("false");

  /*The data presented in the Genre drop-down select box is dependant
  on whether the book is fiction or non-fiction.  This function will
  determine the current value of the checkbox and present the appropriate list based on that value
    function ConfigureGenreSelect()
  *****************************************************************/
  function ConfigureGenreSelect() {
    if (fict === true) {
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
  /*This function will be called when the form is submitted (onSubmit)
   *****************************************************************/
  function DateCorrect() {
    //Check if the end date is
    if (started > finished) return false;
    else return true;
  }
  /*This function will be called when the form is submitted (onSubmit).  It will ensure that all of the data in the form is completed and perform error checking to ensure that the end date is after the start date.
  If that is true a new Book object will be created and loaded with the data from the form.
  The setBookItems State function will be called with a data structure that is a con-catenation of the new record and the current records in the array. After that the data will be cleared (not really a necessary step but tidy) and the form will be closed.

   *****************************************************************/
  async function handleSubmit(e) {
    //Prevent the browswer from reloading

    //Ensure data is valid.  If so create new record
    //Check that all of the fields have data in them.
    if (
      title &&
      author &&
      started &&
      finished &&
      rating &&
      reviewer &&
      genre &&
      review
    ) {
      // console.log("Data all there");
      //Do whatever error checking we can
      if (DateCorrect()) {
        //Set the isUploading state to true indicating that we are about to upload a fact to the database
        setIsUploading(true);

        //Upload fact to supabase and receive the new fact object
        const { data: newBook, error } = await supabase
          .from("booklist")
          .insert([
            {
              title,
              author,
              started,
              genre,
              finished,
              rating,
              reviewer,
              review,
              fict,
            },
          ])
          .select();
        setIsUploading(false);
        console.log(newBook);
        /*Add the new Book Object to the UI: add the Book Object  to the state.  First the new record is added to a new array and then the (...) spread operator will copy all fo the items in the old bookItems array after the new record*/
        setBookItems((bookItems) => [newBook[0], ...bookItems]);
      } else {
        //There was some error in the data
      }

      //Reset Input fields
      setTitle("");
      setAuthor("");
      setStartDate("");
      setEndDate("");
      setRank("");
      setUser("");
      setFiction("");
      setGenre("");
      setReview("");
      //Close the form
      setShowForm(false);
    } else {
      //There was some missing data
    }
  }

  return (
    <>
      <header> Please add a new Book Review</header>
      <form className="book-review-form" onSubmit={handleSubmit}>
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
            value={started}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <label htmlFor="finishDate">Finished reading?</label>
        <div className="inputbox">
          <input
            type="date"
            id="finishDate"
            placeholder="End Date"
            value={finished}
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
            value={rating}
            onChange={(e) => setRank(e.target.value)}
          />
        </div>
        <label>Who are you?</label>
        <div className="select">
          <select
            value={reviewer}
            name="slct"
            id="slct"
            onChange={(e) => setUser(e.target.value)}
          >
            <option value="">Choose User</option>
            <option value="Patrick Kennedy">Patrick Kennedy</option>
            <option value="Ann Kennedy">Ann Kennedy</option>
          </select>
        </div>
        <label>Was this a fiction book? </label>
        <input
          type="checkbox"
          placeholder="Fiction"
          // checked={false}
          // onChange={(e) => setFiction(e.target.value)}
          onChange={(e) => setFiction(!fict)}
        />

        <label>Please select genre</label>
        <div>
          <ConfigureGenreSelect />
        </div>
        <p className="charCount">
          ({reviewMaxLength - review.length} / {reviewMaxLength})
        </p>
        <div className="review">
          <textarea
            className="textArea"
            type="text"
            cols="120"
            rows="5"
            id="review"
            placeholder="Please Enter Review"
            maxLength={reviewMaxLength}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <button disabled={!isUploading}>Save Review</button>
      </form>
    </>
  );
}
