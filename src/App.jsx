import React from 'react'
import { BrowserRouter,  Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import Private from './components/Private'
import { useState , useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'
import ProtectedRoute from './components/ProtectedRoute'
import Spinner from 'react-bootstrap/Spinner';

function App() {

  const [user , setUser ]  = useState('')
  const [isfetching , setIsFetching] = useState(true)
  useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth , (user)=>{
      // console.log(user)
      setUser(user)
      setIsFetching(false)
    })
    return ()=> unsubscribe()
  },[])

  if(isfetching){
    return <Spinner animation="border" />;
  }
  return (
    <div>
      <BrowserRouter>
       <Routes>

       <Route  path='/' element={<Home />} />
       <Route  path='/private' element={<ProtectedRoute user={user}> <Private/> </ProtectedRoute>} />

       </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
