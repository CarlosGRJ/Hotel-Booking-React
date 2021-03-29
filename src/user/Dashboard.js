import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectNav } from '../components/ConnectNav';
import { DashboardNav } from '../components/DashboardNav';

export const Dashboard = () => {
   return (
      <>
         <div className='container-fluid bg-secondary p-5'>
            <ConnectNav />
         </div>

         <div className='container-fluid p-4'>
            <DashboardNav />
         </div>

         <div className='container'>
            <div className='row'>
               <div className='col-md-10'>
                  <h2>Your Bookings</h2>
               </div>
               <div className='col-md-2'>
                  <Link to='/' className='btn btn-primary'>Browse Hotels</Link>
               </div>
            </div>
         </div>
      </>
   );
};
