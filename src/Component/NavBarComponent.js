import React from "react";

export default class NavBarComponent extends React.Component {


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <a href="#" className="navbar-brand">
                        <i className="fas fa-code-branch"/>
                        GeeksHub
                    </a>

                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-menu">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="#" className="nav-link wbdv-page-tab">Geeks</a>
                            </li>
                            <li className="nav-item active">
                                <a href="#" className="nav-link wbdv-page-tab">Login</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link wbdv-page-tab">Register</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}