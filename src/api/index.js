import React from 'react';
import { store } from '../redux/store';
import { setInProgress } from "../redux/actions";

class ApiService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  open = ({method, params}) => {
    store.dispatch(setInProgress(true));
    const apiURL = 'https://api.weatherapi.com/v1/current.json';
    const successCallback = (result, resolve, reject) => {
      store.dispatch(setInProgress(false));
      resolve(result);
    }
    const errorCallback = (error, reject) => {
      store.dispatch(setInProgress(false));
      reject(error);
    }
    return new Promise((resolve, reject) => {
      let fetchURL = '';
      switch(method){
        case "checkWeather":
          fetchURL = apiURL + '?key='+params.apiKey+'&q='+params.city;
          break;
        default:
          fetchURL = apiURL;
      }

      fetch(fetchURL)
      .then((response) => response.json())
      .then(
        (result) => successCallback(result, resolve, reject),
        (error) => errorCallback(error, reject)
      )
      .catch(error => {
        reject(error);
      })
    })
  }
}

export default new ApiService();
