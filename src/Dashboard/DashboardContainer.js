import React from "react";
import ExperienceTableComponent from "./ExperienceTableComponent";
import {API_URL} from "../common/constants";
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
        uploadStatus: false,
        isImageUploaded: false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.image !== this.state.image) {
            this.setState({
                              isImageUploaded: true
                          })
        }
    }

    handleUploadSuccess = (filename) => {
        // let newA = uploadSuccess(storage,filename)
        storage.ref('Uploaded_Images').child(filename).getDownloadURL().then(url => {
            let newA = url;
            console.log(newA);
            this.setState({
                              image: newA
                          });
        })
    };


    saveImage = () => {
        fetch(`${API_URL}/profile/image`, {
            method: "PUT",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    image: this.state.image,
                }
            )
        }).then(() => this.setState({uploadStatus: true}))
            .then(() => setTimeout(function () {
                this.setState({
                                  uploadStatus: false,
                                  isImageUploaded: false
                              });
            }.bind(this), 3000))

    }

    componentDidMount() {
        this.state.dashboardToken = localStorage.getItem('token')
        console.log("Dashboard token: ", this.state.dashboardToken)
        {
            this.state.dashboardToken === null &&
            this.props.history.push('/login')
        }
        fetch(
            `${API_URL}/profile/me`, {
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
                <div className="dashboard-div">
                    <h2 className="large">Dashboard</h2>
                    <p className="lead">
                        <i className="fas fa-child"> </i>
                        Welcome, {this.state.user.name}</p>
                </div>
                {this.state.image &&
                 <div className="dashboard-div">
                     <ImageComponent
                         imageUrl={this.state.image}/>
                 </div>
                }

                <div className="dashboard-div">
                    <h4>Add an Image</h4>
                    <br/>
                    <FileUploader
                        accept="image/*"
                        name='image'
                        storageRef={firebase.storage().ref('Uploaded_Images')}
                        onUploadSuccess={this.handleUploadSuccess}
                    />
                    <br/>
                    <div>{this.state.uploadStatus && this.state.isImageUploaded &&
                          <div className="alert alert-success" role="alert">Image Uploaded
                              Successfully</div>}</div>
                    <button className="btn btn-success" onClick={() => this.saveImage()}>Save
                        Image
                    </button>
                </div>

                <div className="row">
                    <div className="dashboard-div col-6 col-lg-4">
                        <h4 className="my-2">Phone Number</h4>
                        <PhoneNumberComponent
                            githubUsername={this.props.githubUsername}
                            user={this.state.user}
                        />
                    </div>
                    <div className="col-6 col-lg-4">
                        <h4 className="my-2">GitHub Username</h4>
                        <GitHubDashboard
                            githubUsername={this.props.githubUsername}
                            user={this.state.user}
                        />
                    </div>
                </div>
                <br/>
                <div className="dashboard-div">
                    <h2 className="my-2">Experience Credentials</h2>
                    <ExperienceTableComponent
                        experienceId={this.props.experienceId}
                        user={this.state.user}
                    />
                </div>
                <br/>
                <br/>
                <div className="dashboard-div">
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
