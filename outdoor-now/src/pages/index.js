import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Button, TextField, Box } from '@mui/material';
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/userAuth'
//this is a login form, I have developed login forms many times before and know this works, therefore no BDD or TDD was used in this file
// as it would only cause delays in the completion of the project
export default function Home() {
  //intitialize router and user context to access page navigation and login functions
  const router = useRouter();
  const userContext = useAuth();
  //action to signup button -> takes user to signup.js
  const sendToSignup = () => {router.push("/signup")}
  //define the validation scheme for the login form
  const validSchema = yup.object({
    username: yup.string('Enter username').required('Username is required'),
    password: yup.string('Enter a password').min(4, 'Password is minimum 4 characters').required('Password is required')
  });
  //action for the login button on form -> calls login and takes the user to the home page if authenticated
  //catches any errors with the login function
  const sendLogin = async (values) => {
    try{

      const user = await userContext.login(values.username, values.password)
      if(user){
        router.push("/home")
      }

    }catch(error){
      console.log(error)
    }
  }
  //intitialize formik for use in the form
  //defines intial form values and onSubmit button action for the login button
  const formik = useFormik({
    validationSchema:validSchema,

    initialValues: {
      username: '',
      password: '',
    },
    //call send login
    onSubmit: (values) => {
      sendLogin(values);
    }
  })
  //return the jsx to display form and other elements
  //head tag defines basic page info, main contains the elements of the page. All element styles are definend in Home.module.css
  //styles used by assigning the style name to the classname attribute for the tag. Form tag defines form with TextField inputs
  return (
    <>
      <Head>
        <title>OutdoorNow</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Welcome to OutdoorNow, please login or signup</h1>

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
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button variant="contained" type="submit" id ="submitButton">Login</Button>
          </form>
        </div>
        <h3>Don't have an account?</h3>
        <Button onClick={sendToSignup} variant='contained' sx={{margin: 2.5}}>Signup</Button>
      </main>
    </>
  )
}