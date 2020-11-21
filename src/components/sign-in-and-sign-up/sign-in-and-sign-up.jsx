import React from 'react';

import SingIn from '../sign-in/sign-in'
import SignUp from '../signup/signup'

import './sign-in-and-sign-up.scss';


const SignInAndSingUp = () => (
    <div className='sign-in-sign-up'>
        <SingIn/>
        <SignUp/>
    </div>
)

export default SignInAndSingUp;