import React from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import {API_URL} from "../common/constants";
import NavBarInSessionComponent from "../Component/NavBar/NavBarInSessionComponent";
import ProfileImageComponent from "./ProfileImageComponent";

const axios = require('axios');
const test = require('../Post/temp')
export default class ProfilesContainer extends React.Component {

    state = {
        users: [],
        repos: [],
        nameToSearch: '',
        userId: '',
        image: ''
    }

    componentDidMount = () => {
        this.findAllUser()
        // this.getDisplayImage()
    }


    // getDisplayImage = () => {
    //     fetch(`${API_URL}/profile/image`, {
    //         headers: {
    //             'x-auth-token': localStorage.getItem('token')
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(results => this.setState({
    //             image : results.image
    //                                        }))
    // }

    changeName = (user) => {
        this.setState({
                          nameToSearch: user
                      })
    }

    findUserByName = (name) => {
        let array = [];
        axios.post(`${API_URL}/users/name`, {
            "name": name
        })
            .then(results => {
                // this.setState({
                //     users:res.data
                // })
                // console.log(results);
                results.data.map(user => {
                    // console.log
                    let res = {
                        user
                    };
                    array.push(res);
                })
                this.setState({
                                  users: array
                              })
                console.log(this.state.users)
            })
            .catch(err => console.log(err))
    }

    findAllUser = () => {
        fetch(`${API_URL}/profile/all`)
            .then(response => response.json())
            .then(results => this.setState({
                                               users: results
                                           }))

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

                <div className="container">


                    <div className="row find-user">
                        <button
                            onClick={this.findAllUser}
                            className="btn btn-warning find-all-users-button">Find All Users
                        </button>
                        <input type="text" placeholder="Search for user"
                               onChange={(e) => this.changeName(e.target.value)}
                               className="form-control search-geeks"
                               width="100"/>
                        <button className="btn btn-info search-geek-button"
                                onClick={() => this.findUserByName(this.state.nameToSearch)}>Search
                        </button>
                    </div>
                    <br/>

                    <div className="row profiles">
                        <div className="col-sm-12">
                            {this.state.users && this.state.users.map(user => (
                                <div className="card profile-card"
                                     style={{float: "left", marginLeft: "1.2em"}}
                                     key={user.user._id}>
                                    <ProfileImageComponent userId={user.user._id}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.user.name}</h5>
                                        <Link to={`/profiles/${user.user._id}`}>
                                            <button href="#" className="btn btn-primary">
                                                See Profile
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/*<div className="col-sm-1 dp">*/}

                    {/*    /!*<img src="../images/sajag_dp.jfif" alt="" width="250" height="250"/>*!/*/}
                    {/*    <img src={this.state.image} alt="" width="250" height="250"/>*/}
                    {/*</div>*/}

                    {/*{*/}
                    {/*    this.state.users&&this.state.users.map(user =>*/}
                    {/*        <div className="container">*/}
                    {/*        <div key={user.user._id} className="col-sm-6">*/}
                    {/*            <div className="row">*/}
                    {/*                <h2 className="geek-name"><b>{user.user.name}</b></h2>*/}
                    {/*            </div>*/}
                    {/*            <div className="row">*/}
                    {/*                <p className="geek-bio">*/}
                    {/*                    {user.bio}*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*            <div className="row">*/}
                    {/*                <p className="geek-bio">*/}
                    {/*                    Quincy, MA*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*            <div className="row">*/}
                    {/*                <Link to={`/profiles/${user.user._id}`}>*/}
                    {/*                    <span href="#" className="btn btn-danger">Open Profile</span>*/}
                    {/*                </Link>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*}*/}
                </div>
            </div>
        )
    }
}
