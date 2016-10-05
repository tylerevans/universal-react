import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const App = ({ children }) => {
  return (
    <div>
      <Helmet
        title="MyApp"
        titleTemplate="MyApp - %s"
        meta={[
          { 'char-set': 'utf-8' },
          { name: 'description', content: 'My super dooper dope app' },
        ]}
      />
      <nav>
        <ul>
          <li><Link to="/info">Markets</Link></li>
          <li><Link to="/">Users</Link></li>
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default App;
