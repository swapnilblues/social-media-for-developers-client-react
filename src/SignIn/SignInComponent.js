import React from "react";
import NavBarComponent from "../Component/NavBarComponent";
import {Link} from "react-router-dom";

export default class SignInComponent extends React.Component {

    render() {

        return (
            <div>
                <NavBarComponent/>
                <div className="container login-main-div">


                    <p className="lead"><i className="fas fa-sign-in-alt"></i> SIGN IN</p>
                    <form className="form">
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
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                        </div>
                    </form>
                    <button type="submit" className="btn btn-primary">
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