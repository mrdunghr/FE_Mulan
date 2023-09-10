import './App.css';
import DetailCustomer from "./component/page/DetailCustomer";
import LoginPage from "./component/page/LoginPage";
import {Route, Routes} from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/customer" element={<DetailCustomer/>}/>
            </Routes>
        </div>
    );
}

export default App;
