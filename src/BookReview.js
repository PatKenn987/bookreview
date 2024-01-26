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

function BookReview() {
  return (
    <>
      <header> Please add a new Book Review</header>
      <form className="book-review-form">
        <label className="title">Provide Title for book</label>
        <div className="inputbox">
          <input type="text" id="title" placeholder="Book Title" />
        </div>

        <label for="author">Provide Book Author</label>
        <div className="inputbox">
          <input type="text" id="author" placeholder="Book Author" />
        </div>

        <label for="startDate">Started reading?</label>
        <div className="inputbox">
          <input type="date" id="startDate" placeholder="Start Date" />
        </div>

        <label for="finishDate">Finished reading?</label>
        <div className="inputbox">
          <input type="date" id="finishDate" placeholder="End Date" />
        </div>

        <label>Rank Book</label>
        <div className="inputbox">
          <input type="number" placeholder="Rating (0-5)" min="0" max="5" />
        </div>

        <label>Who are you?</label>
        <div className="select">
          <select name="slct" id="slct">
            <option value="">Choose User</option>
            <option value="1">Patrick Kennedy</option>
            <option value="2">Ann Kennedy</option>
          </select>
        </div>

        <label>Was this a fiction book?</label>
        <input type="checkbox" placeholder="Fiction" />
        <label>Please select genre</label>
        <div>
          <select>
            <option value="">Select Genre</option>
            {FictionCategories.map((fCat) => (
              <option key={fCat.id} value={fCat.id}>
                {fCat.name}
              </option>
            ))}
            {/* <option value="1">History</option>
            <option value="2">Auto Biography</option>
            <option value="3">Biography</option>
            <option value="4">Psychology</option> */}
          </select>
        </div>
        <div className="review">
          <input type="text" placeholder="Review" />
        </div>

        <button>Save Re</button>
      </form>
    </>
  );
}
export default BookReview;
