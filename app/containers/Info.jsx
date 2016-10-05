import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as MarketsActions from '../actions/markets';

import Markets from '../components/Markets';

class Info extends Component {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(MarketsActions.fetchMarketsIfNeeded()),
    ]);
  }

  componentDidMount() {
    Info.readyOnActions(this.props.dispatch);
  }

  renderMarkets() {
    const markets = this.props.markets;

    if (markets.readyState === MarketsActions.MARKETS_INVALID ||
      markets.readyState === MarketsActions.MARKETS_FETCHING) {
      return <p>Loading...</p>;
    }

    if (markets.readyState === MarketsActions.MARKETS_FETCH_FAILED) {
      return <p>Failed to fetch markets</p>;
    }

    return <Markets markets={markets} />;
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h5>Markets:</h5>
              {this.renderMarkets()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    markets: state.markets,
  };
};

export default connect(mapStateToProps)(Info);
