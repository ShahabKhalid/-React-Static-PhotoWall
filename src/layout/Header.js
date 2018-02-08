import React, { Component } from 'react'

export default class Header extends Component {

  static defaultStyles() {
    return {
      header: {
        backgroundColor: 'black',
        color: 'lightgray',
        textAlign: 'center',
        padding: '5px',
        fontSize: '1vw'
      }
    };
  }

  render() {
    return (
      <header style={Header.defaultStyles().header}>
        Photo Wall Application
      </header>
    );
  }
}