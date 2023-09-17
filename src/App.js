import './App.css';
import LoginPage from "./component/page/LoginPage";
import {Route, Routes} from 'react-router-dom';
import Home from "./component/Home";
import Naptien from "./component/page/Naptien";
import RegisterPage from "./component/page/RegisterPage";
import HomeDetailsLayout from "./component/page/HomeDetailsLayout";
import MainDetails from "./component/page/MainDetails";
import MainDetailsListKey from "./component/page/MainDetailsListKey";
import ThueKeys from "./component/page/ThueKeys";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/nap-tien" element={<Naptien/>}/>
                <Route path="/thue-keys" element={<ThueKeys/>}/>
                <Route path="/home-details-layout" element={<HomeDetailsLayout/>}/>
                    <Route path="/main-details" element={<MainDetails/>}></Route>
                    <Route path="/main-details-list-keys" element={<MainDetailsListKey/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
