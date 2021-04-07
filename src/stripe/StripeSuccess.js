import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { stripeSuccessRequest } from '../actions/stripe';

export const StripeSuccess = ({ match, history }) => {
   const {
      auth: { token },
   } = useSelector((state) => ({ ...state }));
   // const { token } = auth;

   useEffect(() => {
      // console.log(
      //    'send this hotelId to backend to create order',
      //    match.params.hotelId,
      // );
      stripeSuccessRequest(token, match.params.hotelId).then((res) => {
         if (res.data.success) {
            // console.log('stripe success response', res.data);
            history.push('/dashboard');
         } else {
            history.push('/stripe/cancel');
         }
      });
   }, [match.params.hotelId, history, token]);

   return (
      <div className='container'>
         <div className='col text-center p-5'>
            <LoadingOutlined className='display-1 text-danger p-5' />
         </div>
      </div>
   );
};
