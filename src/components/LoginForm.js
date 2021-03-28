import React from 'react';

export const LoginForm = ({
   handleSubmit,
   email,
   setEmail,
   password,
   setPassword,
}) => {
   return (
      <form onSubmit={handleSubmit} className='mt-3'>
         <div className='form-group mb-3'>
            <label className='form-label'>Email address</label>
            <input
               type='email'
               className='form-control'
               placeholder='Enter email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
         </div>

         <div className='form-group mb-3'>
            <label className='form-label'>Password</label>
            <input
               type='password'
               className='form-control'
               placeholder='Enter password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
         </div>

         <button disabled={!email || !password} className='btn btn-primary'>Submit</button>
      </form>
   );
};
