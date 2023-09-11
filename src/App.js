import './App.css';
import DetailCustomer from "./component/page/DetailCustomer";
import LoginPage from "./component/page/LoginPage";
import {Route, Routes} from 'react-router-dom';
import Home from "./component/Home";
import Naptien from "./component/page/Naptien";
import RegisterPage from "./component/page/RegisterPage";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/customer" element={<DetailCustomer/>}/>
                <Route path="/nap-tien" element={<Naptien/>}/>
            </Routes>
        </div>
    );
}

export default App;
