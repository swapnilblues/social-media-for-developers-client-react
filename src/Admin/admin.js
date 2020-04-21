import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {API_URL, LOCALHOST_URL} from "../common/constants";
import NavBarAdmin from "../Component/NavBar/NavBarAdmin";

class AdminUsers extends React.Component {

    state = {
        dashboardToken: '',
        user: {
            id: '',
            name: '',
            image: ''
        },
        users: []
    }

    deleteUserAndProfile = (userId) => {
        fetch(`${API_URL}/profile/${userId}`,{
            method: "DELETE",
        }).then(() => this.getUsers())
    }

    getUsers = () => {
        fetch(`${API_URL}/users/all`)
            .then(res => res.json())
            .then(res => this.setState({
                users: res
            }))
    }

    componentDidMount() {
        this.state.dashboardToken = localStorage.getItem('token')
        console.log("Dashboard token: ", this.state.dashboardToken)
        {
            this.state.dashboardToken === null &&
            this.props.history.push('/sign-in')
        }
        fetch(`${API_URL}/profile/me`, {
            headers: {
                'x-auth-token': this.state.dashboardToken,
                'content-type': 'application/json'
            },
        }).then(res => res.json())
            .then(res =>
                this.setState({
                    user: res.user
                })
            ).then(() => {
            {
                this.state.user.name !== 'Alice' &&
                this.props.history.push('/dashboard')

            }

        })

        this.getUsers()



    }

    render() {
        return (
            <div>
                <NavBarAdmin/>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="main-box no-header clearfix bg-color-alice-blue">
                                <div className="main-box-body clearfix">
                                    <div className="table-responsive">
                                        <table className="table user-list bg-color-alice-blue">
                                            <thead>
                                            <tr>
                                                <th><span>User</span></th>
                                                <th><span>Created</span></th>
                                                <th><span>Email</span></th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                this.state.users.map(user =>
                                                    <tr>
                                                        <td>
                                                            <img src={user.image}
                                                                 alt=""/>
                                                            <span className="user-link">{user.name}</span>
                                                            {user.name !== 'Alice' &&
                                                            <span className="user-subhead">Geek</span>
                                                            }
                                                            {user.name === 'Alice' &&
                                                            <span className="user-subhead">Admin</span>
                                                            }
                                                        </td>
                                                        <td>{user.date.substring(0, 10)}</td>

                                                        <td>
                                                            <h6>{user.email}</h6>
                                                        </td>
                                                        <td>
                                                            {/*                    <a href="#" className="table-link">*/}
                                                            {/*<span className="fa-stack">*/}
                                                            {/*    <i className="fa fa-square fa-stack-2x"/>*/}
                                                            {/*    <i className="fa fa-search-plus fa-stack-1x fa-inverse"/>*/}
                                                            {/*</span>*/}
                                                            {/*                    </a>*/}
                                                            {/*                    <a href="#" className="table-link">*/}
                                                            {/*<span className="fa-stack">*/}
                                                            {/*    <i className="fa fa-square fa-stack-2x"/>*/}
                                                            {/*    <i className="fa fa-pencil fa-stack-1x fa-inverse"/>*/}
                                                            {/*</span>*/}
                                                            {/*                    </a>*/}

                                                            {   user.name !== 'Alice' &&
                                                            <span className="fa-stack cursor-pointer"
                                                                  onClick={() => this.deleteUserAndProfile(user._id)}
                                                            >
                                                                      <i className="fas fa-trash-alt btn-lg btn-danger"/>
                                                                </span>
                                                            }

                                                        </td>
                                                    </tr>
                                                )
                                            }


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => {
}
const dispatchToPropertyMapper = (dispatch) => {
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)
(AdminUsers)
