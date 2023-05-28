import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Header from "./pages/Header";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
// import Protected from "./Auth/protected";
import Page404 from "./pages/Page404";
import Footer from "./pages/Footer";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import {ToastContainer, toast} from 'react-toastify';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <ToastContainer/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/*" element={<Page404/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
