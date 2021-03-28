import { types } from "../types/types";

let userState;

if(window.localStorage.getItem('auth')) {
   userState = JSON.parse(window.localStorage.getItem('auth'));
} else {
   userState = null; // {}
}

// ( type: 'LOGGED_IN_USER', payload: {name: 'Carlos', role: 'Seller'})
export const authReducer = (state = userState, action) => {
   switch (action.type) {
      case types.authLogin:
         return {
            ...state,
            ...action.payload,
         };

      case types.authLogout:
         return action.payload;

      default:
         return state;
   }
};
