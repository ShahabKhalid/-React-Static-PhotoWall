import React, { Component } from 'react'

export default class Footer extends Component {

  static defaultStyles() {
    return {
      footer: {
        margin: '0 auto',
        width: '95%',
        padding: '0px',
        fontSize: '1.2vw'
      },
      div: {
        display: 'flex'
      },
      h2: {
        color: 'gray'
      },
      p: {
        paddingTop: '1.3vw',
        paddingLeft: '1.5vw',
        color: 'grey'
      }
    };
  }

  render() {
    return (
      <footer style={Footer.defaultStyles().footer}>
        <hr />
        <div style={Footer.defaultStyles().div}>
          <h1 style={Footer.defaultStyles().h2}>Photo Wall</h1>
          <p style={Footer.defaultStyles().p}>© Photo Wall 2018</p>
        </div>
      </footer>
    );
  }
}