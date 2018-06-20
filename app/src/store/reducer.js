const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case "SET_ORG": return {...state, org: action.payload};
        case "SET_PROJECTS": return {...state, projects: action.payload};
        case "SET_PROJECT_FOCUS": return {...state, projectsInFocus: [...state.projectsInFocus, action.payload]};
        case "REMOVE_PROJECT_FOCUS": return {...state, projectsInFocus: state.projectsInFocus.filter(p => p !== action.payload)};
        case "ADD_REPO_TO_COMPARE_LIST": return {...state, projectsToCompare: [...state.projectsToCompare, action.payload]};
        case "ADD_REPOS_TO_COMPARE_LIST": return {...state, projectsToCompare: [...state.projectsToCompare, ...action.payload]};
        case "REMOVE_ALL_PROJECTS_FROM_COMPARE_LIST": return {...state, projectsToCompare: []};

        default:
            return state;
    }
}

export default reducer;
