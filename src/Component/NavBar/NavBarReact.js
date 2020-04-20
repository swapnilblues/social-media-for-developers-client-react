import React from "react";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class NavBarReact extends React.Component {


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

                </Navbar.Collapse>
            </Navbar>
        )
    }
}
