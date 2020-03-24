import React from "react";

export default class SocialMediaUserDetails extends React.Component{

    state = {
        user: {}
    }

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.userId}`)
            .then(response => response.json())
            .then(results => this.setState({
                user: results
            }))
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.userId !== prevProps.userId) {
            fetch(`https://jsonplaceholder.typicode.com/users/${this.props.userId}`)
                .then(response => response.json())
                .then(results => this.setState({
                    user: results
                }))
        }

    }

    render() {
        return(
            <div className="container">
                <h1>
                    Details of {this.state.user.name}
                </h1>
                <h5>
                    Email: {this.state.user.email}
                </h5>
                <h5>
                    Website: {this.state.user.website}
                </h5>
            </div>
        )
    }
}