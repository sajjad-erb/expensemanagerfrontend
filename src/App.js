import { BrowserRouter as Router, Routes, Route, Navigate, Switch } from 'react-router-dom';
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Redirect from './components/Redirect';
import Transactions from './components/transactions/Transactions';
import FetchAccount from './components/accounts/FetchAccount';
import Wallet from './components/wallets/Wallet';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<Redirect />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Redirect />}>
          <Route path="/transactions" element={<Transactions />} />
        </Route>
        <Route element={<Redirect />}>
          <Route path="/accounts" element={<FetchAccount />} />
        </Route>
        <Route element={<Redirect />}>
          <Route path="/wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
