import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { diffDays, read } from '../actions/hotel';
import { useSelector } from 'react-redux';

export const ViewHotel = ({ match, history }) => {
   const [hotel, setHotel] = useState({});
   const [image, setImage] = useState('');

   const { auth } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadSellerHotel();
   }, []);

   const loadSellerHotel = async () => {
      const res = await read(match.params.hotelId);
      setHotel(res.data);
      setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
   };

   const handleClick = (e) => {
      e.preventDefault();

      if (!auth) history.push('/login');

      console.log(
         'get session id from stripe to show a button > checkout with stripe',
      );
   };

   return (
      <>
         <div className='container-fluid bg-secondary p-5 text-center'>
            <h2>{hotel.title}</h2>
         </div>
         <div className='container-fluid'>
            <div className='row'>
               <div className='col-md-6'>
                  <br />
                  <img
                     src={image}
                     alt={hotel.title}
                     className='img img-fluid m-2'
                  />
               </div>

               <div className='col-md-6'>
                  <br />
                  <b>{hotel.content}</b>
                  <p className='alert alert-info mt-3'>${hotel.price}</p>
                  <p className='card-text'>
                     <span className='float-right text-primary'>
                        for {diffDays(hotel.from, hotel.to)}{' '}
                        {diffDays(hotel.from, hotel.to) <= 1 ? 'day' : 'days'}
                     </span>
                  </p>
                  <p>
                     From <br />{' '}
                     {moment(new Date(hotel.from)).format(
                        'MMMM Do YYYY, h:mm:ss a',
                     )}
                  </p>
                  <p>
                     To <br />{' '}
                     {moment(new Date(hotel.to)).format(
                        'MMMM Do YYYY, h:mm:ss a',
                     )}
                  </p>
                  <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
                  <br />
                  <button
                     onClick={handleClick}
                     className='btn btn-block btn-lg btn-primary mt-3'>
                     {auth && auth.token ? 'Book Now' : 'Loogin to Book'}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};
