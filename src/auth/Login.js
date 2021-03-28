import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import { LoginForm } from '../components/LoginForm';

export const Login = ({ history }) => {
   const [email, setEmail] = useState('carlos@test.com');
   const [password, setPassword] = useState('123456');

   const dispatch = useDispatch();

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('SEND LOGIN DATA', { email, password });
      try {
         const res = await login({ email, password });
         if (res.data) {
            console.log(
               'SAVE USER RES IN REDUX AND LOCALSTORAGE THEN REDIRECT ====>',
            );
            console.log('resp', res);
            // save user and token to local storage
            window.localStorage.setItem('auth', JSON.stringify(res.data));
            // save user and token to redux
            dispatch({
               type: 'LOGGED_IN_USER',
               payload: res.data,
            });
            // history.push('/');
         }
      } catch (error) {
         console.log(error);
         if (error.response.status === 400) toast.error(error.response.data);
      }
   };

   return (
      <>
         <div className='container-fluid bg-secondary p-5 text-center'>
            <h1>Login</h1>
         </div>

         <div className='container'>
            <div className='row'>
               <div className='col-md-6-offset-md-3'>
                  <LoginForm
                     handleSubmit={handleSubmit}
                     email={email}
                     setEmail={setEmail}
                     password={password}
                     setPassword={setPassword}
                  />
               </div>
            </div>
         </div>
      </>
   );
};
