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
        posts: []
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

    deletePost = (postId) => {
        fetch(`${LOCALHOST_URL}/posts/admin/post/${postId}`, {
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
                                                        <td>
                                                            <h6>{post.text}</h6>
                                                        </td>
                                                        <td>
                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                 alt=""/>
                                                            <span className="user-link">{post.user.name}</span>
                                                            <span className="user-subhead">{post.user.email}</span>
                                                        </td>
                                                        <td>{post.date.substring(0, 10)}</td>

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