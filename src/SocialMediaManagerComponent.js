import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SocialMediaClient from "./Prototype/social-media-client";
import SocialMediaUserDetails from "./Prototype/social-media-user-details";
import ProfileDetailsContainer from "./Profile/ProfileDetailsContainer";
import GitHubRepositories from "./Profile/GitHubRepositories";
import ProfilesContainer from "./Profile/ProfilesContainer";

class SocialMediaManagerComponent extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <Route
                        path="/"
                        exact={true}
                        component={SocialMediaClient}
                    />
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
                </Router>
            </div>
    )

    }
    }

    export default SocialMediaManagerComponent