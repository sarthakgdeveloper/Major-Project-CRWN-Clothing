import React from 'react';

import {CustomButtonContainer} from './button.style'

const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer className='custom-button' {...props}>
        {children}
    </CustomButtonContainer>
)

export default CustomButton;