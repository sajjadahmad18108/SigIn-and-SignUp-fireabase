import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import './private.css';

function Private() {
  let handSignout = () => {
    signOut(auth)
      .then(() => {
        alert("User sign out successful");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div className="container">
      <header className='header-container'>
        <h1>Welcome to our page</h1>
      </header>
      <main className='main-container'>
        <h1 className='profile'>Your profile</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Fugiat at animi molestias, repellat vel, amet cumque repellendus eum tempora deleniti eos
          sequi ipsam facere perspiciatis atque voluptas error esse dolorem.
        </p>
      </main>
      <footer className='footer-container'>
        <button className='footer-button' onClick={handSignout}>Sign Out</button>
      </footer>
    </div>
  );
}

export default Private;
