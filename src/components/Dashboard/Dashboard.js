import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import firebase from "../../firebase";

export default function Dashboard(props) {
  const [reviews, setReviews] = useState([]);
  const [restaurant, setRestaurant] = useState("");
  const [address, setAddress] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebase.getReviews().then(reviews => {
      let newReviews = [];
      reviews.forEach(review => {
        newReviews.push(review.data().review);
      });
      console.log(newReviews);
      setReviews(newReviews);
      setLoading(false);
    });
  }, [loading]);

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please login first");
    props.history.replace("/login");
    return null;
  }

  async function addReview() {
    try {
      await firebase.addReview({ restaurant, address, review });
      setAddress("");
      setRestaurant("");
      setReview("");
      setLoading(true);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Hello {firebase.getCurrentUsername()}</h2>
        <h4>Current Reviews:</h4>
        <div className="row">
          {reviews.map((review, index) => (
            <div key={index} className="col s6">
              <div className="card horizontal">
                <div className="card-stacked">
                  <div className="card-content">
                    <p>
                      <strong>{review.restaurant}</strong>
                    </p>
                    <p>{review.review}</p>
                  </div>
                  <div className="card-action">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${review.address}`}
                      target="_blank" rel="noopener noreferrer"
                    >
                      {review.address}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr />

        <h4>Add A Review</h4>
        <form onSubmit={e => e.preventDefault() && false}>
          <div className="input-field">
            <input
              placeholder="restaurant"
              type="text"
              value={restaurant}
              className="validate"
              aria-label="restaurant"
              onChange={e => setRestaurant(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="address"
              type="text"
              value={address}
              className="validate"
              aria-label="address"
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="review"
              type="text"
              value={review}
              className="validate"
              aria-label="review"
              onChange={e => setReview(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-large" onClick={addReview}>
            Add Review
          </button>
        </form>
      </div>
    </main>
  );
}
