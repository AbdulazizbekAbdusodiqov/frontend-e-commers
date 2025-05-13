import React from 'react';
import './Reviews.scss';

const reviews = [
  {
    name: 'Samantha D.',
    date: 'August 14, 2023',
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It’s become my favorite go-to shirt.",
    rating: 4.5
  },
  {
    name: 'Alex M.',
    date: 'August 15, 2023',
    text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I’m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    rating: 5
  },
  {
    name: 'Ethan R.',
    date: 'August 16, 2023',
    text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer’s touch in every aspect of this shirt.",
    rating: 4.5
  },
  {
    name: 'Olivia P.',
    date: 'August 17, 2023',
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It’s evident that the designer poured their creativity into making this t-shirt stand out.",
    rating: 5
  },
  {
    name: 'Liam K.',
    date: 'August 18, 2023',
    text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer’s skill. It’s like wearing a piece of art that reflects my passion for both design and fashion.",
    rating: 5
  },
  {
    name: 'Ava H.',
    date: 'August 19, 2023',
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    rating: 4.5
  }
];

const ReviewsSection = () => {
  return (
    <div className="reviews-section">
      <h2>All Reviews <span>({reviews.length})</span></h2>
      <div className="reviews-grid">
        {reviews.map((review, idx) => (
          <div key={idx} className="review-card">
            <div className="stars">{"★".repeat(Math.floor(review.rating))}{"½"}</div>
            <h4>{review.name} <span className="verified">✔️</span></h4>
            <p>{review.text}</p>
            <small>Posted on {review.date}</small>
          </div>
        ))}
      </div>
      <button className="load-more">Load More Reviews</button>
    </div>
  );
};

export default ReviewsSection;
