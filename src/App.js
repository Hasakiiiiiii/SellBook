import logo from './logo.svg';
import './App.css';
import './fonts.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Home from './pages/Home/Home';
import InformationOfStore from './pages/InformationOfStore/InformationOfStore';
import ManageProduct from './pages/ManageProduct/ManageProduct';
import ManagerOrderNew from './pages/ManagerOrder/ManagerOrderNew';
import ManagerOrderCancel from './pages/ManagerOrder/ManagerOrderCancel';
import ManagerOrderOnDelivery from './pages/ManagerOrder/ManagerOrderOnDelivery';
import ManagerOrderDelivered from './pages/ManagerOrder/ManagerOrderDelivered';
import ManagerVoucher from './pages/ManagerVoucher/ManagerVoucher';
import BestSellingProducts from './pages/Statistical/BestSellingProducts';
import OrderStatistics from './pages/Statistical/OrderStatistics';
import RevenueStatistics from './pages/Statistical/RevenueStatistics';
import TransactionHistory from './pages/TransactionHistory/TransactionHistory';
import HomeUser from './pages/Home/HomeUser';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Register from './pages/Login/Register';
import Login from './pages/Login/SignIn';
import ShoppingCart from './pages/Cart/HomeCart';
import CheckOut from './pages/Cart/CheckOut';
import ResetPassword from './pages/Login/ForgotPass';
import ProfileUser from './pages/ProfileUser/ProfileUser';
import AddressUser from './pages/ProfileUser/AddressUser';
import ChangePassword from './pages/ProfileUser/ChangePass';
import DonHang from './pages/Cart/Donhang';
import RegisterSeller from './pages/Seller/ResgisterSeller';
import RechargeForm from './pages/Wallet/wallet';
import { CartProvider } from './context/cartContext';


function App() {
  return (
    <CartProvider>
      <Router>
      <div>
        {/* <Header /> */}
        <div style={{ display: 'flex' }}>
          {/* <Sidebar /> */}
          <div style={contentStyle}>
            <Routes>  
              <Route path="/" element={<Home />} />
              <Route path="/HomeUser" element={<HomeUser />} />
              <Route path='/shopping' element={<ShoppingCart />} />
              <Route path='/checkout' element={<CheckOut />} />
              <Route path="/ProductDetail/:id" element={<ProductDetail />} />
              <Route path='/Register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile-user' element={<ProfileUser />} />
              <Route path='/address' element={<AddressUser />} />
              <Route path='/change-pass' element={<ChangePassword />} />
              <Route path='/donhang' element={<DonHang />} />
              <Route path='/seller' element={<RegisterSeller />} />
              <Route path='/wallet' element={<RechargeForm />} />



              <Route path='/forgot-password' element={<ResetPassword />} />
              {/* <Route path="/information-store" element={<InformationOfStore />}/> */}
              <Route path="/manage-product-store" element={<ManageProduct />} />
              <Route path="orders-new" element={<ManagerOrderNew />} />
              <Route path="/orders-cancel" element={<ManagerOrderCancel />} />
              <Route path="/orders-is-being-delivered" element={<ManagerOrderOnDelivery />} />
              <Route path="/orders-delivered" element={<ManagerOrderDelivered />} />
              <Route path="/manage-voucher-store" element={<ManagerVoucher />} />
              <Route path="/best-selling-products" element={<BestSellingProducts />} />
              <Route path="/order-statistics" element={<OrderStatistics />} />
              <Route path="/revenue-statistics" element={<RevenueStatistics />} />
              <Route path="/transaction-history" element={<TransactionHistory />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </CartProvider>
    // <div className="App">
    //   <Menu />
    // </div>
  );
}


const contentStyle = {
  marginLeft: '130px',
  width: '100%',
  float: 'right',
};

export default App;
