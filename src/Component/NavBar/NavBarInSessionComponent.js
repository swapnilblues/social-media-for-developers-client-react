import React from "react";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {API_URL} from "../../common/constants";

export default class NavBarComponent extends React.Component {


    state = {
        selectedTab: '',
        user:'',
        dashboardToken:''
    }

    componentDidMount(){
        this.state.dashboardToken = localStorage.getItem('token')
        console.log("Dashboard token: ", this.state.dashboardToken)
        // {
        //     this.state.dashboardToken === null &&
        //     history.push('/login')
        // }
        fetch(
            `${API_URL}/profile/me`, {
                headers: {
                    'x-auth-token': '' + this.state.dashboardToken
                }
            }
        )
            .then(response => response.json())
            .then(results => this.setState({
                user: results.user,
            }))
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/codebook-client/dashboard">
                    <i className="fas fa-code-branch"/> Hello {this.state.user.name}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/codebook-client/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/codebook-client/profiles">Geeks</Nav.Link>
                        <Nav.Link href="/codebook-client/posts">Posts</Nav.Link>
                        <Nav.Link href="/codebook-client/login" onClick={async () => {
                            localStorage.clear()

                        }
                        }>
                            Sign Out
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}
