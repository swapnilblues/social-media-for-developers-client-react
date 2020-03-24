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
                    Social Media Client List
                </h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input className="form-control" placeholder="Enter First and Last Name" value={this.state.title}
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
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <Link to={`/user-details/${user.id}`}>
                                        <div className="card card-body .wbdv-grid-card" key={user.id}>
                                            <h5 className="card-title">
                                                {user.name}
                                            </h5>
                                        </div>
                                    </Link>
                                    <br/>
                                </div>
                            // <li className="list-group-item"
                            //     key={user.id}>
                            //
                            // </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}