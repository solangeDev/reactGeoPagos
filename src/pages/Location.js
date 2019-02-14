import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './styles.scss';

let street = React.createRef();
let provinces = React.createRef();
let num_street = React.createRef();
let locale = React.createRef();

const sendForm = props => event => {
  let objvalidForm = {};
  event.preventDefault();
  if (
    street.value &&
    provinces.state.selected.value &&
    num_street.value &&
    locale.state.selected.value
  ) {
    let obj = {};
    obj.street = street.value;
    obj.provinces = provinces.state.selected.value;
    obj.num_street = num_street.value;
    obj.locale = locale.state.selected.value;
    objvalidForm.street = true;
    objvalidForm.num_street = true;
    objvalidForm.provinces = true;
    props.Functions.setStateFormValid(objvalidForm);
    props.Functions.setStateUser(obj);
    props.Functions.nextStepClick();
  } else {
    if (!street.value) {
      objvalidForm.street = false;
    }
    if (!num_street.value) {
      objvalidForm.num_street = false;
    }
    if (!provinces.state.selected.value) {
      objvalidForm.provinces = false;
    }
    if (!locale.state.selected.value) {
      objvalidForm.locale = false;
    }
    props.Functions.setStateFormValid(objvalidForm);
  }
};

const Register = props => (
  <div className="">
    <form onSubmit={sendForm(props)}>
      <div>
        <label>Calle</label>
        <input
          type="text"
          value={props.state.user.street}
          name="street"
          id="street"
          ref={input => {
            street = input;
          }}
          className={!props.state.formValid.street ? 'error' : ''}
          onChange={props.changeStateFormValid}
        />
        {!props.state.formValid.street ? (
          <span className="errorMsj">Campo requerido</span>
        ) : (
          ''
        )}
      </div>
      <div>
        <label>Número</label>
        <input
          type="text"
          value={props.state.user.num_street}
          name="num_street"
          id="num_street"
          ref={input => {
            num_street = input;
          }}
          className={!props.state.formValid.num_street ? 'error' : ''}
          onChange={props.changeStateFormValid}
        />
        {!props.state.formValid.num_street ? (
          <span className="errorMsj">Campo requerido</span>
        ) : (
          ''
        )}
      </div>
      <div>
        <label>Provincia</label>
        <Dropdown
          name="provinces"
          options={props.state.provinces}
          id="provinces"
          value={props.state.user.provinces}
          placeholder="Select an option"
          ref={input => {
            provinces = input;
          }}
          className={!props.state.formValid.provinces ? 'error' : ''}
          onChange={props.changeProvinces}
        />
        {!props.state.formValid.provinces ? (
          <span className="errorMsj">Campo requerido</span>
        ) : (
          ''
        )}
      </div>
      <div>
        <label>Localidades</label>
        <Dropdown
          name="locale"
          options={props.state.localities}
          value={props.state.user.locale}
          onChange={props.changeLocale}
          id="locale"
          placeholder="Select an option"
          ref={input => {
            locale = input;
          }}
          className={!props.state.formValid.locale ? 'error' : ''}
        />
        {!props.state.formValid.locale ? (
          <span className="errorMsj">Campo requerido</span>
        ) : (
          ''
        )}
      </div>
      <button type="button" onClick={props.Functions.prevStepClick}>
        Atras
      </button>
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default Register;
