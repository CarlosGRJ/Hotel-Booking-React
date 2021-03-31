import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Badge } from 'antd';
import moment from 'moment';
import { getAccountBalance } from '../actions/stripe';
import { currencyFormatter } from '../actions/stripe';

const { Meta } = Card;
const { Ribbon } = Badge;

export const ConnectNav = () => {
   const [balance, setBalance] = useState(0);
   const { auth } = useSelector((state) => ({ ...state }));
   const { user } = auth;

   useEffect(() => {
      getAccountBalance(auth.token).then((res) => {
         setBalance(res.data);
      });
   }, [auth]);

   return (
      <div className='d-flex justify-content-around'>
         <Card>
            <Meta
               avatar={<Avatar>{user.name[0]}</Avatar>}
               title={user.name}
               description={`Joined ${moment(user.createdAt).fromNow()}`} // 6 days ago
            />
         </Card>
         {auth &&
            auth.user &&
            auth.user.stripe_seller &&
            auth.user.stripe_seller.charges_enabled && (
               <>
                  <Ribbon text='Available' color='grey'>
                     <Card className='bg-light pt-1'>
                        {balance && balance.pending && balance.pending.map((bp, i) => (
                           <span key={i} className='lead'>{currencyFormatter(bp)}</span>
                        ))}
                     </Card>
                  </Ribbon>
                  <div>Payout settings</div>
               </>
            )}
      </div>
   );
};
