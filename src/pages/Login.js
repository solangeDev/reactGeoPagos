import React from 'react';
import MaskedInput from 'react-maskedinput';
import './styles.scss';

let email = React.createRef();
let password = React.createRef();

function isValidEmail(mail) {
  return;
}

const sendForm = props => event => {
  event.preventDefault();
  let validMail = true;
  let validPass = true;
  let objvalidForm = {};
  let obj = {};
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email.value)) {
    validMail = false;
    objvalidForm.email = false;
  }

  if (password.value.length < props.state.minlengthPass) {
    validPass = false;
    objvalidForm.password = false;
  } else if (
    !/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password.value)
  ) {
    validPass = false;
    objvalidForm.password = false;
  }

  if (validPass && validMail) {
    obj.email = email.value;
    obj.password = password.value;
    props.Functions.setStateUser(obj);
    props.sendState();
    //props.Functions.nextStepClick();
  } else {
    props.Functions.setStateFormValid(objvalidForm);
  }
};

const Register = props => (
  <div>
    <form onSubmit={sendForm(props)}>
      <div className="input-container margin-login">
        <label>Email </label>
        <input
          name="email"
          type="email"
          ref={input => {
            email = input;
          }}
          className={!props.state.formValid.email ? 'error' : ''}
          onChange={props.Functions.changeStateFormValid}
        />
        {!props.state.formValid.email ? (
          <span className="errorMsj">Campo requerido</span>
        ) : (
          ''
        )}
      </div>
      <div className="input-container margin-login">
        <label>Contraseña</label>
        <input
          type={props.showPassword ? 'text' : 'password'}
          name="password"
          ref={input => {
            password = input;
          }}
          className={!props.state.formValid.password ? 'error' : ''}
          onChange={props.Functions.changeStateFormValid}
        />
        {!props.state.formValid.password ? (
          <span className="errorMsj">Contraseña Invalida </span>
        ) : (
          ''
        )}
      </div>
      <div className="margin-login show-password" >
        <label>Mostrar Contraseña</label>
        <input
          type="checkbox"
          value="text"
          onChange={props.handleShowPassword}
        />
      </div>
      <div className="btns-container one-button">
        <button type="button" className="btn-prev" onClick={props.Functions.prevStepClick}>Anterior</button>
        <button className="btn-next" type="submit">Finalizar</button>
      </div>
    </form>
  </div>
);

export default Register;
