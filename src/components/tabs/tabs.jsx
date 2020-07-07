import React from "react";
import PropTypes from "prop-types";
import {MovieDetailsTabs} from "../../utils/consts.js";

const Tabs = (props) => {

  const {tab: activeTab, onTabClick, children} = props;

  return (
    <React.Fragment>
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {Object.values(MovieDetailsTabs).map((tabName, index) => (
              <li className={`movie-nav__item ${activeTab === tabName && `movie-nav__item--active`}`} onClick={(evt) => {
                evt.preventDefault();
                onTabClick(tabName);
              }
              }
              key={tabName + index}>
                <a href="#" className="movie-nav__link">{tabName}</a>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </div>
    </React.Fragment>
  );
};

Tabs.propTypes = {
  tab: PropTypes.oneOf([MovieDetailsTabs.OVERVIEW, MovieDetailsTabs.DETAILS, MovieDetailsTabs.REVIEWS]).isRequired,
  onTabClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tabs;
