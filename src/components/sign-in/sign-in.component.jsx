import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import FromInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth,signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
constructor(props){
    super(props);

    this.state ={
        email:'',
        password:''
    }
}

handleSubmit = async event =>{
    event.preventDefault();

    const {email,password}=this.state;
     
    try {
        
        await auth.signInWithEmailAndPassword(email,password);
        this.setState({email:'',password:''});

    } catch (error) {
        console.log(error);
    }


}
handleChange = event =>{
    const {name,value}=event.target;
        this.setState({[name]:value})
}


render(){
    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>SignIn with your enmail and password</span>

            <form onSubmit={this.handleSubmit}>
                <FromInput 
                 name='email'
                 type='email'
                 handleChange={this.handleChange}
                 value={this.state.email} 
                 label='email'
                 required />

                <FromInput 
                name='password' 
                type='password'
                handleChange={this.handleChange}
                value={this.state.password} 
                label='password'
                required />
             
              
              <CustomButton type='submit'> Sign In</CustomButton>
              <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google Account</CustomButton>

            </form>
        </div>
    )
}

}
export default SignIn;