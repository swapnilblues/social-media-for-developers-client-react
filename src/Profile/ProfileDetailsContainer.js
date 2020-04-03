import React from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from "../Component/NavBarComponent";

export default class ProfileDetailsContainer extends React.Component {

    state = {
        user: {user: {}, social: {}, experience: [], education: [], skills: []},
        repos: []
    }

    componentDidMount = async () => {
        await fetch("https://group-32-node-server.herokuapp.com/codebook/profile/user/5e838d60e3120a21983de85c")
            .then(response => response.json())
            .then(results => this.setState({
                user: results
            }))

        await this.getRepos(this.state.user.githubusername)

        await console.log("Name", this.state.repos)
    }


    getRepos = (username) => {
        fetch(`https://api.github.com/users/${username}/repos`)
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
                <NavBarComponent/>
                <div className="container">

                    <div className="profile-grid my-1 bg-secondary">


                        <div className="col-sm-4">
                            <img src="../images/sajag_dp.jfif" alt="Not found" width="250" height="250"/>
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
                                        <li><i className="fas fa-terminal"/> {skill}</li>
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
                                    <p>{exp.from}</p>
                                    <p><strong>Position: </strong>{exp.title}</p>
                                    <p><strong>Location: </strong>{exp.location}</p>
                                    <p>
                                        <strong>Description: </strong>{exp.description}
                                    </p>
                                </div>
                            )
                        }

                    </div>


                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        <div>
                            <h3>Northeastern University</h3>
                            <p>Sep 2019 - Current</p>
                            <p><strong>Degree: </strong>Masters' of Science</p>
                            <p><strong>Field Of Study: </strong>Computer Science</p>
                            <p>
                                <strong>Description: </strong>Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                                ipsam, sapiente suscipit dicta eius velit amet aspernatur
                                asperiores modi quidem expedita fugit.
                            </p>
                        </div>
                    </div>


                    
                    <div className="profile-github">
                        <h2 className="text-dark my-1">
                            <i className="fab fa-github-square"/> GitHub Repositories
                        </h2>


                        {
                            this.state.repos.map(repo =>
                                <div>
                                    <Link to={`/profiles/${this.state.user.user._id}/github/${repo.name}`}>
                                        <div className="p-1 border border-secondary github-repo">
                                            <div>
                                                <h4><a href="#" className="text-dark">{repo.name}</a></h4>
                                                <p className="paragraph-justify">
                                                    {repo.description}
                                                </p>
                                                <i className="fas fa-star"/> {repo.stargazers_count}
                                            </div>
                                        </div>
                                    </Link>
                                    <br/>
                                </div>
                            )
                        }


                    </div>
                </div>

            </div>
        )
    }
}