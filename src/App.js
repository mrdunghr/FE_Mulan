import './App.css';
import DetailCustomer from "./component/page/DetailCustomer";
import LoginPage from "./component/page/LoginPage";
import {Route, Routes} from 'react-router-dom';
import Home from "./component/Home";
import Naptien from "./component/page/Naptien";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/customer" element={<DetailCustomer/>}/>
                <Route path="/nap-tien" element={<Naptien/>}/>
            </Routes>
        </div>
    );
}

export default App;
