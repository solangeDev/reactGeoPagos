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
        showPassword:false,
        user:{
          name:null,
          cuil:null,
          street:null,
          num_street: null,
          provinces:null,
          locale:null,
          email:null,
          password:null,
        }
      }

      getDataProvincies = async () => {
        try {
          const response = await axios.get('https://geopagos-challenge.s3.amazonaws.com/provinces.json');
          
          const setArr=[]
          response.data.forEach(function (element) {
            let objItem={}
            objItem.label = element.name
            objItem.value = element.id
            setArr.push(objItem)
          });
          this.setState({
            provinces: setArr
          })
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

      nextComponentStep=(step)=>{
        switch (step) {
          case 1:
            return <Register user={this.state.user} nextStepClick={this.nextStepClick} setStateUser={this.setStateUser}/>;
          break;
          case 2:
            return <Location provinces={this.state.provinces} nextStepClick={this.nextStepClick} setStateUser={this.setStateUser} prevStepClick={this.prevStepClick}/>;
          break;
          case 3:
            return <Login nextStepClick={this.nextStepClick} setStateUser={this.setStateUser} showPassword={this.state.showPassword} handleShowPassword={this.handleShowPassword}
            prevStepClick={this.prevStepClick} />;
          break;
        }
      }


      setStateUser =  test => {
        var myObject = test;

        Object.keys(myObject).map(function(key, index) {
          myObject[key] = test.key;
        });

        console.log(myObject);
        
        
        /*const object2 = {...object1,test}
        console.log(object2)*/
        
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

      render() {
        const dataList=this.state.list.filter(list => list.id==this.state.step);
        const stepComponet = this.nextComponentStep(this.state.step);
        return (
          <div className="container">
              {/* {console.log(this.state)} */}
              <Header title={dataList[0].name} step={dataList[0].id} />
              {stepComponet}
          </div>
        );
      }
}

export default App;