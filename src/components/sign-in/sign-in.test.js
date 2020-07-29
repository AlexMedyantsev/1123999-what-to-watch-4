import React from "react";
import renderer from "react-test-renderer";
import AuthScreen from "./sign-in.jsx";


const noop = () => {};

it(`AuthScreen component render correctly`, () => {
  const tree = renderer.create(
      <AuthScreen
        onSubmit={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
