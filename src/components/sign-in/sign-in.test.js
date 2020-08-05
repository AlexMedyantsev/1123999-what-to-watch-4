import {AuthorizationStatus} from "../../reducer/user/user.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import React from "react";
import rerender from "react-test-renderer";
import SignIn from "./sign-in.jsx";
import {Provider} from "react-redux";

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
          <SignIn
            onSubmit={noop}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
