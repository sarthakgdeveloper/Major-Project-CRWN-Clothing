import React from 'react';
import {connect} from 'react-redux';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user-action'
import CustomButtom from '../custom-button/button';

import FormInput from '../formInput/formInput';

import './sign-in.scss';


class SingIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const{email, password} = this.state;
        const {emailSignInStart} = this.props;
        await emailSignInStart({email,password})
    }

    handleChange = (event) => {
        const {value, name } = event.target;
        this.setState({[name]: value});
    }

    render() {
        const {googleSignInStart} = this.props;
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" id='email'name='email' value={this.state.email} handleChange={this.handleChange} label='email' required/>
                    <FormInput type="password" id='password' name='password' value={this.state.password} handleChange={this.handleChange} label='password' required/>
                    <div className='button'>
                    <CustomButtom type='submit'>sign in</CustomButtom>
                    <CustomButtom type='button' onClick = {googleSignInStart} isGoogleSignIn>sign in with google</CustomButtom>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword)),
})

export default connect(null,mapDispatchToProps)(SingIn);