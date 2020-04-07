import React from "react";

export default class DashboardNavbarComponent extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a href="#" className="navbar-brand">
                    <i className="fas fa-code-branch"></i>
                    GeeksConnector
                </a>

                <button className="navbar-toggler" data-toggle="collapse"
                        data-target="#navbar-menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link wbdv-page-tab">Developers</a>
                        </li>
                        <li className="nav-item active">
                            <a href="#" className="nav-link wbdv-page-tab">Posts</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link wbdv-page-tab">
                                <i className="fa fa-dashboard"></i>&nbsp;Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link wbdv-page-tab">
                                <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
