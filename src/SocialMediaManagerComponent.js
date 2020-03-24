import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SocialMediaClient from "./Prototype/social-media-client";
import SocialMediaUserDetails from "./Prototype/social-media-user-details";

class SocialMediaManagerComponent extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <Route
                        path="/social-media"
                        exact={true}
                        component={SocialMediaClient}
                    />
                    <Route
                        path="/social-media/:userId"
                        exact={true}
                        render={
                            (props) =>
                                <SocialMediaUserDetails
                                    userId={props.match.params.userId}
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