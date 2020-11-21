import React from 'react';

import './button.scss';

const CustomButton = ({children, isGoogleSignIn,inverted, ...otherprops}) => (
    <button className= {`${isGoogleSignIn? "google-sign-in":''}  custom-button ${inverted? "inverted": ''}`} {...otherprops}>
        {children}
    </button>
)

export default CustomButton;