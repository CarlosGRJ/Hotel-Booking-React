import React from 'react';
import { useHistory } from 'react-router';
import { diffDays } from '../../actions/hotel';
import { currencyFormatter } from '../../actions/stripe';

export const BookingCard = ({ hotel, session, orderedBy }) => {
   const history = useHistory();

   return (
      <>
         <div className='card mb-3'>
            <div className='row no-gutters'>
               <div className='col-md-4'>
                  {hotel.image && hotel.image.contentType ? (
                     <img
                        className='card-image img img-fluid'
                        src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                        alt='default_hotel_image'
                     />
                  ) : (
                     <img
                        className='card-image img img-fluid'
                        src='https://via.placeholder.com/900x500.png?text=MERN+Booking'
                        alt='default_hotel_image'
                     />
                  )}
               </div>
               <div className='col-md-8'>
                  <div className='card-body'>
                     <h3 className='card-title'>
                        {hotel.title}{' '}
                        <span className='float-right text-primary'>
                           {currencyFormatter({
                              amount: hotel.price * 100,
                              currency: 'usd',
                           })}
                        </span>
                     </h3>
                     <p className='alert alert-info'>{hotel.location}</p>
                     <p className='card-text'>{`${hotel.content.substring(
                        1,
                        200,
                     )}...`}</p>
                     <p className='card-text'>
                        <span className='float-right text-primary'>
                           for {diffDays(hotel.from, hotel.to)}{' '}
                           {diffDays(hotel.from, hotel.to) <= 1 ? 'day' : 'days'}
                        </span>
                     </p>
                     <p className='card-text'>{hotel.bed} bed</p>
                     <p className='card-text'>
                        Available from {new Date(hotel.from).toLocaleDateString()}
                     </p>

                     {/* <div className='d-flex justify-content-between h4'>
                        {showViewMoreButton && (
                           <button
                              onClick={() => history.push(`/hotel/${h._id}`)}
                              className='btn btn-primary'>
                              Show more
                           </button>
                        )}
                     </div> */}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
