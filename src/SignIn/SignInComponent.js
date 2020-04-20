import React from "react";
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import {Link} from "react-router-dom";
import {API_URL} from "../common/constants";
import {connect} from "react-redux";

class SignInComponent extends React.Component {

    state = {
        email: '',
        password: '',
        alert: false,
        alert_msg: ''
    }

    login = async () => {
        await fetch(`${API_URL}/users/auth`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    password: this.state.password,
                    email: this.state.email
                }
            )
        }).then(response =>
            response.json()
        ).then(
            r => {
                if (r.errors !== undefined) {
                    r.errors.map(error => {
                            this.setState({
                                alert: true,
                                alert_msg: error.msg
                            })
                            setTimeout(function () {
                                this.setState({alert: false, alert_msg: ''});
                            }.bind(this), 3000);
                        }
                    )
                } else {
                    console.log("SUCCESS", r.user.role)
                    this.props.generateTokenAndSave(r.token)
                    {
                        r.user === undefined &&
                        this.props.history.push(`/dashboard`)
                    }
                    {
                        r.user.role === 0 &&
                        this.props.history.push(`/dashboard`)
                    }
                    {
                        r.user.role === 1 &&
                        this.props.history.push(`/admin-users`)
                    }
                }
            }
        )

    }

    render() {

        return (
            <div>
                <NavBarComponent/>

                <div className="container login-main-div">
                    {this.state.alert &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.alert_msg}
                    </div>
                    }

                    <p className="lead"><i className="fas fa-sign-in-alt"/> SIGN IN</p>
                    <form className="form">
                        <div className="form-group">
                            <input onChange={async (e) =>
                                await this.setState({
                                    email: e.target.value
                                })
                            }
                                   placeholder="Email Address"
                                   name={"email"}
                                   required
                                   type={"email"}
                                   value={this.state.email}
                            />
                        </div>
                        <div className="form-group">

                            <input onChange={async (e) =>
                                await this.setState({
                                    password: e.target.value
                                })
                            }
                                   placeholder="Password"
                                   name={"password"}
                                   type={"password"}
                                   required
                                   value={this.state.password}
                            />
                        </div>
                    </form>
                    <button type="submit" onClick={this.login} className="btn btn-primary">
                        Sign In
                    </button>

                    <p className="my-1">
                        Don't have an account?
                        <Link to={"/sign-up"}> Sign Up</Link>
                    </p>


                </div>
            </div>
        )

    }

}

const stateToPropertyMapper = (state) => {
    return {
        // token: state.token
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        generateTokenAndSave: (token) =>
            dispatch({
                type: "ADD_TOKEN",
                token: token
            })

    }
}

export default connect(
    stateToPropertyMapper, dispatchToPropertyMapper)(SignInComponent)

