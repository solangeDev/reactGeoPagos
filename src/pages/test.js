import React from 'react';
import { Formik, Form, Field } from 'formik';
import MaskedInput from 'react-maskedinput'

function validateRequired(value) {
  let error;
  if(!value){
    error = 'Required';
  }
  return error;
}

const Register = (props) => (
  <div>
    <Formik
        initialValues={{
          name: '',
          cuil: '',
        }}
        onSubmit={values => {
        let error;
        let value = document.getElementById("cuil").value;
        if (!value) {
            console.log("no");
        } else if (value.indexOf('_') <= 12 && value.indexOf('_') != -1) {
          console.log("no");
        } else {
          values.cuil = value
          props.setStateUser(values)
          props.nextStepClick()
        }
        }}
     >
      {({ errors, touched, isValidating}) => (
        <Form>
          <div>
            <label>Nombre Completo </label>
            <Field name="name" validate={validateRequired} type="text"  />
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>
          <div>
            <label>Nº de CUIL </label>
            <MaskedInput mask="11-11111111-1"  id="cuil" />
            {/* {<div>{errors.cuild}</div>} */}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Register;
