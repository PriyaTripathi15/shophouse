
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  export const updateCart=(state)=>{
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate shipping price if order over $100, shipping is free otherwise $10
      state.shippingPrice =
        Number(state.itemsPrice) > 100 ? addDecimals(0) : addDecimals(10);

      // Calculate tax price (15% tax)
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));

      // Calculate total price
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      );
      return state;

  }