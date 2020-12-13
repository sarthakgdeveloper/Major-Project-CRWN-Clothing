import React from 'react';
import {connect} from 'react-redux';
import {signUpStart} from '../../redux/user/user-action';
import CustomButtom from '../custom-button/button';
import FormInput from '../formInput/formInput';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './signup.scss';



class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            displayName: '',
        }
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        const {signUpStart} = this.props;
        const {email, displayName, password, confirmPassword} = this.state;
        signUpStart({email,displayName,password,confirmPassword});
    }
    
    handleChange = (event) => {
        const {value, name } = event.target;
        this.setState({[name]: value});
    }
    
    render() {
        const {email, displayName, password, confirmPassword} = this.state;
        return (
            <div className='sign-in'>
                <h2 className='title'>Don't have an Account</h2>
                <span>Sign up to create a new one</span>
                <form onSubmit={this.handleSubmit} className='sign-up-form'>
                    <FormInput type="text" id='name'name='displayName' value={displayName} handleChange={this.handleChange} label='name' required/>
                    <FormInput type="email" id='email'name='email' value={email} handleChange={this.handleChange} label='email' required/>
                    <FormInput type="password" id='password' name='password' value={password} handleChange={this.handleChange} label='password' required/>
                    <FormInput type="password" id='cpassword' name='confirmPassword' value={confirmPassword} handleChange={this.handleChange} label='confirm password' required/>
                    <CustomButtom type='submit'>sign up</CustomButtom>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (info) => dispatch(signUpStart(info)),
})

export default connect(null, mapDispatchToProps)(SignUp);