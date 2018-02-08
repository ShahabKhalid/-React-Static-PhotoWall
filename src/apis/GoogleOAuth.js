import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';



export default class GoogleOAuth extends Component {

  constructor(props) {
    super(props);
    this.state = {scriptLoaded: false};
    this.signOut = this.signOut.bind(this);
    this.initClient = this.initClient.bind(this);
  }

  componentDidMount() {
    this.gapi = null;
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }

  handleScriptError() {
    this.setState({ scriptError: true })
  }


  static getUserProfile(user) {
    const profile = user.getBasicProfile();
    return profile ? {
      id: profile.getId(),
      name: profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl()
    }: null;
  }

  signIn() {
    const accessToken = this.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    const profile = GoogleOAuth.getUserProfile(this.gapi.auth2.getAuthInstance().currentUser.get());
    this.props.onSignIn(accessToken, profile);
  }

  signOut() {
    this.gapi.auth2.getAuthInstance().signOut();
    this.gapi.auth2.getAuthInstance().disconnect();
    if(this.props.onSignOut) this.props.onSignOut();
  }

  static _signOut(el) {
    el.signOut();
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
    gapi.load('client:auth2', this.initClient);
    this.gapi = gapi;
  }

  static _initClient(el) {
    el.gapi.load('client:auth2', el.initClient);
  }

  initClient() {
    const self = this;
    gapi.client.init({
      clientId: this.props.clientId,
      scope: this.props.scope.join(' ')
    }).then(function () {
      if(!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        gapi.auth2.getAuthInstance().signIn().then(
          function() {
            self.signIn();
          },
          function(err) {
            if (err.error === "popup_closed_by_user") {
              self.props.onPopUpClose()
            }
          }
        )
      } else {
        self.signIn();
      }
    }).catch(function(error) {

    });
  }

  render() {
    return (
      <div>
        <Script
          url="https://apis.google.com/js/platform.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
      </div>
    );
  }
}

GoogleOAuth.propTypes = {
  clientId: PropTypes.string.isRequired,
  scope: PropTypes.array,
  onSignIn: PropTypes.func,
  onPopUpClose: PropTypes.func
};

GoogleOAuth.defaultProps = { scope: [] };
