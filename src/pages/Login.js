import React from 'react';

const Login =(props)=> {
     return (
        <div className="">
            <div>
                <label>Email</label>
                <input type="email" name="email" onChange={props.setStateUser} />
            </div>
            <div>
                <label>Contraseña</label>
                <input type={(props.showPassword)?'text':'password'} name="password"  name="email" onChange={props.setStateUser} />
            </div>
            <div>
                <label>Mostrar Contraseña</label>
                <input type="checkbox" value="text" onChange={props.handleShowPassword}/>
            </div>
            <button type="button" onClick={props.prevStepClick} >Atras</button>
            <button type="button" onClick={props.nextStepClick} >Submit</button>
        </div>
     )
}

export default Login;
