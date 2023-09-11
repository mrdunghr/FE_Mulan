import Sidebar from "../Sidebar";
import Header from "../Header";
import {Outlet} from "react-router-dom";
import Footer from "../Footer";

export default function HomeDetailsLayout() {
    return(
        <>
            <Header/>
            <Sidebar/>
            <Outlet/>
            <Footer/>
        </>
    );
}