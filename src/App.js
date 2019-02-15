import React, { Component } from 'react';
import Header from './header';
import Register from './pages/Register';
import Location from './pages/Location';
import Login from './pages/Login';
import Success from './pages/Success';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { async } from 'q';
library.add(faCheckCircle)


const axios = require('axios');

class App extends Component {
  state = {
    list: [
      { id: 1, name: 'Registro' },
      { id: 2, name: 'Registro' },
      { id: 3, name: 'Registro' },
      { id: 4, name: 'Success' }
    ],
    endstep: 4,
    step: 1,
    minlengthPass: 8,
    provinces: null,
    localities: [{ label: 'Seleccione', value: '' }],
    showPassword: false,
    user: {
      name: undefined,
      cuil: undefined,
      cuilmask: undefined,
      street: undefined,
      num_street: undefined,
      provinces: undefined,
      locale: undefined,
      email: undefined,
      password: undefined
    },
    formValid: {
      valid: true,
      name: true,
      cuil: true,
      street: true,
      num_street: true,
      provinces: true,
      locale: true,
      email: true,
      password: true
    }
  };

  getDataProvincies = async () => {
    try {
      const response = await axios.get(
        'https://geopagos-challenge.s3.amazonaws.com/provinces.json'
      );

      const setArr = [];
      const slf = this;
      response.data.forEach(async function(element) {
        let objItem = {};
        objItem.label = element.name;
        objItem.value = element.id;

        const setCities = [];
        const cities = await axios.get(
          `https://geopagos-challenge.s3.amazonaws.com/provinces/${
            element.id
          }.json`
        );
        cities.data.cities.forEach(function(element) {
          let objItem = {};
          objItem.label = element.name;
          objItem.value = element.id;
          setCities.push(objItem);
        });
        objItem.cities = setCities;
        setArr.push(objItem);
      });
      this.setState({
        provinces: setArr
      });
    } catch (error) {
      console.error(error);
    }
  }

  sendState = async () =>{
    try {
      const response = await axios({
        method: 'post',
        url: 'http://www.mocky.io/v2/5c662b9730000070008c266b',
        data: this.state.user
      });
      if(response.status==200){
        this.nextStepClick();
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getDataProvincies();
  }

  nextStepClick = event => {
    if (this.state.step + 1 < this.state.endstep) {
      this.setState({
        step: this.state.step + 1
      });
    } else {
      if (this.state.step + 1 === this.state.endstep) {
        this.setState({
          step: this.state.endstep
        });
      }
    }
  };

  prevStepClick = event => {
    this.setState({
      step: this.state.step - 1
    });
  };

  setStateUser = values => {
    const newUser = { ...this.state.user, ...values };
    this.setState({
      user: newUser
    });
  };

  setStateFormValid = values => {
    const newForm = { ...this.state.formValid, ...values };
    this.setState({
      formValid: newForm
    });
  };

  changeStateFormValid = event => {
    const { name, value } = event.target;
    const obj = {};
    if (value) {
      obj[name] = true;
      this.setStateFormValid(obj);
    }
  };

  changeProvinces = event => {
    let slf = this;
    let copieState = null;
    this.state.provinces.forEach(function(element) {
      if (element.value === event.value) {
        copieState = { ...slf.state, localities: element.cities };
      }
    });
    const copieFormValid = { ...this.state.formValid, provinces: true };
    const copieStateUser = {
      ...this.state.user,
      provinces: event.value,
      locale: undefined
    };
    this.setState({
      ...copieState,
      user: copieStateUser,
      formValid: copieFormValid
    });
  };

  changeLocale = event => {
    const copieStateUser = { ...this.state.user, locale: event.value };
    const copieFormValid = { ...this.state.formValid, locale: true };
    this.setState({
      user: copieStateUser,
      formValid: copieFormValid
    });
  };

  handleShowPassword = e => {
    let showPass = this.state.showPassword;
    if (e.target.checked) {
      showPass = true;
    } else {
      showPass = false;
    }
    this.setState({
      showPassword: showPass
    });
  };

  nextComponentStep = step => {
    const propsGlobalFunctions = {
      nextStepClick: this.nextStepClick,
      setStateUser: this.setStateUser,
      setStateFormValid: this.setStateFormValid,
      changeStateFormValid: this.changeStateFormValid,
      prevStepClick: this.prevStepClick
    };
    switch (step) {
      case 1:
        return <Register state={this.state} Functions={propsGlobalFunctions} />;
        break;
      case 2:
        return (
          <Location
            state={this.state}
            Functions={propsGlobalFunctions}
            changeStateFormValid={this.changeStateFormValid}
            changeProvinces={this.changeProvinces}
            changeLocale={this.changeLocale}
          />
        );
        break;
      case 3:
        return (
          <Login
            state={this.state}
            Functions={propsGlobalFunctions}
            showPassword={this.state.showPassword}
            handleShowPassword={this.handleShowPassword}
            prevStepClick={this.prevStepClick}
            sendState={this.sendState}
          />
        );
        break;
      case 4:
        return <Success state={this.state} />;
        break;
    }
  };

  render() {
    const dataList = this.state.list.filter(
      list => list.id === this.state.step
    );
    const stepComponet = this.nextComponentStep(this.state.step);
    const header = (this.state.step!=this.state.endstep)?<Header title={dataList[0].name} step={dataList[0].id}/>:null;
    return (
      <div className="outer-container">
        <div className="form-container">
          {header}
          {stepComponet}
        </div>
      </div>
    );
  }
}

export default App;
