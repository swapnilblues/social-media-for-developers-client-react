import React from "react";
import {API_URL} from "../common/constants";

class ProfileImageComponent extends React.Component {

    state = {
        image: ''
    }

    componentDidMount() {
        this.getImageById(this.props.userId)
    }

    getImageById = () => {
        fetch(`${API_URL}/profile/user/${this.props.userId}`)
            .then(response => response.json())
            .then(res => this.setState({
                                           image: res.image
                                       }))
    }

    render() {
        return (
            <div>
                <img style={{height : 130, width : 100}}
                     src={this.state.image}
                     alt=''/>
            </div>
        )
    }
}

export default ProfileImageComponent
