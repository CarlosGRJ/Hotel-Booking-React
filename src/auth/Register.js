import React, { useState } from 'react';
import axios from 'axios';

import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      //   console.table({ name, email, password });
      try {
         const res = await axios.post('http://localhost:8000/api/register', {
            name,
            email,
            password,
         });
         console.log('REGISTER USER ====> ', res);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className='container-fluid bg-secondary p-5 text-center'>
            <h1>Register</h1>
         </div>

         <div className='container'>
            <div className='row'>
               <div className='col-md-6 offset-md-3'>
                  <RegisterForm
                     handleSubmit={handleSubmit}
                     name={name}
                     setName={setName}
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
