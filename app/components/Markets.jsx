import React from 'react';

const Markets = ({ markets }) => {
  return (
    <div>
      {markets.list.map((market, index) => {
        return (
          <div key={index}>
            {market.market}, bid: {market.data.bid.price} {market.data.bid.volume}, ask: {market.data.ask.price} {market.data.ask.volume} <br />
          </div>
        );
      })}
    </div>
  );
};

export default Markets;
