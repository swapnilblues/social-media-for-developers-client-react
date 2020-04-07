import React from "react";
import DashboardNavbarComponent from "./DashboardNavbarComponent";
import ExperienceTableComponent from "./ExperienceTableComponent";

export default class DashboardContainer extends React.Component {

    state = {
        user: {user: {}},
        experiences: []
    }

    componentDidMount() {
        fetch(
            `https://group-32-node-server.herokuapp.com/codebook/profile/user/5e838d60e3120a21983de85c`)
            .then(response => response.json())
            // .then(results => console.log(results.experience))
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
                        Welcome, {this.state.user.name}!</p>
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
