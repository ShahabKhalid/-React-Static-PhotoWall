/*
  ReactJS-Google-Drive API v1.0.0
       By Shahab Khalid
*/
import constants from '../Constants';
export default class GoogleDriveApi {

  static init(accessToken) {
    console.log(accessToken);
    GoogleDriveApi.contentType = "application/json; charset=UTF-8";
    GoogleDriveApi.filesURL = "https://www.googleapis.com/drive/v3/files";
    GoogleDriveApi.accessToken = accessToken;
  }

  static createHeaders() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', GoogleDriveApi.contentType);
    headers.append('Authorization', "Bearer " + GoogleDriveApi.accessToken);
    return headers;
  }

  static list() {
    return fetch(constants.API_URL, {
      headers: GoogleDriveApi.createHeaders()
    });
  }
}
