import React from "react";
import NavBarComponent from "../Component/NavBarComponent";
import {Link} from "react-router-dom";
import {API_URL} from "../common/constants";

export default class SignUpComponent extends React.Component {

    state = {
        password: '',
        email: '',
        name: '',
        cpassword: ''
    }

    register = () => {
        if(this.state.password !== this.state.cpassword)
            alert("Passwords do not match")
        else {
            alert("Awesome")
            fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        password: this.state.password,
                        email: this.state.email,
                        name: this.state.name
                    }
                )
            }).then(response => console.log("RESPONSE",response))
        }
    }

    render() {

        return (
            <div>
                <NavBarComponent/>
                <div className="container login-main-div">


                    <p className="lead"><i className="fas fa-user-plus"/> SIGN UP</p>
                    <form className="form">
                        <div className="form-group">
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    placeholder="Full Name"*/}
                            {/*    name="name"*/}
                            {/*    required*/}
                            {/*/>*/}
                            <input onChange={async (e) =>
                                await this.setState({
                                    name: e.target.value
                                })
                            }
                                   placeholder="Full Name"
                                   name={"email"}
                                   required
                                   value={this.state.name}
                            />

                        </div>
                        <div className="form-group">

                            <input onChange={async (e) =>
                                await this.setState({
                                    email: e.target.value
                                })
                            }
                                   type={"email"}
                                   placeholder="Email"
                                   name={"email"}
                                   required={"true"}
                                   value={this.state.email}
                            />

                        </div>
                        <div className="form-group">

                            <input onChange={async (e) =>
                                await this.setState({
                                    password: e.target.value
                                })
                            }
                                   type={"password"}
                                   placeholder="Password"
                                   name={"password"}
                                   required={"true"}
                                   value={this.state.password}
                            />

                        </div>
                        <div className="form-group">
                            <input onChange={async (e) =>
                                await this.setState({
                                    cpassword: e.target.value
                                })
                            }
                                   type={"password"}
                                   placeholder="Confirm Password"
                                   name={"confirmPassword"}
                                   required={"true"}
                                   value={this.state.cpassword}
                            />

                        </div>
                    </form>
                    <button
                        onClick={this.register}
                        type="submit" className="btn btn-primary">
                        Sign Up
                    </button>

                    <p className="my-1">
                        Already have an account?
                        <Link to={"/sign-in"}> Sign In</Link>
                    </p>

                </div>
            </div>
        )
    }

}