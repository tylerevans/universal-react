import {
  MARKETS_INVALID,
  MARKETS_FETCHING,
  MARKETS_FETCHED,
  MARKETS_FETCH_FAILED,
} from '../actions/markets';

export default function users(state = {
  readyState: MARKETS_INVALID,
  data: null,
}, action) {
  switch (action.type) {
    case MARKETS_FETCHING:
      return Object.assign({}, state, {
        readyState: MARKETS_FETCHING,
      });
    case MARKETS_FETCH_FAILED:
      return Object.assign({}, state, {
        readyState: MARKETS_FETCH_FAILED,
        error: action.error,
      });
    case MARKETS_FETCHED:
      return Object.assign({}, state, {
        readyState: MARKETS_FETCHED,
        list: action.result,
      });
    default:
      return state;
  }
}
