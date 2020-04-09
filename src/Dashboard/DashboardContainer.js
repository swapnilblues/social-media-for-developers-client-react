import React from "react";
import DashboardNavbarComponent from "./DashboardNavbarComponent";
import ExperienceTableComponent from "./ExperienceTableComponent";
import {LOCALHOST_URL} from "../common/constants";
import {connect} from "react-redux";

class DashboardContainer extends React.Component {

    state = {
        user: {name : ''},
        experiences: [],
        dashboardToken : ''
    }

    componentDidMount() {
        this.state.dashboardToken = localStorage.getItem('token')
        console.log("Dashboard token: ",this.state.dashboardToken)
        fetch(
            `${LOCALHOST_URL}/profile/me`,{
                headers: {
                    'x-auth-token': '' + this.state.dashboardToken
                }}
        )
            .then(response => response.json())
            .then(results => this.setState({
                                               user: results.user,
                                               experiences: results.experience
                                           }))
    }

    render() {
        return (
            <div>
                <DashboardNavbarComponent/>
                <div className="container">
                    <h2 className="large">Dashboard</h2>
                    <p className="lead">
                        <i className="fas fa-child"> </i>
                        Welcome, {this.state.user.name}</p>
                </div>
                <div className="container">
                <h2 className="my-2">Experience Credentials</h2>
                <ExperienceTableComponent
                    // experiences={this.state.experiences}
                    user={this.state.user}
                />
                </div>
            </div>
        )

    }

}

const stateToPropertyMapper = (state) => {
    // console.log("FSM ",state)
    // return {
    //     token: state.token
    // }
}

const dispatchToPropertyMapper = (dispatch) => {}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)
(DashboardContainer)
