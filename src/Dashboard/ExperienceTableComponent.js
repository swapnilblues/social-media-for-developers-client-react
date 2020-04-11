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
        inputDescription: '',
        current: false,

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
                    to: !this.state.current ? this.state.inputTo : 'Present',
                    current: this.state.current,
                    description: this.state.inputDescription
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
                inputDescription: '',
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
                    <div className="container row">
                        {/*<ul className="row experience-ul">*/}
                        <div className="col-lg-2">Company</div>
                        <div className="hide-sm col-lg-2">Title</div>
                        <div className="hide-sm col-lg-2">Description</div>
                        <div className="hide-sm col-lg-2">From</div>
                        <div className="hide-sm col-lg-2">To</div>
                        {/*</ul>*/}
                    </div>
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
                                        <div className="col-lg-2">

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
                                        <div className="hide-sm col-lg-2">

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

                                            <textarea
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input Description Here"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            inputDescription: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.inputDescription}
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
                                        <div className="hide-sm col-lg-2">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => this.changeEdit()}
                                            >

                                                Save
                                            </button>
                                        </div>

                                    </div>
                                </div>


                            }

                            {

                                this.state.edit === false && this.props.experienceId === experience._id &&


                                <div>
                                    <div className="list-group-item active">
                                        <div className="container row" key={experience._id}>
                                            <div className="col-lg-2">

                                                {experience.company}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {experience.title}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {experience.description}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {experience.from}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {experience.to}

                                            </div>


                                            <div className="hide-sm col-lg-2">
                                                <button
                                                    className="btn btn-danger edit-button"
                                                    onClick={async () => {
                                                        await this.setState({
                                                            inputCompany: experience.company,
                                                            inputTitle: experience.title,
                                                            inputDescription: experience.description,
                                                            inputTo: experience.to,
                                                            inputFrom: experience.from
                                                        })
                                                        await this.changeEdit()
                                                    }
                                                    }
                                                >

                                                    <i className="far fa-edit"
                                                    > </i>
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => this.deleteExperience(experience._id)}
                                                >

                                                    <i className="far fa-trash-alt"> </i>

                                                </button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                this.props.experienceId !== experience._id &&

                                <div className="list-group-item"
                                    onClick={() => {
                                        this.setState({
                                            edit: false
                                        })
                                    }}
                                >
                                    <div className="container row" key={experience._id}>
                                        <div className="col-lg-2">

                                            {experience.company}

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {experience.title}

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {experience.description}

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

                <br/>
                <div className="list-group-item">
                    <div className="container row">
                        <div className="col-lg-2">
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
                        </div>
                        <div className="col-lg-2">
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
                        </div>
                        <div className="col-lg-2">
                            <textarea
                                className="nav-item ml-auto form-control"
                                placeholder="Input Description Here"
                                onChange={async (e) =>
                                    await this.setState({
                                            inputDescription: e.target.value
                                        }
                                    )}
                                value={this.state.inputDescription}
                            />
                        </div>
                        <div className="col-lg-2">
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
                        </div>
                        <div className="col-lg-2">
                            {this.state.current &&
                            <input
                                value={"Present"}
                                readOnly={"true"}
                                disabled={"true"}
                            />
                            }
                            {!this.state.current &&
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
                            }
                        </div>
                        <div className="col-lg-1">

                            <input
                                type="checkbox"
                                onChange={async (e) =>
                                    await this.setState({
                                        current: !this.state.current
                                    })
                                }

                                id="vehicle1" name="vehicle1"
                                value={this.state.current}/>

                            <label htmlFor="vehicle1"> Ongoing</label>
                        </div>
                        <div className="col-lg-1">
                            <button
                                onClick={() => {
                                    this.addExperience()
                                }
                                }
                                className="btn btn-danger">
                                <i className="fas fa-plus-circle fa-lg"> </i>

                            </button>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default ExperienceTableComponent