import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Badge } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getAccountBalance, payoutSetting } from '../actions/stripe';
import { currencyFormatter } from '../actions/stripe';

const { Meta } = Card;
const { Ribbon } = Badge;

export const ConnectNav = () => {
   const [loading, setLoading] = useState(false);
   const [balance, setBalance] = useState(0);
   const { auth } = useSelector((state) => ({ ...state }));
   const { user, token } = auth;

   useEffect(() => {
      getAccountBalance(token).then((res) => {
         setBalance(res.data);
      });
   }, [token]);

   const handlePayoutSettings = async () => {
      setLoading(true);
      try {
         const res = await payoutSetting(token);
         // console.log('RES FOR PAYOUT SETTING LINK ', res);
         window.location.href = res.data.url;
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
         toast('Unable to access settings. Try again');
      }
   };

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
                        {balance &&
                           balance.pending &&
                           balance.pending.map((bp, i) => (
                              <span key={i} className='lead'>
                                 {currencyFormatter(bp)}
                              </span>
                           ))}
                     </Card>
                  </Ribbon>
                  <Ribbon text='Payouts' color='silver'>
                     <Card
                        onClick={handlePayoutSettings}
                        className='bg-light pointer'>
                        <SettingOutlined className='h5 pt-2' />
                     </Card>
                  </Ribbon>
               </>
            )}
      </div>
   );
};
