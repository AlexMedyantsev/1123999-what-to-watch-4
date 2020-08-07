import React from "react";
import PropTypes from "prop-types";

const formatCommentTime = (commentDate) => {
  const d = Date.parse(commentDate);
  const year = new Intl.DateTimeFormat(`en`, {year: `numeric`}).format(d);
  const month = new Intl.DateTimeFormat(`en`, {month: `short`}).format(d);
  const day = new Intl.DateTimeFormat(`en`, {day: `2-digit`}).format(d);

  return month + ` ` + day + `, ` + year;
};

const TabsReviews = (props) => {
  const {comments} = props;

  return (
    <>
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="review"
              >
                <blockquote className="review__quote">
                  <p className="review__text">{comment.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{comment.user.name}</cite>
                    <time className="review__date" dateTime={comment.date}>{formatCommentTime(comment.date)}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{comment.rating}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

TabsReviews.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default TabsReviews;
