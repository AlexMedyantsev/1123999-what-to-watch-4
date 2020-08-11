import React from "react";
import rerender from "react-test-renderer";
import MainLogo from "./main-logo.jsx";
import {BrowserRouter} from "react-router-dom";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe(`Render component`, () => {
  it(`Should Error Message render correctly`, () => {
    const store = mockStore({
    });
    const tree = rerender
      .create(
          <BrowserRouter>
            <Provider store={store}>
              <MainLogo
              />
            </Provider>
          </BrowserRouter>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
