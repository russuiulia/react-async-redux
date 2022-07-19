import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';
export const fetchCartData = () => {
  return (dispatch) => {
    fetch('https://cart-async-redux-default-rtdb.firebaseio.com/cart.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Fetching data failed');
        }
        res.json().then((data) => {
          dispatch(cartActions.replaceCart({
            items: data.items || [],
            totalQuantity: data.totalQuantity
          }));
        });
      }).catch((err) => {
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: err.message,
        });
      })
  }
}

export const sendCartData = (cart) => {

  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data.',
      }));

    fetch('https://cart-async-redux-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Error sending cart data.');
      }
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Successfuly sent cart data.',
      }));
    }).catch((err) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: err.message,
      }));
      console.log(err);
    })


  };

};
