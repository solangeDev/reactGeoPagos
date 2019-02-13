import React from 'react';

const Header = (props) => ( 
    <div>
        <header>
            {props.title}
            <p>{props.step}</p>
        </header>
    </div>
)

export default Header;