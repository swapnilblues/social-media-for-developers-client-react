import React from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import {API_URL} from "../common/constants";
import NavBarInSessionComponent from "../Component/NavBar/NavBarInSessionComponent";

import ProfileImageComponent from "./ProfileImageComponent";

export default class ProfileDetailsContainer extends React.Component {

    state = {
        alert: false,
        alert_msg: '',
        currentUser: {_id: ''},
        user: {user: {}, social: {}, experience: [], education: [], followers: [], following: []},
        repos: []
    }

    componentDidMount = async () => {
        await fetch(`${API_URL}/profile/user/${this.props.userId}`)
            .then(response => response.json())
            .then(results => this.setState({
                user: results
            })).then(() => {
                fetch(`${API_URL}/profile/me`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'content-type': 'application/json'
                    }
                }).then(response => response.json())
                    .then(res => {
                        this.setState({
                            currentUser: res.user
                        })
                    })
            })

        await this.getRepos(this.state.user.githubusername)
        await console.log("Name", this.state.repos)
    }

    getRepos = (username) => {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': 'token d612c4a98409cd16eed84decaa16b379f423e77c'
            }
        })
            .then(response => response.json())
            .then(results => this.setState({
                repos: results
            }))
        console.log("Repos" + this.state.repos.length)
    }

    //
    // searchUser = (name) => {
    //     fetch(`https://jsonplaceholder.typicode.com/users?name=${name}`)
    //         .then(response => response.json())
    //         .then(results => this.setState({
    //             users: results
    //         }))
    // }

    handleFollow = async () => {
        await fetch(`${API_URL}/profile/follow/${this.state.user.user.email}`, {
            method: "PUT",
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }).then(() => {
            if (localStorage.getItem('token') === null) {
                this.setState({
                    alert: true,
                    alert_msg: 'Login to follow users'
                })
                setTimeout(function () {
                    this.setState({alert: false, alert_msg: ''});
                }.bind(this), 3000);
            }

        })

        await fetch(`${API_URL}/profile/user/${this.props.userId}`)
            .then(response => response.json())
            .then(results =>
                this.setState({
                    user: results
                })
            )

    }

    handleUnFollow = async () => {
        await fetch(`${API_URL}/profile/unfollow/${this.state.user.user.email}`, {
            method: "PUT",
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }).then(() => {
            if (localStorage.getItem('token') === null) {
                this.setState({
                    alert: true,
                    alert_msg: 'Login to unfollow users'
                })
                setTimeout(function () {
                    this.setState({alert: false, alert_msg: ''});
                }.bind(this), 3000);
            }

        })

        await fetch(`${API_URL}/profile/user/${this.props.userId}`)
            .then(response => response.json())
            .then(results =>
                this.setState({
                    user: results
                })
            )
    }

    render() {
        return (

            <div>
                {
                    localStorage.getItem('token') === null &&
                    <NavBarComponent/>
                }
                {
                    localStorage.getItem('token') !== null &&
                    <NavBarInSessionComponent/>
                }
                <div className="container">

                    {this.state.alert &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.alert_msg}
                    </div>
                    }

                    <div className="profile-grid my-1 bg-dark" >
                        <div className="col-sm-4">
                            <ProfileImageComponent userId={this.props.userId}/>
                        </div>
                        <div className="col-sm-8">
                            <div className="row">
                                <h2 className="geek-name"><b>{this.state.user.user.name}</b></h2>
                            </div>
                            <div className="row">
                                <p className="geek-bio paragraph-justify"><b>
                                    {this.state.user.bio}
                                </b></p>
                            </div>
                            <div className="row">
                                <h4><i>{this.state.user.user.email}</i></h4>
                            </div>
                        </div>
                    </div>

                    <div class="row">

                        <div className="col-sm-1"></div>

                        {localStorage.getItem('token') !== null && this.state.currentUser._id !== this.props.userId &&
                        <div className="col-sm-2 btn btn-success" onClick={this.handleFollow}>Follow</div>
                        }

                        {localStorage.getItem('token') !== null && this.state.currentUser._id !== this.props.userId &&
                        <div className="col-sm-2 btn btn-danger" onClick={this.handleUnFollow}>UnFollow</div>
                        }

                        {localStorage.getItem('token') === null &&
                        <div className="col-sm-2 btn btn-success" onClick={this.handleFollow}>Follow</div>
                        }
                        {localStorage.getItem('token') === null &&
                        <div className="col-sm-2 btn btn-danger" onClick={this.handleUnFollow}>UnFollow</div>
                        }

                        <div className="col-sm-2">
                            Followers: {this.state.user.followers.length}
                        </div>

                        <div className="col-sm-2">
                            Following: {this.state.user.following.length}
                        </div>

                    </div>
                    <br/>

                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {
                            this.state.user.experience.map(exp =>

                                <div>
                                    <h3 className="text-dark">{exp.company}</h3>
                                    <p>{exp.from} to {exp.to}</p>
                                    <p>
                                        <strong>Position: </strong>{exp.title}
                                    </p>
                                    <p>
                                        <strong>Description: </strong>{exp.description}
                                    </p>
                                </div>
                            )
                        }
                        {
                            this.state.user.experience.length === 0 &&
                            <h5>No Experience Record Found</h5>
                        }
                    </div>
                    <br/>

                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {
                            this.state.user.education.map(edu =>
                                <div>
                                    <h3 className="text-dark">{edu.school}</h3>
                                    <p>{edu.from} - {edu.to}</p>
                                    <p>
                                        <strong>Degree and Field Of Study: </strong>{edu.degree}
                                    </p>
                                    <p>
                                        <strong>Description: </strong>{edu.description}
                                    </p>
                                </div>
                            )
                        }
                        {
                            this.state.user.education.length === 0 &&
                            <h5>No Education Record Found</h5>
                        }
                    </div>

                    <br/>
                    <div className="profile-github">
                        <h2 className="text-dark my-1">
                            <i className="fab fa-github-square"/> GitHub Repositories
                        </h2>
                        {
                            this.state.repos.length === 0 && <h1>No Repos</h1>
                        }
                        {
                            this.state.repos.length > 0 && this.state.repos.map(repo =>
                                <div>
                                    {repo.name !== 'undefined.github.io' &&

                                    <Link
                                        to={`/profiles/${this.state.user.user._id}/github/${repo.name}`}>
                                        <div
                                            className="p-1 border border-info github-repo">
                                            <div>
                                                <h4><a href="#"
                                                       className="text-dark">{repo.name}</a>
                                                </h4>
                                                <p className="paragraph-justify">
                                                    {repo.description}
                                                </p>
                                                <i className="fas fa-star"/> {repo.stargazers_count}
                                            </div>
                                        </div>
                                    </Link>
                                    }

                                    <br/>

                                </div>
                            )
                        }
                        {   this.state.repos.length === 1 && this.state.repos[0].name === 'undefined.github.io' &&
                            <div>
                                <h5>GitHub account not found</h5>
                            </div>

                        }
                        {
                            !Array.isArray(this.state.repos) &&
                            <div>
                                <h5>GitHub account not found</h5>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
