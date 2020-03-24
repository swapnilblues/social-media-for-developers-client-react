import React from "react";
import {Link} from 'react-router-dom';

export default class SocialMediaClient extends React.Component {

    state = {
        users: [],
        name: ''
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(results => this.setState({
                users: results
            }))
    }

    searchUser = (name) => {
        fetch(`https://jsonplaceholder.typicode.com/users?name=${name}`)
            .then(response => response.json())
            .then(results => this.setState({
                users: results
            }))
    }

    render() {
        return (
            <div className="container">
                <h1>
                    Social Media Client ({this.state.users.length})
                </h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input className="form-control" placeholder="Enter Name" value={this.state.title}
                               onChange={(e) => this.setState({
                                   name: e.target.value
                               })}
                        />
                        <button
                            onClick={() => this.searchUser(this.state.name)}
                            className="btn btn-primary btn-block">
                            Search
                        </button>
                    </li>
                    <br/>
                    {
                        this.state.users.map(user =>
                            <li className="list-group-item"
                                key={user.id}>
                                <Link to={`/user-details/${user.id}`}>
                                    {user.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}