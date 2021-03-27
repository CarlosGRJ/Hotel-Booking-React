// ( type: 'LOGGED_IN_USER', payload: {name: 'Carlos', role: 'Seller'})
export const authReducer = (
   state = { name: 'Carlos', role: 'Seller' },
   action,
) => {
   switch (action.type) {
      case 'LOGGED_IN_USER':
         return {
            ...state,
            ...action.payload,
         };

      case 'LOGOUT':
         return action.payload;

      default:
         return state;
   }
};
