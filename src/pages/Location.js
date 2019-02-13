import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Location =(props)=> {
     return (
        <div className="">
            <div>
                <label>Calle</label>
                <input type="text" name="street" onChange={props.setStateUser} />
            </div>
            <div>
                <label>Número</label>
                <input type="text" name="num_street" onChange={props.setStateUser} />
            </div>
            <div>
                <label>Provincias</label>
                <Dropdown onChange="" name="provinces" options={props.provinces} placeholder="Select an option" />
            </div>
             <div>
                <label>Localidad</label>
                <Dropdown onChange="" name="locale" options={props.provinces} placeholder="Select an option" />
            </div>
            <button type="button" onClick={props.prevStepClick} >Atras</button>
            <button type="button" onClick={props.nextStepClick} >Submit</button>
        </div>
     )
}

export default Location;
