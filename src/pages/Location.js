
import React from 'react';
import { Formik, Form, Field } from 'formik';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../App.css';
/*import * as Yup from 'yup';*/


let street = React.createRef();
let provinces = React.createRef();
let num_street = React.createRef();


const sendForm=(props)=>(event)=>{
    event.preventDefault();
    if (street.value && provinces.state.selected.value && num_street.value){
        let obj={}
        obj.street=street.value
        obj.provinces = provinces.state.selected.value
        obj.num_street = num_street.value
        props.setStateUser(obj)
        props.nextStepClick()
    }
}



const Register = (props) => (   
  <div className="">
        <Form onSubmit={sendForm(props)}>
         <div>
             <label>Calle</label>
             <input type="text" name="street" id="street" ref={input => {street = input;}}/> 
         </div>
         <div>
             <label>Número</label>
             <input type="number" name="num_street" id="num_street" ref={input => {num_street = input;}}/> 
         </div>
         <div>      
             <label>Provincia</label>
             <Dropdown name="provinces" options={props.provinces} 
                id="provinces"
                placeholder="Select an option"
                ref={input => {provinces = input;}} />
         </div>
         <button type="submit">Submit</button>
        </Form>
</div>
);

export default Register;
