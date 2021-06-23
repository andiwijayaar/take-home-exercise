import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, InputLabel, MenuItem, Select, Button, Link, CircularProgress } from '@material-ui/core';
import ApiService from "./api";
import './App.css';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formContainer:{
    flex: 1, 
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderRadius: 10,
    maxWidth: 400,
    margin: 20
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const inProgress = useSelector((state) => state.inProgress);
  const [city, setCity] = React.useState('Kuala Lumpur');
  const [apiKey, setAPI] = React.useState('ff9f895b2e884d6680530135202710');
  const [isError, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setSuccess] = React.useState(false);
  const classes = useStyles();
  const [weatherData, setWeatherData] = React.useState({temp_c:0, temp_f:0});
  const apiChange = (event) => {
    setAPI(event.target.value);
  };
  const cityChange = (event) => {
    setCity(event.target.value);
  };
  const setDefaultAPI = () => {
    setAPI('ff9f895b2e884d6680530135202710');
  };
  const goBack = () => {
    setSuccess(false);
    setWeatherData({});
  };
  const submitData = () => {
    if(!apiKey){
      setError(true);
      setErrorMessage("Please input your API Key to continue.");
      return;
    }
    const req={
      method:'checkWeather',
      params:{
        apiKey: apiKey,
        city: city
      }
    };
    const onSuccess=(response)=>{
      if(response.error){
        // action success but error from response
        setError(true);
        setErrorMessage(response.error.message);
      } else {
        // action success
        setError(false);
        setErrorMessage("");
        setSuccess(true);
        setWeatherData(response.current);
      }
    }
    const onError=(error)=>{
      // action error
      setError(true);
      setErrorMessage(error.message);
    }
    ApiService.open(req).then(onSuccess, onError);
  }

  const handleChangeCelcius = (event) => {}
  const handleChangeFahrenheit = (event) => {}

  return (
    <div className="App">
      {
          isSuccess ?
          <div className={classes.formContainer}>
            <FormControl className={classes.formControl}>
              <TextField id="standard-basic" label="Celcius" value={weatherData.temp_c} onChange={handleChangeCelcius} readOnly={true}/>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="standard-basic" label="Fahrenheit" value={weatherData.temp_f} onChange={handleChangeFahrenheit} readOnly={true}/>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Link href="#" onClick={goBack}>Go Back</Link>
            </FormControl>
          </div>
          :
          <div className={classes.formContainer}>
            { 
              isError ?
              <div>
                <div className="errorMessage">{errorMessage}</div>
                {
                  errorMessage === "API key is invalid." ?
                  <FormControl className={classes.formControl}>
                    <Link href="#" onClick={setDefaultAPI}>Use Default API Key</Link>
                  </FormControl>
                  :
                  null
                }
              </div>
              :
              null
            }
            <FormControl className={classes.formControl}>
              <TextField id="standard-basic" label="Your API Key" value={apiKey} onChange={apiChange}/>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="city" color="secondary">City Name</InputLabel>
              <Select
                id="city"
                value={city}
                onChange={cityChange}
              >
                <MenuItem value="Kuala Lumpur">Kuala Lumpur</MenuItem>
                <MenuItem value="Singapore">Singapore</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button variant="contained" color="secondary" onClick={submitData}>
                Submit
              </Button>
            </FormControl>
          </div>
      }
      
      {
        inProgress ?
        <div className="loader">
          <CircularProgress color="secondary" />
        </div>
        :
        null
      }
    </div>
  );
}

export default App;
