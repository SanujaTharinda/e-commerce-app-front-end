import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import Cart from './screens/Cart';
import LoginForm from './screens/LoginForm';
import UserLoginForm from './screens/UserLoginForm';
import RegisterForm from './screens/RegisterForm';
import UserProfile from './screens/UserProfile';
//import ResetPassword from './screens/FogotPassword';
import SearchResult from './screens/SearchResult';
import ShippingScreen from './screens/ShippingScreen';
import Footer from './components/Footer';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductScreen from './screens/ProductScreen';
import ViewCustomers from './screens/ViewCustomers';
import ViewUsers from './screens/ViewUsers';
import BuyMethodScreen from './screens/BuyMethodScreen';
import ProductsScreen from './screens/ProductsScreen';
import Logout from './components/logout';
import UserRegisterForm from './screens/userRegisterForm';
import OrdersScreen from './screens/OrdersScreen';
import EditProfile from './screens/EditProfile';
import ResetUsername from './screens/ResetUsername';
import ResetPassword from './screens/ResetPassword';
import CategoriesScreen from './screens/CategoriesScreen';
import AddMainCategoryForm from './screens/AddMainCategoryForm';
import AddSubCategoryForm from './screens/AddSubCategoryForm';
import DeletedProductsScreen from './screens/DeletedProductsScreen';
import AddCustomAttributeForm from './screens/AddCustomAttributeForm';
import ManageStock from './screens/ManageStock';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import ProductRegisterForm from './screens/ProductRegisterForm';



const App = () => {

  return ( 
      <div class="home">

        <Header/>
        <Container >
          <main>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover            
            ></ToastContainer>
            <Switch>
            <Route path='/order-details/:orderId' component={OrderDetailsScreen} />
              <Route path='/user-register' component={UserRegisterForm} />
              <Route path='/buyMethod' component={BuyMethodScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/placeOrder' component={PlaceOrderScreen} /> 
              <Route path='/payment' component={PaymentScreen} /> 
              <Route path='/login' component={LoginForm} />
              <Route path='/user-login' component={UserLoginForm} />
              <Route path='/logout' component={Logout} />
              <Route path='/cart' component={Cart} />
              <Route path='/register' component={RegisterForm} />
              <Route path='/profile' component={UserProfile} />
              <Route path='/reset' component={ResetPassword} />
              <Route path='/search' component={SearchResult} />
              <Route path='/products/:productId' component = {ProductScreen} />
              <Route path='/customers' component = {ViewCustomers} />
              <Route path='/users' component = {ViewUsers} />
              <Route path='/product-register' component={ProductRegisterForm} />
              <Route path='/products' component={ProductsScreen} />
              <Route path='/manage-stock' component={ManageStock} />
              <Route path='/deleted-products' component={DeletedProductsScreen} />
              <Route path='/categories' component={CategoriesScreen} />
              <Route path='/add-main-category' component={AddMainCategoryForm} />
              <Route path='/add-sub-category' component={AddSubCategoryForm} />
              <Route path='/add-custom-attribute' component={AddCustomAttributeForm} />
              <Route path='/products' component={ProductsScreen} />
              <Route path='/orders' component={OrdersScreen} />
              <Route path='/Edit profile' component={EditProfile} />
              <Route path='/reset username' component={ResetUsername} />
              <Route path='/reset password' component={ResetPassword} />
              <Route path='/' component={HomeScreen} />
              <Route path='/' exact component={HomeScreen} />
            </Switch>
          </main>
        </Container>
        <Footer/>
      </div>
   );
}
 
export default App;

