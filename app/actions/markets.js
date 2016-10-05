/* global fetch */

export const MARKETS_INVALID = 'MARKETS_INVALID';
export const MARKETS_FETCHING = 'MARKETS_FETCHING';
export const MARKETS_FETCHED = 'MARKETS_FETCHED';
export const MARKETS_FETCH_FAILED = 'MARKETS_FETCH_FAILED';

function fetchMarkets() {
  return (dispatch) => {
    dispatch({ type: MARKETS_FETCHING });

    return fetch('http://arbitron.io:3334/api/marketdata')
      .then((response) => {
        return response.json();
      })
      .then(
        result => dispatch({ type: MARKETS_FETCHED, result }),
        error => dispatch({ type: MARKETS_FETCH_FAILED, error })
      );
  };
}

function shouldFetchMarkets(state, userId) {
  const user = state.user[userId];

  if (!user ||
    user.readyState === MARKETS_FETCH_FAILED ||
    user.readyState === MARKETS_INVALID) {
    return true;
  }

  return false;
}

export function fetchMarketsIfNeeded() {
  return (dispatch, getState) => { // eslint-disable-line
    if (shouldFetchMarkets(getState())) {
      return dispatch(fetchMarkets());
    }
  };
}
