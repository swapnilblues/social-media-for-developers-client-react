import React from "react";
import NavBarComponent from "../Component/NavBarComponent";
import {Link} from "react-router-dom";

export default class SignUpComponent extends React.Component {

    render() {

        return (
            <div>
                <NavBarComponent/>
                <div className="container login-main-div">


                    <p className="lead"><i className="fas fa-user-plus"/> SIGN UP</p>
                    <form className="form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="GitHub Username"
                                name="github-username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password"
                            />
                        </div>
                    </form>
                    <button type="submit" className="btn btn-primary">
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