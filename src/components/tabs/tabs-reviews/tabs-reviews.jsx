import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {columnNumbers} from "../../../utils/consts.js";

const formatCommentTime = (commentDate) => {
  const d = Date.parse(commentDate);
  const year = new Intl.DateTimeFormat(`en`, {year: `numeric`}).format(d);
  const month = new Intl.DateTimeFormat(`en`, {month: `short`}).format(d);
  const day = new Intl.DateTimeFormat(`en`, {day: `2-digit`}).format(d);

  return month + ` ` + day + `, ` + year;
};

class TabsReviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  returnCommentsInLayout(comments, columnNumber) {
    let commentsArrayHalf = ``;

    if (columnNumber === `first`) {
      commentsArrayHalf = comments.length % 2 === 0 ? comments.slice(0, comments.length / 2) : comments.slice(0, Math.floor((comments.length / 2) + 1));
    } else if (columnNumber === `second`) {
      commentsArrayHalf = comments.slice(Math.round((comments.length / 2)), comments.length);
    }

    return commentsArrayHalf.map((comment) => {
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
    });
  }

  render() {
    const {comments} = this.props;

    return (
      <>
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {this.returnCommentsInLayout(comments, columnNumbers.first)}
          </div>
          <div className="movie-card__reviews-col">
            {this.returnCommentsInLayout(comments, columnNumbers.second)}
          </div>
        </div>
      </>
    );
  }

}

TabsReviews.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default TabsReviews;
