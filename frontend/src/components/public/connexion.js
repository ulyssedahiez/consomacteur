import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { accountService } from '../../services/account.service';
import { useRecoilState } from 'recoil';
import { loginState } from '../atoms/login';

export default function Connexion() {
  const navigate = useNavigate();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [inputError, setInputError] = useState(false);
  const [b, setN] = useRecoilState(loginState);

 
  
  function handleSubmit(event) {
    event.preventDefault();
    const body = {
        password: passwordInput.current.value,
        email: emailInput.current.value
      }

    accountService.login(body)
      .then(res => {
        accountService.saveToken(res.data.token)
        setN(true);
        navigate('/conn/profile')
      })
      .catch((error) => {
        console.log(error)
        
        setInputError(true);
        console.log('inputError', inputError)
      });
  }

  return (
    <div className='layoutForm'>
      <div className='container'>
        <div className='titleForm'>
          <a>Connexion</a>
        </div>
        { inputError &&<>
        <div className='inputError'>
        <p>Email ou Mot de passe Incorect.</p>
        </div>
        </>
        }
        
        <form className='inscriptionForm' onSubmit={event => handleSubmit(event)}>
          <div className='row'>
            <div className='col-25'>
              <label htmlFor='email'>Email </label>
            </div>
            <div className='col-75'>
              <input required type='email' id='email' ref={emailInput} />
            </div>
          </div>
          <div className='row'>
            <div className='col-25'>
              <label htmlFor='passWord'>Mot de passe </label>
            </div>
            <div className='col-75'>
              <input required type='password' id='passWord' ref={passwordInput} />
            </div>
          </div>
          <div className='row'>
            <button type='submit'>connexion</button>
          </div>
        </form>
        <div className='row'>
          <div className='connexion'>
            <NavLink to='/inscription'>M'inscrire</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
