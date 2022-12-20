import { BrowserRouter as Router, Routes, Route, Navigate, Switch } from 'react-router-dom';
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Redirect from './components/Redirect';
import Transactions from './components/transactions/Transactions';
import FetchAccount from './components/accounts/FetchAccount';
import Wallet from './components/wallets/Wallet';
import { GroupExpense } from './components/GroupExpenses/GroupExpense';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<Redirect />}>
          <Route path="/" element={<Home />} />

          <Route path="/transactions" element={<Transactions />} />

          <Route path="/accounts" element={<FetchAccount />} />

          <Route path="/wallet" element={<Wallet />} />

          <Route path="/group-expenses" element={<GroupExpense />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
