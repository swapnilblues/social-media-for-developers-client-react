import React from "react";
import DatePicker from "react-datepicker/es";
import {API_URL, LOCALHOST_URL} from "../common/constants";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class ExperienceTableComponent extends React.Component {

    state = {
        experiences: [],
        inputCompany: '',
        inputPosition: '',
        inputFrom: '',
        inputTo: '',
        edit: false
    }

    addExperience = () => {
        fetch(`${LOCALHOST_URL}/profile/experience`, {
            method: "PUT",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    company: this.state.inputCompany,
                    title: this.state.inputPosition,
                    from: this.state.inputFrom,
                    to: this.state.inputTo,
                    current: true
                }
            )
        })
            .then(response => {
                this.getExperience()
            })
    }

    deleteExperience = (eid) => {
        fetch(`${LOCALHOST_URL}/profile/experience/${eid}`, {
            method: "DELETE",
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.getExperience()
            })
    }

    componentDidMount = async () => {
        this.getExperience();
    }

    getExperience = () => {
        fetch(
            `${LOCALHOST_URL}/profile/me`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            }
        )
            .then(response => response.json())
            .then(results => this.setState({
                experiences: results.experience,
                inputCompany: '',
                inputPosition: '',
                inputFrom: '',
                inputTo: ''
            }))
    }

    changeEdit = () => {
        if (this.state.edit === false)
            this.setState({
                edit: true
            })
        else
            this.setState({
                edit: false
            })
    }

    render() {
        return (
            <div className="col">
                <div>
                <ul className="row">
                    <li className="col-lg-3">Company</li>
                    <li className="hide-sm col-lg-3">Title</li>
                    <li className="hide-sm col-lg-2">To</li>
                    <li className="hide-sm col-lg-2">From</li>
                </ul>
                </div>
                <tbody>
                {
                    this.state.experiences.map(experience =>

                        <tr key={experience._id}>
                            <td>
                                <Link to={`/dashboard/experience/${experience._id}`}>
                                    {experience.company}
                                </Link>
                            </td>
                            <td><Link to={`/dashboard/experience/${experience._id}`}>
                                {experience.title}
                            </Link>
                            </td>
                            <td className="hide-sm">
                                <Link to={`/dashboard/experience/${experience._id}`}>
                                    {experience.to}
                                </Link>
                            </td>
                            <td className="hide-sm">
                                <Link to={`/dashboard/experience/${experience._id}`}>
                                    {experience.from}
                                </Link>
                            </td>
                            {this.state.edit === false &&
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.changeEdit()}
                                >

                                    <i className="far fa-edit"
                                    > </i>
                                </button>
                            </td>
                            }
                            {this.state.edit === false &&
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteExperience(experience._id)}
                                >

                                    <i className="far fa-trash-alt"
                                    > </i>

                                </button>
                            </td>
                            }
                            {this.state.edit === true &&
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.changeEdit()}
                                >

                                    Save
                                </button>
                            </td>
                            }
                        </tr>

                    )
                }
                <tr>
                    <td>
                        <input
                            className="nav-item ml-auto form-control"
                            placeholder="Input Company Here"
                            onChange={async (e) =>
                                await this.setState({
                                        inputCompany: e.target.value
                                    }
                                )}
                            // onChange={}
                            value={this.state.inputCompany}
                        />
                    </td>
                    <td>
                        <input
                            className="nav-item ml-auto form-control"
                            placeholder="Input Title Here"
                            onChange={async (e) =>
                                await this.setState({
                                        inputPosition: e.target.value
                                    }
                                )}
                            value={this.state.inputPosition}
                        />
                    </td>
                    <td className="hide-sm">
                        <input
                            type="date"
                            className="nav-item ml-auto form-control"
                            placeholder="From..."
                            onChange={async (e) =>
                                await this.setState({
                                        inputFrom: e.target.value
                                    }
                                )}
                            value={this.state.inputFrom}
                        />
                    </td>
                    <td className="hide-sm">
                        <input
                            type="date"
                            className="nav-item ml-auto form-control"
                            placeholder="To"
                            onChange={async (e) =>
                                await this.setState({
                                        inputTo: e.target.value
                                    }
                                )}
                            value={this.state.inputTo}
                        />
                    </td>
                    <td>
                        <button
                            onClick={() => {
                                this.addExperience()
                            }
                            }
                            className="btn btn-danger">
                            <i className="fas fa-plus-circle fa-lg"> </i>
                            Add
                        </button>
                    </td>
                </tr>
                </tbody>
            </div>
        );
    }
}

export default ExperienceTableComponent
