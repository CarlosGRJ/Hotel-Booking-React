import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AlgoliaPlaces from 'algolia-places-react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { createHotel } from '../actions/hotel';

const { Option } = Select;

// const config = {
//    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
//    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
//    language: 'en',
//    countries: ['mx'],
// };

export const NewHotel = () => {
   // redux
   const { auth } = useSelector((state) => ({ ...state }));
   const { token } = auth;
   // state FORM
   const [values, setValues] = useState({
      title: '',
      content: '',
      location: '',
      image: '',
      price: '',
      from: '',
      to: '',
      bed: '',
   });

   const [preview, setPreview] = useState(
      'http://via.placeholder.com/100x100.png?text=PREVIEW',
   );

   const { title, content, location, image, price, from, to, bed } = values;

   const handleSubmit = async (e) => {
      e.preventDefault(e);
      // console.log('values', values);

      const hotelData = new FormData();

      hotelData.append('title', title);
      hotelData.append('content', content);
      hotelData.append('location', location);
      hotelData.append('price', price);
      image && hotelData.append('image', image);
      hotelData.append('from', from);
      hotelData.append('to', to);
      hotelData.append('bed', bed);

      console.log([...hotelData]);

      const res = await createHotel(token, hotelData);
      console.log('HOTEL CREATE RES ', res);
      toast('New hotel is posted');
      setTimeout(() => {
         window.location.reload();
      }, 1000);
   };

   const handleImageChange = (e) => {
      // console.log(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
      setValues({ ...values, image: e.target.files[0] });
   };

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   const hotelForm = () => (
      <form onSubmit={handleSubmit}>
         <div className='form-group'>
            <label className='btn btn-outline-secondary btn-block m-2 text-left'>
               Image
               <input
                  type='file'
                  name='image'
                  onChange={handleImageChange}
                  accept='image/*'
                  hidden
               />
            </label>

            <input
               type='text'
               name='title'
               onChange={handleChange}
               placeholder='Title'
               className='form-control m-2'
               value={title}
            />

            <textarea
               name='content'
               onChange={handleChange}
               placeholder='Content'
               className='form-control m-2'
               value={content}
            />
            {/* <AlgoliaPlaces
               className='form-control ml-2 mr-2'
               placeholder='Location'
               defaultValue={location}
               options={config}
               onChange={({ suggestion }) =>
                  setValues({ ...values, location: suggestion.value })
               }
               style={{ height: '50px' }}
            /> */}
            <input
               type='text'
               name='location'
               className='form-control ml-2 mr-2'
               placeholder='Location'
               value={location}
               onChange={handleChange}
               style={{ height: '50px' }}
            />

            <input
               type='number'
               name='price'
               onChange={handleChange}
               placeholder='Price'
               className='form-control m-2'
               value={price}
            />

            {/* <input
               type='number'
               name='bed'
               onChange={handleChange}
               placeholder='Number of Beds'
               className='form-control m-2'
               value={bed}
            /> */}

            <Select
               onChange={(value) => setValues({ ...values, bed: value })}
               className='w-100 m-2'
               size='large'
               placeholder='Number of beds'>
               <Option key={1}>{1}</Option>
               <Option key={2}>{2}</Option>
               <Option key={3}>{3}</Option>
               <Option key={4}>{4}</Option>
            </Select>
         </div>

         <DatePicker
            placeholder='From date'
            className='form-control m-2'
            onChange={(date, dateString) =>
               setValues({ ...values, from: dateString })
            }
            // disabledDate para deshabilitar las fechas antes de hoy
            disabledDate={(current) =>
               current && current.valueOf() < moment().subtract(1, 'days')
            }
         />

         <DatePicker
            placeholder='To date'
            className='form-control m-2'
            onChange={(date, dateString) =>
               setValues({ ...values, to: dateString })
            }
            // disabledDate para deshabilitar las fechas antes de hoy
            disabledDate={(current) =>
               current && current.valueOf() < moment().subtract(1, 'days')
            }
         />

         <button className='btn btn-outline-primary m-2'>Save</button>
      </form>
   );

   return (
      <>
         <div className='container-fluid bg-secondary p-5 text-center'>
            <h2>Add Hotel</h2>
         </div>
         <div className='container-fluid'>
            <div className='row'>
               <div className='col-md-10'>
                  <br />
                  {hotelForm()}
               </div>
               <div className='col-md-2'>
                  <img
                     src={preview}
                     alt='preview_image'
                     className='img img-fluid m-2'
                  />
                  <pre>{JSON.stringify(values, null, 4)}</pre>
               </div>
            </div>
         </div>
      </>
   );
};
