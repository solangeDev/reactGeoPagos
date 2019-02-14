import React from 'react';
import MaskedInput from 'react-maskedinput'
import '../App.css'

let name = React.createRef();
let cuil = React.createRef();

const sendForm = (props) => (event) => {
  event.preventDefault();
  let arrMask = cuil.mask.value;
  let objvalidForm={}
  let obj = {}
  let validMask=true
  if(!name.value){
    objvalidForm.name=false
    props.Functions.setStateFormValid(objvalidForm)
  }
  arrMask.forEach(element => {
    if (element=='_'){
      validMask=false
      objvalidForm.cuil=false
      props.Functions.setStateFormValid(objvalidForm)
    }
  });
  if (name.value && validMask) {
      arrMask = arrMask.join('')
      obj.cuilmask = arrMask
      arrMask = parseInt(arrMask.replace(new RegExp('-', 'g'), ''));
      obj.name = name.value
      obj.cuil = arrMask
      props.Functions.setStateUser(obj)
      props.Functions.nextStepClick()
  }
}

const Register = (props) => (
  <div> 
      <form onSubmit={sendForm(props)}>
        <div>
          <label>Nombre Completo</label>
          <input  type="text" name="name" value={props.state.user.name} ref={input => {name = input;}} className={(!props.state.formValid.name)?'error':''}  onChange={props.Functions.changeStateFormValid} />
          {(!props.state.formValid.name)?<span className="errorMsj">Campo requerido</span>:''}
        </div>
        <div>
          <label>Nº de CUIL </label>
          <MaskedInput name="cuil" value={props.state.user.cuilmask} ref={input => {cuil = input;}} id="cuil" mask="11-11111111-1" className={(!props.state.formValid.cuil)?'error':''}  onChange={props.Functions.changeStateFormValid}   />
          {(!props.state.formValid.cuil)?<span className="errorMsj">Campo requerido</span>:''}
        </div>
        <button type="submit">Submit</button>
      </form>
  </div>
);

export default Register;