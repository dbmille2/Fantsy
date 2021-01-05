import { fetch } from "./csrf.js";

const SEARCH_USERS = "search/searchUsers";

const loadUserResults = (users) => ({
  type: SEARCH_USERS,
  payload: users,
});

export const searchUsers = (query) => async (dispatch) => {
  const res = await fetch(`/api/search/users/${query}`);
  const users = res.data.users;
  dispatch(loadUserResults(users));
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case SEARCH_USERS:
      newState = { ...state };
      newState.users = action.payload;
      return newState;
    default:
      return state;
  }
}

export default reducer;
