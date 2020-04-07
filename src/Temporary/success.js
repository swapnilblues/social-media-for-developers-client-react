import React from "react";
export default class SuccessComponent extends React.Component {
    render() {
        return (
            <div>
            <h1>Success</h1>
                <h2>{this.props.email}</h2>
            </div>
        )
    }
}