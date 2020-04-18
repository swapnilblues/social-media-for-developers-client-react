import React from "react";
import ExperienceTableComponent from "./ExperienceTableComponent";
import {LOCALHOST_URL} from "../common/constants";
import {connect} from "react-redux";
import EducationTableComponent from "./EducationTableComponent";
import NavBarInSessionComponent from "../Component/NavBar/NavBarInSessionComponent";
import GitHubDashboard from "./GitHubDashboard";
import PhoneNumberComponent from "./PhoneNumberComponent";
import axios from 'axios';
import FileUploader from 'react-firebase-file-uploader';
import {storage} from '../firebase_config';
import firebase from 'firebase/app';
import ImageComponent from "./ImageComponent";
class DashboardContainer extends React.Component {
    state = {
        user: {name: ''},
        experiences: [],
        dashboardToken: '',
        image: '',
    }
    handleUploadSuccess = (filename) => {
        storage.ref('Uploaded_Images').child(filename).getDownloadURL().then(url => {
            let newA = url;
            console.log(newA);
            this.setState({
                              image: newA
                          })
            console.log(this.state.image);
        })
    }

    saveImage = () => {
        fetch(`${LOCALHOST_URL}/profile/image`, {
            method: "PUT",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    image: this.state.image
                }
            )
        }).then(() => console.log("after fetch: ", this.state.image ))
    }

    componentDidMount() {
        this.state.dashboardToken = localStorage.getItem('token')
        console.log("Dashboard token: ", this.state.dashboardToken)
        {
            this.state.dashboardToken === null &&
            this.props.history.push('/sign-in')
        }
        fetch(
            `${LOCALHOST_URL}/profile/me`, {
                headers: {
                    'x-auth-token': '' + this.state.dashboardToken
                }
            }
        )
            .then(response => response.json())
            .then(results => this.setState({
                                               user: results.user,
                                               experiences: results.experience,
                                               image: results.image
                                           }))
    }
    render() {
        return (
            <div>
                <NavBarInSessionComponent/>
                <div className="container">
                    <h2 className="large">Dashboard</h2>
                    <p className="lead">
                        <i className="fas fa-child"> </i>
                        Welcome, {this.state.user.name}</p>
                </div>
                <br/>

                <div className="container">
                    <h4>Add an Image</h4>
                    <br/>
                    <FileUploader
                        accept="image/*"
                        name='image'
                        storageRef={firebase.storage().ref('Uploaded_Images')}
                        onUploadSuccess={this.handleUploadSuccess}
                    />
                    <button onClick={() => this.saveImage()}>Save Image</button>
                </div>

                <div className="container">
                    <h2 className="my-2">Phone Number</h2>
                    <PhoneNumberComponent
                        githubUsername={this.props.githubUsername}
                        user={this.state.user}
                    />
                </div>
                <div className="container">
                    <ImageComponent
                        imageUrl={this.state.image}/>
                </div>
                <div className="container">
                    <h2 className="my-2">GitHub Username</h2>
                    <GitHubDashboard
                        githubUsername={this.props.githubUsername}
                        user={this.state.user}
                    />
                </div>
                <br/>
                <div className="container">
                    <h2 className="my-2">Phone Number</h2>
                    <PhoneNumberComponent
                        githubUsername={this.props.githubUsername}
                        user={this.state.user}
                    />
                </div>
                <br/>
                <div className="container">
                    <h2 className="my-2">Experience Credentials</h2>
                    <ExperienceTableComponent
                        experienceId={this.props.experienceId}
                        user={this.state.user}
                    />
                </div>
                <br/>
                <br/>
                <div className="container">
                    <h2 className="my-2">Education Credentials</h2>
                    <EducationTableComponent
                        educationId={this.props.educationId}
                        user={this.state.user}
                    />
                </div>
            </div>
        )
    }
}

export default DashboardContainer
// const stateToPropertyMapper = (state) => {
// }
// const dispatchToPropertyMapper = (dispatch) => {
// }
// export default connect(stateToPropertyMapper, dispatchToPropertyMapper)
// (DashboardContainer)
