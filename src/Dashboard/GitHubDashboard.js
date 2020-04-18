import React from "react";
import DatePicker from "react-datepicker/es";
import {API_URL, LOCALHOST_URL} from "../common/constants";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class gitHubDashboard extends React.Component {

    state = {
        githubUsername: null,
        dashboardToken: '',
        edit: false,
    }

    addGithubUsername = () => {
        // console.log("Trying to add githubusername")
        // console.log(localStorage.getItem('token'))
        // console.log(this.state.githubUsername)
        fetch(`${LOCALHOST_URL}/profile/githubusername`, {
            method: "POST",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    githubusername: this.state.githubUsername
                }
            )
        }).then(() => this.getGithubUsername())
    }

    updateGithubUsername = (educationId) => {
        fetch(`${LOCALHOST_URL}/profile/githubusername`, {
            method: "PUT",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    school: this.state.updateSchool,
                    degree: this.state.updateDegree,
                    from: this.state.updateFrom,
                    // to: !this.state.current ? this.state.inputTo : 'Present',
                    to: this.state.updateTo,
                    current: this.state.updateCurrent,
                    description: this.state.updateDescription,
                    fieldofstudy: 'null'
                }
            )
        })
            .then(response => {
                this.getGithubUsername()
            })
    }

    deleteGithubUsername = (eid) => {
        fetch(`${LOCALHOST_URL}/profile/githubusername`, {
            method: "DELETE",
            headers: {
                'x-auth-token': this.state.dashboardToken,
                'content-type': 'application/json'
            }
        })
            .then(() => {
                this.getGithubUsername()
            })
    }


    componentDidMount = async () => {
        await this.setState({
            dashboardToken: localStorage.getItem('token')
        })
        await this.getGithubUsername();
    }


    getGithubUsername = () => {
        fetch(
            `${LOCALHOST_URL}/profile/me`, {
                headers: {
                    'x-auth-token': this.state.dashboardToken
                }
            }
        )
            .then(response => response.json())
            .then(results => this.setState({
                githubUsername: results.githubusername !== "" ? results.githubusername: null

            }))
    }

    changeEdit = () => {
        if (this.state.edit === false)
            this.setState({
                edit: true
            })
        else
            this.setState({
                edit: false
            })
    }

    render() {
        return (
            // <div>
            //     {this.state.githubUsername}
            // </div>


            <div>
                {this.state.edit === false &&
                <div className="col list-group">
                    <div className="list-group-item">
                        <div className="container row">
                            {!this.state.githubUsername &&
                            <div className="col-lg-2"><i>No Username Given</i></div>
                            }
                            {this.state.githubUsername &&
                            <div className="col-lg-2"><i>{this.state.githubUsername}</i></div>
                            }

                            <div className="col-lg-2">
                                {!this.state.githubUsername &&
                                <button
                                    onClick={() => {
                                        this.setState({
                                            edit: true
                                        })
                                    }
                                    }
                                    className="btn btn-danger">
                                    Add Username
                                </button>
                                }
                                {this.state.githubUsername &&
                                <button
                                    onClick={() => {
                                        this.setState({
                                            edit: true
                                        })
                                    }
                                    }
                                    className="btn btn-danger">
                                    Edit Username
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                }
                {this.state.edit === true &&
                <div className="list-group-item">
                    <div className="container row">
                        <div className="col-lg-2">
                            <input

                                className="nav-item ml-auto form-control"
                                placeholder="Input GitHub Username"
                                onChange={async (e) =>
                                    await this.setState({
                                            githubUsername: e.target.value,
                                        }
                                    )}
                                value={this.state.githubUsername}
                            />
                        </div>


                        <div className="col-lg-1">
                            <button
                                onClick={async () => {
                                    await this.setState({
                                        edit: false
                                    })
                                    await this.addGithubUsername()
                                }
                                }
                                className="btn btn-danger">
                                Enter

                            </button>
                        </div>

                        <div className="col-lg-1">
                            <button
                                onClick={async () => {
                                    await this.setState({
                                        edit: false
                                    })
                                    await this.deleteGithubUsername()
                                }
                                }
                                className="btn btn-danger">
                                Delete

                            </button>
                        </div>
                        {/*<div className="col-lg-1">*/}
                        {/*    <button*/}
                        {/*        onClick={async () => {*/}
                        {/*            await this.setState({*/}
                        {/*                edit: false*/}
                        {/*            })*/}
                        {/*            await this.deleteGithubUsername()*/}
                        {/*        }*/}
                        {/*        }*/}
                        {/*        className="btn btn-danger"*/}
                        {/*    >*/}
                        {/*        Delete*/}
                        {/*    </button>*/}


                        {/*</div>*/}


                    </div>
                </div>
                }
            </div>


        );
    }
}

export default gitHubDashboard
