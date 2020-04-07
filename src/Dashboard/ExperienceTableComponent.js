import React from "react";

class ExperienceTableComponent extends React.Component {

    state = {
        experiences: []
    }

    componentDidMount = async () => {
        fetch(
            `https://group-32-node-server.herokuapp.com/codebook/profile/user/5e838d60e3120a21983de85c`)
            .then(response => response.json())
            // .then(results => console.log(results.experience))
            .then(results => this.setState({
                                               experiences: results.experience
                                           }))
    }

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.experiences.map(experience =>
                                        <tr>
                                            <td>{experience.company}</td>
                                            <td>{experience.title}</td>
                                            <td className="hide-sm">
                                                {experience.from}
                                            </td>
                                            <td>
                                                <button className="btn btn-danger">
                                                    <i className="far fa-trash-alt"> </i>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                    )
                }
                <tr>
                    <td>
                        <input
                            className="nav-item ml-auto form-control"
                            placeholder="Input Company Here"
                            // onChange={}
                            // value={}
                        />
                    </td>
                    <td>
                        <input
                            className="nav-item ml-auto form-control"
                            placeholder="Input Title Here"
                            // onChange={}
                            // value={}
                        />
                    </td>
                    <td className="hide-sm">
                        <input
                            className="nav-item ml-auto form-control"
                            placeholder="From..."
                            // onChange={}
                            // value={}
                        />
                        <input
                            className="nav-item ml-auto form-control"
                            placeholder="To"
                            // onChange={}
                            // value={}
                        />
                    </td>
                    <td>
                        <button className="btn btn-danger">
                            <i className="fas fa-plus-circle fa-lg"> </i>
                            Add
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}


export default ExperienceTableComponent
