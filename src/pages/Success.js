import React from 'react';
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Success = (props) => (
    <div className="container-success">
        <FontAwesomeIcon icon='check-circle' />
        <p>¡Te Registraste Exitosamente!</p>
    </div>
);

export default Success;