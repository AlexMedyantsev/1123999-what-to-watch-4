import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MainLogo from "../main-logo/main-logo.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import {connect} from "react-redux";
import {getIsFavoriteMovies} from "../../reducer/data/selectors.js";

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {isFavoriteMovies} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <MainLogo />

          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            <MoviesList
              movies={isFavoriteMovies}
            />
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFavoriteMovies: getIsFavoriteMovies(state),
});

MyList.propTypes = {
  movies: PropTypes.array.isRequired,
  isFavoriteMovies: PropTypes.array.isRequired,
};

export {MyList};
export default connect(mapStateToProps)(MyList);
