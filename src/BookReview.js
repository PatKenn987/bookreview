import "./bookformstyles.css";

export default function BookReview() {
  return (
    <>
      <header> Please add a new Book Review</header>

      <div className="container">
        <form className="book-review-form">
          <label for="title">Provide Title for book</label>
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
              <option value="1">History</option>
              <option value="2">Auto Biography</option>
              <option value="3">Biography</option>
              <option value="4">Psychology</option>
            </select>
          </div>
          <div className="review">
            <input type="text" placeholder="Review" />
          </div>

          <button>Post</button>
        </form>
      </div>
    </>
  );
}
