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

        currentCompany: '',
        currentPosition: '',
        currentFrom: '',
        currentTo: '',

        edit: false,


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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.experienceId !== this.props.experienceId)
            this.getExperience()
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
            <div className="col list-group">
                <div className="list-group-item">
                    <ul className="row experience-ul">
                        <li className="col-lg-3">Company</li>
                        <li className="hide-sm col-lg-3">Title</li>
                        <li className="hide-sm col-lg-2">From</li>
                        <li className="hide-sm col-lg-2">To</li>
                    </ul>
                </div>
                {/*<tbody>*/}
                {
                    this.state.experiences.map(experience =>
                        <Link to={`/dashboard/experience/${experience._id}`}>

                            {
                                console.log("Old Eid", this.props.experienceId + " AA ", experience._id)
                            }

                            {
                                this.state.edit === true && this.props.experienceId === experience._id &&

                                <div className="list-group-item active">
                                    <div className="container row" key={experience._id}>
                                        <div className="col-lg-3">

                                            <input
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input Company Here"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            inputCompany: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.inputCompany}
                                            />

                                        </div>
                                        <div className="hide-sm col-lg-3">

                                            <input
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input Title Here"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            inputTitle: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.inputTitle}
                                            />

                                        </div>

                                        <div className="hide-sm col-lg-2">

                                            <input
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input From Date"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            inputFrom: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.inputFrom}
                                            />

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            <input
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input To Date"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            inputTo: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.inputTo}
                                            />

                                        </div>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => this.changeEdit()}
                                            >

                                                Save
                                            </button>
                                        </td>

                                    </div>
                                </div>


                            }

                            {

                                this.state.edit === false && this.props.experienceId === experience._id &&


                                <div>
                                    <div className="list-group-item active">
                                        <div className="container row" key={experience._id}>
                                            <div className="col-lg-3">

                                                {experience.company}

                                            </div>
                                            <div className="hide-sm col-lg-3">

                                                {experience.title}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {experience.from}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {experience.to}

                                            </div>

                                            {this.state.edit === false &&
                                            <div className="hide-sm col-lg-2">
                                                <button
                                                    className="btn btn-danger edit-button"
                                                    onClick={() => this.changeEdit()}
                                                >

                                                    <i className="far fa-edit"
                                                    > </i>
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => this.deleteExperience(experience._id)}
                                                >

                                                    <i className="far fa-trash-alt"
                                                    > </i>

                                                </button>
                                            </div>
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
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                this.props.experienceId !== experience._id &&

                                <div className="list-group-item">
                                    <div className="container row" key={experience._id}>
                                        <div className="col-lg-3">

                                            {experience.company}

                                        </div>
                                        <div className="hide-sm col-lg-3">

                                            {experience.title}

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {experience.from}

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {experience.to}

                                        </div>


                                    </div>
                                </div>
                            }


                        </Link>
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
            </div>
        );
    }
}

export default ExperienceTableComponent
