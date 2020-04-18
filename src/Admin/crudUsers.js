import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class CrudUsers extends React.Component {

    render() {
        return (
            <div className="container">
               CRUD Users
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => {
}
const dispatchToPropertyMapper = (dispatch) => {
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)
(CrudUsers)