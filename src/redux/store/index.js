
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CardSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
