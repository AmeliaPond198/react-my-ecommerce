import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import './sign-in-form.styles.scss';
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log(formFields);


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };


  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                  console.log('Incorrect password');
                  break;
                case 'auth/user-not-found':
                  console.log('No user associated with this email');
                  break;
                default:
                  console.log('There has been an error', error);
              }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

            <FormInput 
                label="Email" 
                type="email" 
                onChange={handleChange} 
                name="email" 
                value={email} 
                required 
            />

            <FormInput 
                label="Password" 
                type="password" 
                onChange={handleChange} 
                name="password" 
                value={password} 
                required 
            />

          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Signin</Button>
          </div>

            </form>
        </div>
    );
};

export default SignInForm;