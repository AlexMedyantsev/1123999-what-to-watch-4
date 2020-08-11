import React from "react";
import rerender from "react-test-renderer";
import {ErrorMessage} from "./error-message.jsx";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const errorMessage = `Error`;

const mockStore = configureStore([]);

describe(`Render component`, () => {
  it(`Should Error Message render correctly`, () => {
    const store = mockStore({
      CONDITION: {
        errorMessage,
      }
    });
    const tree = rerender
      .create(
          <Provider store={store}>
            <ErrorMessage
              errorMessage={errorMessage}
              isVisible={true}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
