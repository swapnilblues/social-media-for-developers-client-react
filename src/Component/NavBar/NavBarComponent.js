import React from "react";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class BarComponent extends React.Component {


    state = {
        selectedTab: ''
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <i className="fas fa-code-branch"/>
                    GeeksHub
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/codebook-client/profiles">Geeks</Nav.Link>
                        <Nav.Link href="/codebook-client/login">Login</Nav.Link>
                        <Nav.Link href="/codebook-client/register">Register</Nav.Link>
                    </Nav>

<<<<<<< HEAD
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-menu">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profiles"}>
                                    <span className="nav-link wbdv-page-tab">Geeks</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/sign-in"}>
                                    <span href="#" className="nav-link wbdv-page-tab">Login</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/sign-up"}>
                                    <a href="#" className="nav-link wbdv-page-tab">Sign Up</a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
=======
                </Navbar.Collapse>
            </Navbar>
>>>>>>> fda3d924e20acc1f081d2d59f3c49cbf3bdf114e
        )
    }
}
