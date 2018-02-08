import React, { Component } from 'react'
import { loading, errorImage } from '../images'

export default class Video extends Component {

  constructor(props) {
    super(props);
    this.state = { fetched: false }
  }

  defaultStyle() {
    return {
      video: {
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
      const videoSource = document.getElementById(this.props.index);
      if(response.status === 200) {
        response.blob()
          .then(blob => {
            this.setState({ fetched: true, videoBlob: URL.createObjectURL(blob) });
          })
      } else {
        const image = document.getElementById("img_"+this.props.index);
        image.src = errorImage;
      }
    })
  }

  render() {
    return (
      <span>
        {!this.state.fetched ?
          <img
            style={this.defaultStyle().loadingImg}
            id={"img_"+this.props.index}
            src={loading}
          />
          :
          <video
            style={this.defaultStyle().video} controls="controls"
            id={this.props.index}
            src={this.state.videoBlob}>
          </video>
        }
      </span>
  );
  }
}
