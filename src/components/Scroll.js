import React from 'react';

const Scroll = (props) => {
    return (
        //using CSS propertiy for JSX so you must camel case instead of overflow-Y
        //first {} are for JSX format the other {} defines a CSS object.
        <div style={{overflowY: 'scroll', border: '5px solid black', height: '600px'}}>
            {props.children}
        </div>
    );
};

export default Scroll;