import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { RegisterForm } from '../components/RegisterForm';
import { register } from '../actions/auth';

export const Register = ({ history }) => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      //   console.table({ name, email, password });
      try {
         const res = await register({
            name,
            email,
            password,
         });
         console.log('REGISTER USER ====> ', res);
         toast.success('Register success. Please login');
         history.push('/login');
      } catch (error) {
         console.log(error);
         if (error.response.status === 400) toast.error(error.response.data);
      }
   };

   console.log(process.env.REACT_APP_API);

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
