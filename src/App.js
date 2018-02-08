import React from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
import { Header, Footer } from './layout'
import 'app.css';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="content">
            <Routes />
          </div>
        <Footer/>
        </div>
      </Router>
    );
  }
}
