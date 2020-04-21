import React from "react";
import {connect} from "react-redux";
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import {Link} from "react-router-dom";
import {API_URL, LOCALHOST_URL} from "../common/constants";
import CreateImage from "../../src/SignUp/test";
import uploadSuccess from "../Dashboard/Uploader";
class SignUpComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        password: '',
        email: '',
        name: '',
        cpassword: '',
        token: '',
        alert: false,
        alert_msg: []
    }

    register = async () => {
        if (this.state.password !== this.state.cpassword) {
            this.setState({
                alert: true,
                alert_msg: [{'msg':'Passwords do not match'}]
            })
            setTimeout(function () {
                this.setState({alert: false, alert_msg: []});
            }.bind(this), 3000);

        } else {
            // CreateImage(this.state.name);
            // let url = await uploadSuccess("E:\\NEU\\CS5610-WebDev\\Final_Project\\swapnil-front-end\\social-media-for-developers-client-react\\src\\SignUp")
            // console.log("URL "+url);
            await fetch(`${LOCALHOST_URL}/users`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        image: 'https://firebasestorage.googleapis.com/v0/b/ecommerceweb-8831e.appspot.com/o/Uploaded_Images%2Fdownload.png?alt=media&token=3277b9c0-d960-47fb-8364-b2d71ca71171',
                        password: this.state.password,
                        email: this.state.email,
                        name: this.state.name
                    }
                )
            }).then(response =>
                response.json()
            ).then(
                r => {
                    if (r.errors !== undefined) {

                            this.setState({
                                alert: true,
                                alert_msg: r.errors
                            })
                        setTimeout(function () {
                            this.setState({alert: false, alert_msg: []});
                        }.bind(this), 3000);

                    } else {
                        console.log("SUCCESS", r)
                        this.setState(
                            {
                                token: r.token
                            }
                        )
                         fetch(
                            `${LOCALHOST_URL}/profile`, {
                                headers: {
                                    'x-auth-token': this.state.token,
                                    'content-type': 'application/json'
                                },
                                method: 'POST'
                            }).then(
                            async () =>  {
                                await fetch(`${LOCALHOST_URL}/profile/image`,{
                                    headers: {
                                        'x-auth-token': this.state.token,
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify(
                                        {
                                            image: 'https://firebasestorage.googleapis.com/v0/b/ecommerceweb-8831e.appspot.com/o/Uploaded_Images%2Fdownload.png?alt=media&token=3277b9c0-d960-47fb-8364-b2d71ca71171',
                                        }
                                    ),
                                    method: 'PUT'
                                })
                                await console.log('State token ', this.state.token)
                                await this.props.generateTokenAndSave(this.state.token)
                                await this.props.history.push(`/dashboard`)
                            }
                    )

                    }
                }
            )
        }
    }

    render() {

        return (
            <div>
                <NavBarComponent/>
                <div className="container login-main-div-1">
                    {this.state.alert && this.state.alert_msg.length>0 && this.state.alert_msg.map(err =>(
                        <div className="alert alert-danger" role="alert">
                        {err.msg}
                        </div>
                    )
                    )}


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
                        <Link to={"/login"}> Login</Link>
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
    stateToPropertyMapper, dispatchToPropertyMapper)(SignUpComponent)
