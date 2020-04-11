import React from "react";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux"
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
import authReducer from "./Reducer/auth.reducer"


const store = createStore(authReducer)

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
                                    userId = {props.match.params.userId}
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

                    <Provider store={store}>

                        <Route
                            path="/success"
                            exact={true}
                            render={
                                (props) =>
                                    <SuccessComponent
                                        email={props.match.params.email}
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
                            path="/dashboard"
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
                            path="/dashboard/experience/:experienceId"
                            exact={true}
                            render={
                                (props) =>
                                    <DashboardContainer
                                        experienceId = {props.match.params.experienceId}
                                        {...props}
                                    />
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
                    </Provider>



                    <Route
                        path="/failure"
                        exact={true}
                        component={FailureComponent}
                    >

                    </Route>



                </Router>
            </div>
        )

    }
}

export default SocialMediaManagerComponent

