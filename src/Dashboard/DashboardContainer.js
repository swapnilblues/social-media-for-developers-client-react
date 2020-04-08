import React from "react";
import DashboardNavbarComponent from "./DashboardNavbarComponent";
import ExperienceTableComponent from "./ExperienceTableComponent";
import {LOCALHOST_URL} from "../common/constants";
import {connect} from "react-redux";

class DashboardContainer extends React.Component {

    state = {
        user: {name : ''},
        experiences: []
    }

    componentDidMount() {
        console.log("Dashboard token: ",this.props.token)
        fetch(
            `${LOCALHOST_URL}/profile/me`,{
                headers: {
                    'x-auth-token': '' + this.props.token
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
                    experiences={this.state.experiences}
                />
                </div>
            </div>
        )

    }

}

const stateToPropertyMapper = (state) => {
    return {
        token: state.token
    }
}

const dispatchToPropertyMapper = (dispatch) => {}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)
(DashboardContainer)
