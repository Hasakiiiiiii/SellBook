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
// import Menu from './Menu/Menu';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={contentStyle}>
            <Routes>  
              <Route path="/" element={<Home />} />
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
