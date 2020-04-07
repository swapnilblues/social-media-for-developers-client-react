import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SocialMediaClient from "./Prototype/social-media-client";
import SocialMediaUserDetails from "./Prototype/social-media-user-details";
import ProfileDetailsContainer from "./Profile/ProfileDetailsContainer";
import GitHubRepositories from "./Profile/GitHubRepositories";
import ProfilesContainer from "./Profile/ProfilesContainer";
import LandingComponent from "./Component/LandingComponent";
import SignUpComponent from "./SignUp/SignUpComponent";
import SignInComponent from "./SignIn/SignInComponent";
import FailureComponent from "./Temporary/failure";
import SuccessComponent from "./Temporary/success";
import DashboardContainer from "./Dashboard/DashboardContainer";

class SocialMediaManagerComponent extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <Route
                        path="/"
                        exact={true}
                        component={LandingComponent}
                    >
                    </Route>

                    <Route
                        path="/profiles/:userId/dashboard"
                        exact={true}
                        render={
                            (props) =>
                                <DashboardContainer
                                    {...props}
                                />
                        }
                    >
                    </Route>

                    <Route
                        path="/user-details/:userId"
                        exact={true}
                        render={
                            (props) =>
                                <SocialMediaUserDetails
                                    userId={props.match.params.userId}
                                />
                        }
                    >
                    </Route>
                    <Route
                        path="/profiles/:userId"
                        exact={true}
                        render={
                            (props) =>
                                <ProfileDetailsContainer
                                    {...props}
                                />
                        }
                    >
                    </Route>

                    <Route
                        path="/profiles/:profileId/github/:repoName"
                        exact={true}
                        render={
                            (props) =>
                                <GitHubRepositories
                                    profileId={props.match.params.profileId}
                                    repoName={props.match.params.repoName}
                                    {...props}
                                />
                        }
                    >
                    </Route>

                    <Route
                        path="/profiles"
                        exact={true}
                        render={
                            (props) =>
                                <ProfilesContainer/>
                        }
                    >
                    </Route>

                    <Route
                        path="/sign-up"
                        exact={true}
                        render={
                            (props) =>
                                <SignUpComponent
                                    {...props}
                                />
                        }
                    >

                    </Route>

                    <Route
                        path="/sign-in"
                        exact={true}
                        render={
                            (props) =>
                                <SignUpComponent
                                    {...props}
                                />
                        }
                        component={SignInComponent}
                    >

                    </Route>

                    <Route
                        path="/failure"
                        exact={true}
                        component={FailureComponent}
                    >

                    </Route>

                    <Route
                        path="/success/:email"
                        exact={true}
                        render={
                            (props) =>
                                <SuccessComponent
                                    email = {props.match.params.email}
                                    {...props}
                                />
                        }
                    >

                    </Route>


                </Router>
            </div>
        )

    }
}

export default SocialMediaManagerComponent

