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
    props.Functions.nextStepClick();
  } else {
    props.Functions.setStateFormValid(objvalidForm);
  }
};

const Register = props => (
  <div>
    <form onSubmit={sendForm(props)}>
      <div>
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
      <div>
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
      <div>
        <label>Mostrar Contraseña</label>
        <input
          type="checkbox"
          value="text"
          onChange={props.handleShowPassword}
        />
      </div>
      <button type="button" onClick={props.Functions.prevStepClick}>
        Atras
      </button>
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default Register;
