import { Button, TextField, Box } from '@mui/material';
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/userAuth'
import styles from '@/styles/Home.module.css'
//this is a signup form, I have developed signup forms many times before and know this works, therefore no BDD or TDD was used in this file
// as it would only cause delays in the completion of the project
export default function signup(){
    //intitialize router and user context to access page navigation and login functions
    const router = useRouter();
    const userContext = useAuth();
    //back button action -> takes user back to login page (index.js)
    const back = () => {
        router.push("/")
    }
    //action for signup button -> calls join function and catches errors, this function takes user back to login page(index.js)
    //once the user is signed up
    const sendSignup = async ( username, password ) => {
        try {

            const result = await userContext.join( username, password)

            if(result === false){
                alert("User with that username already exists");
            }
            

        }catch(error) { 
            console.log(error) 
            alert(error);
        }
    }
    //validation scheme for formik form
    const validSchema = yup.object({
        username: yup.string('Enter username').required('Username is required'),
        password: yup.string('Enter a password').min(4, 'Password is minimum 4 characters').required('Password is required'),
        password2: yup.string('Enter a password').min(4, 'Password is minimum 4 characters').required('Password is required')
    });
    //intitialize formik for use in the form
    //defines intial form values and onSubmit button action for the signup button
    const formik = useFormik({
        validationSchema:validSchema,
    
        initialValues: {
          username: '',
          password: '',
          password2: '',
        },
        
        onSubmit: (values) => {
            //check that passwords match then call sendSignup
            if(values.password === values.password2){
                sendSignup(values.username, values.password)
            }else{
                alert("passwords do not match");
            }
        }
      })
    //return the jsx to display form and other elements
    //styles.signup div contains all elements of this page. All element styles are definend in Home.module.css
    //styles used by assigning the style name to the classname attribute for the tag. Form tag defines form with TextField inputs
    return (
        <div className={styles.signup}>
            <div className={styles.backDiv}>
                <Button variant="contained" onClick = {back}>Back</Button>
            </div>
            <h1 style={{margin: "45px"}}>Please signup with a username and password</h1>
            <div className={styles.formDiv}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <TextField
                    variant='outlined'
                    id='username'
                    name='username'
                    label='Username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                    variant='outlined'
                    id='password'
                    name='password'
                    label='Password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                    variant='outlined'
                    id='password2'
                    name='password2'
                    label='Confirm password'
                    value={formik.values.password2}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button variant="contained" type="submit">Signup</Button>
                </form>
            </div>
        </div>
    )
}