import React from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import NavBarInSessionComponent from "../Component/NavBar/NavBarInSessionComponent";
import {API_URL} from "../common/constants";

export default class ProfileComponent extends React.Component {

    state = {
        user: {user: {}, social: {}, experience: [], education: [], skills: []},
        repo: {license: '', forks: ''}
    }

    componentDidMount = async () => {
        await fetch(`${API_URL}/profile/user/${this.props.profileId}`)
            .then(response => response.json())
            .then(results => this.setState({
                user: results
            }))
        await fetch(`https://api.github.com/repos/${this.state.user.githubusername}/${this.props.repoName}`, {
            // headers: {
            //     'Authorization': 'token f08df122c87824bbc1726478300e75f59e14584f'
            // }
        })
            .then(response => response.json())
            .then(results => this.setState({
                repo: results
            }))
        await console.log("Name", this.state.user)
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
                {/*{this.state.user.user.name}*/}
                {/*{this.props.repoName}*/}
                {/*{this.state.repo.name}*/}
                <div className="container">

                    <br/>
                    <Link to={`/profile/${this.props.profileId}`}>
                        <span className="btn btn-light">Back To {this.state.user.user.name}'s Profiles</span>
                    </Link>
                    <br/>

                    <div className="profile-github">

                        <div className="p-1 border border-dark github-repo">
                            <div>
                                <h4><a href="#" className="text-dark">{this.state.repo.name}</a></h4>
                                <p className="paragraph-justify">
                                    {this.state.repo.description}
                                </p>
                                <i className="fas fa-circle"/> {this.state.repo.language}
                                <br/>
                                <i className="fas fa-star"/> {this.state.repo.stargazers_count}
                                <br/>
                                <i className="fas fa-code-branch"/>
                                {
                                    this.state.repo.forks !== 0 ||
                                    !this.state.repo.parent &&
                                     <span>
                                         <span> </span>
                                         {this.state.repo.forks}
                                     </span>


                                }
                                {this.state.repo.forks === 0 &&
                                this.state.repo.parent &&
                                <span>
                                    <span> </span>
                                    {this.state.repo.parent.forks}
                                </span>

                                }
                                <br/>
                                <b>Default
                                    Branch</b>: {this.state.repo.default_branch}
                                <br/>
                                {
                                    this.state.repo.license !== null &&
                                    <div>
                                        <i className="fas fa-balance-scale"/>
                                        <span> </span>{this.state.repo.license.name}
                                    </div>

                                }


                                <b>Updated At:</b> {this.state.repo.updated_at}
                                <br/>
                                <a href={this.state.repo.html_url} target="_blank">

                                    <b>Repository Link</b>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
