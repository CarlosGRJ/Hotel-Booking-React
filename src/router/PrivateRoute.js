import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ ...rest }) => {
   const { auth } = useSelector((state) => ({ ...state }));

   return auth && auth.token ? <Route {...rest} /> : <Redirect to='/login' />;
};
