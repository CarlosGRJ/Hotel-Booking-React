import React, { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountStatus } from '../actions/stripe';
import { updateUserInLocalStorage } from '../actions/auth';
import { types } from '../types/types';

export const StripeCallback = ({ history }) => {
   const { auth } = useSelector((state) => ({ ...state }));
   const dispatch = useDispatch();

   useEffect(() => {
      if (auth && auth.token) accountStatus();
   }, [auth]);

   const accountStatus = async () => {
      try {
         const res = await getAccountStatus(auth.token);
         // console.log('USER ACCOUNT STATUS ON STRIPE CALLBACK: ', res);
         updateUserInLocalStorage(res.data, () => {
            // update user in redux
            dispatch({
               type: types.authLogin,
               payload: res.data
            })
            // redirect user to dashboard
            window.location.href = '/dashboard/seller';
         })
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className='d-flex justify-content-center p-5'>
         <LoadingOutlined className='display-1 p-5 text-danger' />
      </div>
   );
};
