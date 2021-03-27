import { Link } from 'react-router-dom';

export const TopNav = () => (
   <div className='nav bg-light d-flex justify-content-between'>
      <Link className='nav-link' to='/'>
         Home
      </Link>
      <Link className='nav-link' to='/login'>
         Login
      </Link>
      <Link className='nav-link' to='/register'>
         Register
      </Link>
   </div>
);
