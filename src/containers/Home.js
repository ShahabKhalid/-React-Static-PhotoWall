import React, { Component } from 'react'
import GoogleOAuth from '../apis/GoogleOAuth'
import GoogleDriveApi from '../apis/GoogleDriveApi'
import PhotoWall from '../components/PhotoWall'

export default class Home extends Component {

  static defaultStyle() {
    return {
      div: {
        textAlign: 'center'
      },
      pleaseSignIn: {
        paddingTop: '100px',
        paddingBottom: '10px'
      },
      p: {
        margin: '0 auto',
        width: '400px'
      }
    }
  }

  CLIENT_ID = "310548436926-8el3435uc954d0cnan8fq2pqm3vnp2a6.apps.googleusercontent.com";
  SCOPE_LIST = ['https://www.googleapis.com/auth/drive','profile'];

  constructor(props) {
    super(props);
    this.state = { signed: false, files: null, popupClosed: false };
  }

  onSignIn(accessToken, profile) {
    console.log(accessToken);
    console.log(profile);
    this.setState({ signed: true });
    GoogleDriveApi.init(accessToken);
    const self = this;
    GoogleDriveApi.list().then(function(response) {
      return response.json();
    }).then(function(data) {
      self.setState({ files: data });
    });
  }

  onSignOut() {
    this.setState({ signed: false });
  }

  onPopUpClose() {
    this.setState({ popupClosed: true });
  }

  render() {
    return (
      <div style={Home.defaultStyle().div}>
        <div>
          <h1>Photo Wall</h1>
          <p style={Home.defaultStyle().p}>There are two people in every photograph: the photographer and the viewer</p>
        </div>
        <GoogleOAuth
          ref={(googleOAuth) => this.googleOAuth = googleOAuth}
          clientId={this.CLIENT_ID}
          scope={this.SCOPE_LIST}
          onSignIn={this.onSignIn.bind(this)}
          onSignOut={this.onSignOut.bind(this)}
          onPopUpClose={() => this.onPopUpClose()}
        />
        {this.state.signed &&
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            GoogleOAuth._signOut(this.googleOAuth);
          }
          }
        >
          Sign-out from Google
        </a>
        }
        <div>
        {!this.state.signed ?
          <div>
            <h1
              style={Home.defaultStyle().pleaseSignIn}
            >
              Sign-in to your Google to proceed
            </h1>
            {(this.state.popupClosed || !this.state.signed) &&
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  GoogleOAuth._initClient(this.googleOAuth);
                }
                }
              >
                Sign-in to Google
              </a>
            }
          </div>
          :
          <div>
            <PhotoWall
              files={this.state.files}
              headers={GoogleDriveApi.createHeaders()}
            />
          </div>
        }
        </div>
      </div>
    );
  }
}
