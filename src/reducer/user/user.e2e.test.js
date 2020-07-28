import {reducer, AuthorizationStatus, ActionType, Operation} from "./user.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const authData = {
  login: `asd@mail.ru`,
  password: `asda`,
};

const api = createAPI(() => {});

describe(`Check user reducer`, () => {
  it(`it should return default initialState when passed nothing`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`it should change Autorization Status on change`, () => {
    expect(reducer(initialState, {type: ActionType.REQUIRED_AUTHORIZATION, payload: AuthorizationStatus.AUTH})).toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });

  it(`it should check AuthorizationStatus correctly`, () => {
    const check = Operation.checkAuth();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    apiMock.onGet(`/login`).reply(200);
    return check(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      }
      );
  });

  it(`it should send AuthorizationStatus correctly`, () => {
    const check = Operation.login(authData);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    apiMock.onPost(`/login`).reply(200);
    return check(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      }
      );
  });
});
