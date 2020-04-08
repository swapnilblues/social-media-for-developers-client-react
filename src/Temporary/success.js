import React from "react";
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import {Link} from "react-router-dom";
export default class SuccessComponent extends React.Component {
    render() {
        return (
            <div>
                <NavBarComponent/>
            <h1>Success</h1>
            <Link to={"/dashboard"}>
                Dashboard
            </Link>
            </div>
        )
    }
}
