import {AuthorizationStatus} from "../../reducer/user/user.js";
import configureStore from "redux-mock-store";
import history from "../../history.js";
import NameSpace from "../../reducer/name-space.js";
import React from "react";
import rerender from "react-test-renderer";
import SignIn from "./sign-in.jsx";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

const noop = () => {};

const mockStore = configureStore([]);

describe(`SignIn test`, () => {
  it(`SignIn renfer correctly`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });
    const tree = rerender.create(
        <Provider store={store}>
          <Router history={history}>
            <SignIn
              onSubmit={noop}
            />
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
