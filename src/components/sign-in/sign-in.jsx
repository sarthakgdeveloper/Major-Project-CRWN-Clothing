import React, {useState} from 'react';
import {connect} from 'react-redux';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user-action'
import CustomButtom from '../custom-button/button';

import FormInput from '../formInput/formInput';

import './sign-in.scss';


const SingIn = ({emailSignInStart, googleSignInStart}) => {
   const [userCredentials, setCredentials] = useState({
       email: '',
       password: ''
   })

   const{email, password} = userCredentials
   ;
    const handleSubmit = async (event) => {
        event.preventDefault();
        await emailSignInStart({email,password})
    }

    const handleChange = (event) => {
        const {value, name } = event.target;
        setCredentials({...userCredentials, [name]: value});
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="email" id='email'name='email' value={email} handleChange={handleChange} label='email' required/>
                <FormInput type="password" id='password' name='password' value={password} handleChange={handleChange} label='password' required/>
                <div className='button'>
                <CustomButtom type='submit'>sign in</CustomButtom>
                <CustomButtom type='button' onClick = {googleSignInStart} isGoogleSignIn>sign in with google</CustomButtom>
                </div>
            </form>
        </div>
    )
    }

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword)),
})

export default connect(null,mapDispatchToProps)(SingIn);