import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {API_URL, LOCALHOST_URL} from "../common/constants";
import NavBarAdmin from "../Component/NavBar/NavBarAdmin";

class AdminPosts extends React.Component {

    state = {
        dashboardToken: '',
        text: '',
        user: {
            id: '',
            name: ''
        },
        posts: [],
        edit: false,
        selectedPost: '',
    }

    addPost = () => {
        fetch(`${LOCALHOST_URL}/posts`, {
            method: "POST",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    text: this.state.text
                }
            )
        }).then(() => this.setState({
            text: ''
        }))
            .then(() => this.getPosts())

    }

    updatePost = (postId) => {
        fetch(`${LOCALHOST_URL}/posts/admin/update/${postId}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    text: this.state.text
                }
            )
        }).then(() => this.setState({
            text: '',
            edit: false,
            selectedPost: ''
        }))
            .then(() => this.getPosts())
    }
    deletePost = (postId) => {
        fetch(`${LOCALHOST_URL}/posts/admin/delete/${postId}`, {
            method: "DELETE",
        }).then(() => this.getPosts())
    }

    getPosts = () => {
        fetch(`${LOCALHOST_URL}/posts`)
            .then(res => res.json())
            .then(res => this.setState({
                posts: res
            }))
    }

    componentDidMount() {
        this.state.dashboardToken = localStorage.getItem('token')
        console.log("Dashboard token: ", this.state.dashboardToken)
        {
            this.state.dashboardToken === null &&
            this.props.history.push('/sign-in')
        }
        fetch(`${LOCALHOST_URL}/profile/me`, {
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

        this.getPosts()


    }

    render() {
        return (
            <div>
                <NavBarAdmin/>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <input
                                type="text"
                                placeholder="Enter Post Content"
                                onChange={async (e) => {
                                    const n = e.target.value;
                                    await this.setState({
                                        text: n
                                    })
                                }
                                }

                                id="vehicle1" name="vehicle1"
                                value={this.state.text}/>
                        </div>

                        <div className="col-lg-12">
                            <br/>
                            <span
                                onClick={() => this.addPost()}
                                className="btn btn-danger">Add Post</span>
                            <br/>
                            <br/>
                        </div>
                        <div className="col-lg-12">
                            <div className="main-box no-header clearfix bg-color-alice-blue">
                                <div className="main-box-body clearfix">
                                    <div className="table-responsive">
                                        <table className="table user-list bg-color-alice-blue">
                                            <thead>
                                            <tr>
                                                <th><span>Post</span></th>
                                                <th><span>Posted By</span></th>
                                                <th><span>Date</span></th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                this.state.posts.map(post =>

                                                    <tr>
                                                        {(!this.state.edit || this.state.selectedPost !== post._id) &&
                                                        <td>
                                                            <div className="col-sm-12">
                                                                <p><small>{post.text}</small></p>
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <span
                                                                    onClick={() => this.setState({
                                                                        edit: true,
                                                                        selectedPost: post._id,
                                                                        text: post.text
                                                                    })}
                                                                    className="btn btn-danger">Edit</span>
                                                            </div>

                                                        </td>
                                                        }
                                                        {
                                                            this.state.edit && this.state.selectedPost === post._id &&
                                                            <td>
                                                                <div className="col-sm-12">
                                                                    <input
                                                                        className="nav-item ml-auto form-control"
                                                                        placeholder="Input New Post"
                                                                        onChange={async (e) => {
                                                                            const n = e.target.value;
                                                                            await this.setState({
                                                                                    ...this.state,
                                                                                    text: n
                                                                                }
                                                                            )
                                                                        }}
                                                                        value={this.state.text}
                                                                    />
                                                                </div>
                                                                <br/>

                                                                <div className="col-sm-2">
                                                                <span
                                                                    onClick={async () => {
                                                                        await this.updatePost(post._id)
                                                                        await this.setState({
                                                                            edit: false,
                                                                            selectedPost: '',
                                                                            text: ''
                                                                        })
                                                                    }
                                                                    }
                                                                    className="btn btn-success">Save</span>
                                                                </div>

                                                            </td>
                                                        }

                                                        <td>
                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                 alt=""/>
                                                            <span className="user-link">{post.user.name}</span>
                                                            <span className="user-subhead">{post.user.email}</span>
                                                        </td>
                                                        <td>{post.date.substring(0, 10)}</td>

                                                        <td>

                                                            <span className="fa-stack cursor-pointer"
                                                                  onClick={() => this.deletePost(post._id)}
                                                            >
                                                                      <i className="fas fa-trash-alt btn-lg btn-danger"/>
                                                                </span>


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
(AdminPosts)