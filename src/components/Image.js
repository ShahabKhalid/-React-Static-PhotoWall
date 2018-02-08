import React, { Component } from 'react'
import { loading, errorImage } from '../images'

export default class Image extends Component {

  constructor(props) {
    super(props);
    this.state = { fetched: false }
  }

  defaultStyle() {
    return {
      img: {
        width: this.props.index % 3 === 0 ? '95%' : '47%',
        paddingRight: this.props.index % 3 === 0 ? '0' : '2px',
        paddingLeft: this.props.index % 3 === 0 ? '0' : '2px',
        paddingTop: '10px'
      },
      loadingImg: {
        width: this.props.index % 3 === 0 ? '68%' : '32%',
        paddingRight: this.props.index % 3 === 0 ? '0' : '2px',
        paddingLeft: this.props.index % 3 === 0 ? '0' : '2px',
        paddingTop: '10px'
      }
    }
  }

  componentWillMount() {
    fetch(this.props.source,
    {
      headers: this.props.headers,
    }).then(response => {
      const image = document.getElementById(this.props.index);
      if(response.status === 200) {
        response.blob()
          .then(blob => {
            this.setState({ fetched: true });
            image.src = URL.createObjectURL(blob);
          })
      } else {
        image.src = errorImage;
      }
    })
  }

  render() {
    return (
      <img
        style={this.state.fetched ? this.defaultStyle().img : this.defaultStyle().loadingImg}
        id={this.props.index}
        src={loading}
      />
    );
  }
}
