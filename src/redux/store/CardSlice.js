
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex(item => item.id === id);
      if (index !== -1) {
        state[index].quantity += 1;
      } else {
        state.push({ id, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex(item => item.id === id);
      if (index !== -1) {
        state[index].quantity -= 1;
        if (state[index].quantity <= 0) {
          state.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
