import React from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import {LOCALHOST_URL} from "../common/constants";
import NavBarInSessionComponent from "../Component/NavBar/NavBarInSessionComponent";
const axios = require('axios');
const test = require('../Post/temp')
export default class ProfilesContainer extends React.Component {

    state = {
        users: [],
        repos: [],
        nameToSearch:'',
        image: ''
    }

    componentDidMount = () => {
        this.findAllUser()
        this.getDisplayImage()
    }

    getDisplayImage = () => {
        fetch(`${LOCALHOST_URL}/profile/image`, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(results => this.setState({
                image : results.image
                                           }))
    }


    changeName = (user) =>{
        this.setState({
            nameToSearch:user
        })
    }


    findUserByName = (name) =>{
        let array=[];
        axios.post(`http://localhost:3002/codebook/users/name`, {
            "name":name
        })
            .then(results=>{
                // this.setState({
                //     users:res.data
                // })
                // console.log(results);
                results.data.map(user=>{
                    // console.log
                    let res = {
                        user
                    };
                    array.push(res);
                })
                this.setState({
                    users:array
                })
            })
            .catch(err=>console.log(err))
    }

    findAllUser = () => {
        fetch(`${LOCALHOST_URL}/profile/all`)
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
                            className="btn btn-warning find-all-users-button">Find All Users</button>
                        <input type="text" placeholder="Search for user" onChange={(e)=>this.changeName(e.target.value)} className="form-control search-geeks"
                               width="100"/>
                        <button className="btn btn-info search-geek-button" onClick={()=>this.findUserByName(this.state.nameToSearch)}>Search</button>
                    </div>

                    <div className="profile-grid bg-secondary">


                        <div className="col-sm-1 dp">
                            {/*<img src="../images/sajag_dp.jfif" alt="" width="250" height="250"/>*/}
                            <img src={this.state.image} alt="" width="250" height="250"/>
                        </div>

                        {
                            this.state.users&&this.state.users.map(user =>
                                <div key={user.user._id} className="col-sm-6">
                                    <div className="row">
                                        <h2 className="geek-name"><b>{user.user.name}</b></h2>
                                    </div>
                                    <div className="row">
                                        <p className="geek-bio">
                                            {user.bio}
                                        </p>
                                    </div>
                                    <div className="row">
                                        <p className="geek-bio">
                                            Quincy, MA
                                        </p>
                                    </div>
                                    <div className="row">
                                        <Link to={`/profiles/${user.user._id}`}>
                                            <span href="#" className="btn btn-danger">Open Profile</span>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        )
    }
}
