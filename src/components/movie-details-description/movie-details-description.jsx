import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import TabsOverview from "../tabs/tabs-overview/tabs-overview.jsx";
import TabsDetails from "../tabs/tabs-details/tabs-details.jsx";
import TabsReviews from "../tabs/tabs-reviews/tabs-reviews.jsx";
import {MovieDetailsTabs} from "../../utils/consts.js";


export default class MovieDetailsDescription extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movie, setActiveItem} = this.props;

    switch (this.props.activeItem) {
      case MovieDetailsTabs.OVERVIEW:
        return (
          <Tabs
            tab={MovieDetailsTabs.OVERVIEW}
            onTabClick={setActiveItem}
          >
            {<TabsOverview
              movie={movie}
            >
            </TabsOverview>}
          </Tabs>
        );
      case MovieDetailsTabs.DETAILS:
        return (
          <Tabs
            tab={MovieDetailsTabs.DETAILS}
            onTabClick={setActiveItem}
          >
            {<TabsDetails
              movie={movie}
            >
            </TabsDetails>}
          </Tabs>
        );

      case MovieDetailsTabs.REVIEWS:
        return (
          <Tabs
            tab={MovieDetailsTabs.REVIEWS}
            onTabClick={setActiveItem}
          >
            {<TabsReviews
              comments={this.props.comments}
            />}
          </Tabs>
        );
    }
    return null;
  }
}

MovieDetailsDescription.propTypes = {
  movie: PropTypes.object.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};
