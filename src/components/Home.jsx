import React from 'react'
import { useState } from 'react'
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword } from 'firebase/auth'
import './Home.css'
import { auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUpActive, setisSignUpActive] = useState(true)
  const [error, setError] = useState("")

  let submitHandler = (e) => {
    e.preventDefault()
    console.log("the form is submiting")
  }
  let handlerMehodChange = () => {
    setisSignUpActive(!isSignUpActive)
    setError('')
  }
  let handlerSignIn = () => {
    if (!email || !password) {
      setError("Please Enter email and password")
    }
    signInWithEmailAndPassword(auth, email, password)
    .then(response=>{
        const user = response.user
        navigate('/private')
    })
    .catch(error=>{

    })
  }

  let handlerSignUp = () => {
    if (!email || !password) {
      setError("Please Enter email and password")
    }
    createUserWithEmailAndPassword(auth , email , password)
    .then(response=> {
      const user = response.user
      navigate('/private')
    })
    .catch(error=>{
          const errorMessage=  error.message
          setError(errorMessage)
    })
  }
  return (
    <div className='main-container'>
      <form onSubmit={submitHandler}>
        {/* { isSignUpActive && <legend> signUp </legend>}
     {!isSignUpActive && <legend> singIn </legend>}
  */}
        <h1> {isSignUpActive ? <span style={{color:"#4caf50"}} > Signin </span> : <span style={{color:"#2196f3"}} > Singup </span>} </h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id='email'
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id='password'
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)} />

        {error && <p className='error-message'> {error} </p>}

        {isSignUpActive ? (<button onClick={handlerSignIn} className='btn-signin' >Signin</button>) : <button onClick={handlerSignUp} className='btn-signup'> Signup</button>}

        <p>
          {isSignUpActive ? "Don't hava an account  " : "Already have an account  "}
          <span onClick={handlerMehodChange}>
            {isSignUpActive ? "Signup" : "Signin"}
          </span>
        </p>



      </form>
    </div>
  )
}

export default Home
