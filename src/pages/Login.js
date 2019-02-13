import React from 'react';
import MaskedInput from 'react-maskedinput'

let email = React.createRef();
let password = React.createRef();

const sendForm = (props) => (event) => {
  event.preventDefault();
  console.log(email.value);
  console.log(password.value);
}

const Register = (props) => (
  <div> 
      <form onSubmit={sendForm(props)}>
        <div>
          <label>Email </label>
          <input name="email"  type="email" ref={input => {email = input;}}  />
        </div>
        <div>
            <label>Contraseña</label>
            <input type={(props.showPassword)?'text':'password'} name="password"  name="email" ref={input => {password = input;}} />
        </div>
        <div>
            <label>Mostrar Contraseña</label>
            <input type="checkbox" value="text" onChange={props.handleShowPassword}/>
        </div>
        <button type="button" onClick={props.prevStepClick} >Atras</button>
        <button type="submit">Submit</button>
      </form>
  </div>
);

export default Register;