import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import "../styles/header.css";
import {toast} from "react-toastify";

function Header() {

    const navigate = useNavigate();

    function logout() {
        localStorage.setItem('login', false);
        navigate('/login');

        toast.success("Logout Successfully!")
    }

    return (
        <Navbar className="header" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about">
                        About
                    </Nav.Link>
                    {localStorage.getItem('login') === 'true' ? (
                        <>
                            <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
