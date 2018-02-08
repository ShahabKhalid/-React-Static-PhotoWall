import React, { Component } from 'react';
import Image from './Image';
import constants from '../Constants';
import { signinLoading } from '../images';
import Video from "./Video";
export default class PhotoWall extends Component {

  static isMedia(file) {
    return PhotoWall.isImage(file) || PhotoWall.isVideo(file);
  }

  static isVideo(file) {
    const imageTypes = ['video/mp4', 'video/webm', ' video/ogg'];
    return imageTypes.includes(file.mimeType);
  }

  static isImage(file) {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/x-icon', 'image/svg+xml', ' image/tiff', 'image/webp', ];
    return imageTypes.includes(file.mimeType);
  }

  static isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderPhotos = this.renderPhotos.bind(this);

    this.state = {
      renderedPhotos: []
    };
  }

  componentWillMount() {
    this.startPhotoIndex = 0;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const wall = document.getElementById('wall');
    if(PhotoWall.isBottom(wall)) {
      this.renderPhotos();
    }
  }

  renderPhotos() {
    const images = this.props.files.items.filter(PhotoWall.isMedia);
    const slicedImages = images.slice(this.startPhotoIndex, this.startPhotoIndex + constants.LOAD_IMAGES_COUNT);
    this.setState({
      renderedPhotos: this.state.renderedPhotos.length === 0 ?
        slicedImages : [...this.state.renderedPhotos, ...slicedImages]
    });
    if(slicedImages.length === 0) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    this.startPhotoIndex += constants.LOAD_IMAGES_COUNT;
  }

  render() {
    return (
      <div>
        {this.state.renderedPhotos.length === 0 && this.props.files && this.renderPhotos()}
        {this.props.files === null ?
          <div>
            <img src={signinLoading}/>
            <h1>Fetching files from Google Drive</h1>
          </div>
          :
          <div id='wall'>
            {this.state.renderedPhotos.map((file, index, array) =>
                <span key={index}>
                  {PhotoWall.isImage(file) ?
                    <Image
                      source={constants.API_URL + '/' + file.id + '?alt=media'}
                      fileData={file}
                      headers={this.props.headers}
                      index={index}
                    /> :
                    <Video
                      source={constants.API_URL + '/' + file.id + '?alt=media'}
                      fileData={file}
                      headers={this.props.headers}
                      index={index}
                    />
                  }
          </span>
            )}
          </div>
        }
      </div>
    );
  }
}