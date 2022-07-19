import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';
// import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
  const isCartVisible = useSelector(state => state.ui.cartIsVisible);
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));

    }
  }, [cart, dispatch])

  // useEffect(() => {
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }
  //   dispatch(uiActions.showNotification({
  //     status: 'pending',
  //     title: 'Sending...',
  //     message: 'Sending cart data.',
  //   }));
  //   fetch('https://cart-async-redux-default-rtdb.firebaseio.com/cart.json', {
  //     method: 'PUT',
  //     body: JSON.stringify(cart),
  //   }).then((res) => {
  //     if (!res.ok) {
  //       throw new Error('cart data error');
  //     }

  //     dispatch(uiActions.showNotification({
  //       status: 'success',
  //       title: 'Success!',
  //       message: 'Successfuly sent cart data.',
  //     }));
  //   }).catch((err) => {
  //     dispatch(uiActions.showNotification({
  //       status: 'error',
  //       title: 'Error!',
  //       message: 'Error sending cart data.',
  //     }));
  //     console.log(err);
  //   })
  // }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
