import React from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import {LOCALHOST_URL} from "../common/constants";
import NavBarInSessionComponent from "../Component/NavBar/NavBarInSessionComponent";

export default class ProfileDetailsContainer extends React.Component {

    state = {
        user: {user: {}, social: {}, experience: [], education: [], skills: []},
        repos: []
    }

    componentDidMount = async () => {
        await fetch(`${LOCALHOST_URL}/profile/user/${this.props.userId}`)
            .then(response => response.json())
            .then(results => this.setState({
                user: results
            }))

        await this.getRepos(this.state.user.githubusername)
        await console.log("Name", this.state.repos)
    }

    getRepos = (username) => {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': 'token 862dd87f07b9ebce2fc3bad7d3496d3e54a4646b'
            }
        })
            .then(response => response.json())
            .then(results => this.setState({
                repos: results
            }))
    }
    //
    // searchUser = (name) => {
    //     fetch(`https://jsonplaceholder.typicode.com/users?name=${name}`)
    //         .then(response => response.json())
    //         .then(results => this.setState({
    //             users: results
    //         }))
    // }

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

                    <div className="profile-grid my-1 bg-secondary">


                        <div className="col-sm-4">
                            <img src="../images/sajag_dp.jfif" alt="Not found" width="250"
                                 height="250"/>
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
                                <h4><b>Skills</b></h4>
                            </div>
                            <div className="row">
                                <ul className="skills">
                                    {this.state.user.skills.map(skill =>
                                        <li><i
                                            className="fas fa-terminal"/> {skill}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

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


                    <div className="profile-github">
                        <h2 className="text-dark my-1">
                            <i className="fab fa-github-square"/> GitHub Repositories
                        </h2>

                        {
                            this.state.repos.map(repo =>
                                    <div>
                                        {   repo.name !== 'undefined.github.io' &&

                                            <Link
                                                to={`/profiles/${this.state.user.user._id}/github/${repo.name}`}>
                                                <div
                                                    className="p-1 border border-secondary github-repo">
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
                        {
                            this.state.repos.length === 1 &&
                                this.state.repos[0].name === 'undefined.github.io' &&
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
