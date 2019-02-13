import React from 'react';
import MaskedInput from 'react-maskedinput'

let name = React.createRef();
let cuil = React.createRef();

const sendForm = (props) => (event) => {
  event.preventDefault();
  let validMask=true
  let arrMask = cuil.mask.value;
  arrMask.forEach(element => {
    if (element=='_'){
      console.log('error mask')
      validMask = false
    }
  });
  if (validMask && name.value) {
      arrMask = arrMask.join('')
      arrMask = parseInt(arrMask.replace(new RegExp('-', 'g'), ''));
      let obj = {}
      obj.name = name.value
      obj.cuil = arrMask
      props.setStateUser(obj)
      props.nextStepClick()
  }
}

const Register = (props) => (
  <div> 
      <form onSubmit={sendForm(props)}>
        <div>
          <label>Nombre Completo </label>
          <input name="name"  type="text" ref={input => {name = input;}}  />
        </div>
        <div>
          <label>Nº de CUIL </label>
          <MaskedInput mask="11-11111111-1" name="cuil"  id="cuil" ref={input => {cuil = input;}}   />
        </div>
        <button type="submit">Submit</button>
      </form>
  </div>
);

export default Register;