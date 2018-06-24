import reducer from "../../store/reducer";

describe("test reducer", () => {
  it("should set organitation name", () => {
    const organizationName = "orgName";
    const expectedState = { organizationName };
    const action = {
      type: "SET_ORGANIZATION_NAME",
      payload: organizationName
    };
    expect(reducer({}, action)).toEqual(expectedState);
  });

  it("should set projects", () => {
    const projects = [{ id: 0 }, { id: 1 }];
    const action = {
      type: "SET_PROJECTS",
      payload: projects
    };
    const expectedState = { projects };
    expect(reducer({}, action)).toEqual(expectedState);
  });

  it("should add project to compare list", () => {
    const ptc1 = { id: 0 };
    const ptc2 = { id: 1 };
    const ptc3 = { id: 2 };
    const action1 = {
      type: "ADD_REPO_TO_COMPARE_LIST",
      payload: ptc1
    };
    const action2 = {
      type: "ADD_REPO_TO_COMPARE_LIST",
      payload: ptc2
    };
    const action3 = {
      type: "ADD_REPO_TO_COMPARE_LIST",
      payload: ptc3
    };

    let state = { projectsToCompare: [] };
    const expectedState = {
      projectsToCompare: [ptc1, ptc2, ptc3]
    };
    state = reducer(state, action1);
    state = reducer(state, action2);
    state = reducer(state, action3);

    expect(state).toEqual(expectedState);
  });

  it("should remove all projects from compare list", () => {
    const projectsToCompare = [{ id: 0 }, { id: 2 }, { id: 3 }];
    const state = { projectsToCompare };
    const expectedState = { projectsToCompare: [] };
    const action = { type: "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST" };
    expect(reducer(state, action)).toEqual(expectedState);
  });
  it("should set fatch fail info", () => {
    const action = {
      type: "SET_FETCH_FAIL",
      payload: "Not Found"
    };
    const expectedState = {
      fetchFailed: true,
      fetchError: "Not Found"
    };

    expect(reducer({}, action)).toEqual(expectedState);
  });
});
