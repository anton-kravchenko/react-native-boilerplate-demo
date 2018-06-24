// @flow
import store from "../../store/store";
import { defaultState } from "../../store/createStore";

test("test store initialization", () => {
  /* Following basically checks, that store was initialized with proper initial state*/
  expect(store.getState()).toEqual(defaultState);
});
