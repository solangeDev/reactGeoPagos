// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// //import * as Yup from 'yup';


// const Register =(props)=> {
//     return (
//         <div className="">
//               <div>
//                   <label>Nombre Completo </label>
//                   <input type="text" name="name" onChange={props.setStateUser} />
//               </div>
//               <div>
//                   <label>Nº de CUIL </label>
//                   <input type="text" name="cuil" onChange={props.setStateUser} />
//               </div>
//           <button type="button" onClick={props.nextStepClick} >Submit</button>
//         </div>
//      )
// }

// export default Register;

import React from 'react';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

/*function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}*/

/*function validateUsername(value) {
  let error;
  if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}*/

function validateRequired(value) {
  let error;
  if(!value){
    error = 'Required';
  }
  return error;
}

const Register = (props) => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        name: '',
        cuil: '',
      }}
      onSubmit={values => {
        const test = values;
        props.setStateUser(test)
      }}
    >
      {({ errors, touched, isValidating }) => (
        <Form>
          <div>
            <label>Nombre Completo </label>
            <Field name="name" validate={validateRequired} type="text"  />
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>
          <div>
            <label>Nº de CUIL </label>
            <Field name="cuil" validate={validateRequired} type="text"  />
            {errors.cuil && touched.cuil && <div>{errors.cuil}</div>}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Register;
