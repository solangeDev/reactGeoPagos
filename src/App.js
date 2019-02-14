import React, { Component } from 'react';
import Header from './header';
import Register from './pages/Register';
import Location from './pages/Location';
import Login from './pages/Login';
const axios = require('axios');

class App extends Component {
      state = {
        list: [
          { id:1, name:'Registro'},
          { id:2, name:'Registro'},
          { id:3, name:'Registro'},
          { id:4, name:'Success'},
        ],
        endstep:4,
        step:1,
        valid:true,
        provinces: null,
        localities:null,
        showPassword:false,
        user:{
          name:undefined,
          cuil:undefined,
          street:undefined,
          num_street: undefined,
          provinces:undefined,
          locale:undefined,
          email:undefined,
          password:undefined,
        },
        formValid:{
          name:true,
          cuil:true,
          street:true,
          num_street:true,
          provinces:true,
          locale:true,
        }
      }

      getDataProvincies = async () => {
        try {
          const response = await axios.get('https://geopagos-challenge.s3.amazonaws.com/provinces.json');
          
          const setArr=[]
          const slf = this;
          response.data.forEach( async function (element) {
            let objItem={}
            objItem.label = element.name
            objItem.value = element.id
            
            const setCities=[]
            const cities = await axios.get(`https://geopagos-challenge.s3.amazonaws.com/provinces/${element.id}.json`);
            cities.data.cities.forEach(function(element){
              let objItem={}
              objItem.label = element.name
              objItem.value = element.id
              setCities.push(objItem)
            })
            objItem.cities = setCities
            setArr.push(objItem)
          });
          this.setState({
            provinces: setArr
          })
        } catch (error) {
          console.error(error);
        }
      }

      getDataLocalities = async (prov) => {
        try {
          const response = await axios.get(`https://geopagos-challenge.s3.amazonaws.com/provinces/${prov}.json`);
          return response.data.cities;
        } catch (error) {
          console.error(error);
        }
      }

      componentDidMount(){
        this.getDataProvincies()
      }
      
      nextStepClick = (event) => {
        if(this.state.step+1<this.state.endstep){
          this.setState({
            step: this.state.step + 1,
          })
        }else{
          if(this.state.valid){
           this.setState({
             step: this.state.endstep,
           })
          }
        }
      }

      prevStepClick = (event) => {
          this.setState({
            step: this.state.step - 1,
          })
      }

      setStateUser =  values => {
        const newUser = {...this.state.user,...values}
        this.setState({
          user: newUser
        })
      }

      setStateFormValid =  values => {
        const newForm = {...this.state.formValid,...values}
        this.setState({
          formValid: newForm
        })
      }
      
      changeStateFormValid = event => {
        const { name, value } = event.target
        const obj = {}
        if(value){
          obj[name] = true
          this.setStateFormValid(obj)
        }
      }

      changeProvinces = event =>{
        let slf = this;
        let copieState=null
        this.state.provinces.forEach(function(element){
          if(element.value==event.value){
            copieState = {...slf.state,localities:element.cities}
          }
        })
        const copieFormValid = {...this.state.formValid,provinces:true}
        const copieStateUser = {...this.state.user,provinces:event.value,locale:undefined}
        this.setState({
          ...copieState,
          user:copieStateUser,
          formValid:copieFormValid,
        })
      }

      changeLocale = event =>{
        console.log(event)
        const copieStateUser = {...this.state.user,locale:event.value}
        const copieFormValid = {...this.state.formValid,locale:true}
        this.setState({
          user:copieStateUser,
          formValid:copieFormValid,
        })
      }
      

      handleShowPassword = (e) =>{
        let showPass=this.state.showPassword
        if (e.target.checked){
           showPass = true
        }else{
           showPass = false
        }
        this.setState({  
          showPassword: showPass
        })
      }

      nextComponentStep=(step)=>{
        switch (step) {
          case 1:
            return <Register user={this.state.user} form={this.state.formValid} nextStepClick={this.nextStepClick} setStateUser={this.setStateUser} setStateFormValid={this.setStateFormValid} changeStateFormValid={this.changeStateFormValid}/>;
          break;
          case 2:
            return <Location user={this.state.user} form={this.state.formValid} provinces={this.state.provinces} localities={this.state.localities}  nextStepClick={this.nextStepClick} setStateUser={this.setStateUser} prevStepClick={this.prevStepClick} setStateFormValid={this.setStateFormValid} changeStateFormValid={this.changeStateFormValid} changeProvinces={this.changeProvinces} changeLocale={this.changeLocale} />;
          break;
          case 3:
            return <Login nextStepClick={this.nextStepClick} setStateUser={this.setStateUser} showPassword={this.state.showPassword} handleShowPassword={this.handleShowPassword}
            prevStepClick={this.prevStepClick} />;
          break;
        }
      }


      render() {
        const dataList=this.state.list.filter(list => list.id==this.state.step);
        const stepComponet = this.nextComponentStep(this.state.step);
        return (
          <div className="container">
              <Header title={dataList[0].name} step={dataList[0].id} />
              {stepComponet}
          </div>
        );
      }
}

export default App;