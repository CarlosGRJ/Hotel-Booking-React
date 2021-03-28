import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TopNav } from './components/TopNav';

// components
import { Home } from './booking/Home';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Dashboard } from './user/Dashboard';
import { PrivateRoute } from './router/PrivateRoute';
import { DashboardSeller } from './user/DashboardSeller';

function App() {
   return (
      <BrowserRouter>
         <TopNav />
         <ToastContainer position='top-center' />
         <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
               exact
               path='/dashboard/seller'
               component={DashboardSeller}
            />
         </Switch>
      </BrowserRouter>
   );
}

export default App;
