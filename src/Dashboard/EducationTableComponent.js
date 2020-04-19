import React from "react";
import DatePicker from "react-datepicker/es";
import {API_URL} from "../common/constants";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class educationTableComponent extends React.Component {

    state = {
        educations: [],
        inputSchool: '',
        inputDegree: '',
        inputFrom: '',
        inputTo: '',
        inputDescription: '',
        current: false,

        updateSchool: '',
        updateDegree: '',
        updateFrom: '',
        updateTo: '',
        updateDescription: '',
        updateCurrent: false,


        edit: false,


    }

    addeducation = () => {
        fetch(`${API_URL}/profile/education`, {
            method: "PUT",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    school: this.state.inputSchool,
                    degree: this.state.inputDegree,
                    from: this.state.inputFrom,
                    to: !this.state.current ? this.state.inputTo : 'Present',
                    current: this.state.current,
                    description: this.state.inputDescription,
                    fieldofstudy: 'null'
                }
            )
        })
            .then(response => {
                this.geteducation()
            })
    }

    updateeducation = (educationId) => {
        fetch(`${API_URL}/profile/education/${educationId}`, {
            method: "PUT",
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    school: this.state.updateSchool,
                    degree: this.state.updateDegree,
                    from: this.state.updateFrom,
                    // to: !this.state.current ? this.state.inputTo : 'Present',
                    to: this.state.updateTo,
                    current: this.state.updateCurrent,
                    description: this.state.updateDescription,
                    fieldofstudy: 'null'
                }
            )
        })
            .then(response => {
                this.geteducation()
            })
    }

    deleteeducation = (eid) => {
        fetch(`${API_URL}/profile/education/${eid}`, {
            method: "DELETE",
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.geteducation()
            })
    }


    componentDidMount = async () => {
        this.geteducation();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.educationId !== this.props.educationId)
            this.geteducation()
    }

    geteducation = () => {
        fetch(
            `${API_URL}/profile/me`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            }
        )
            .then(response => response.json())
            .then(results => this.setState({
                educations: results.education,
                inputSchool: '',
                inputDegree: '',
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
                        {/*<ul className="row education-ul">*/}
                        <div className="col-lg-2">School</div>
                        <div className="hide-sm col-lg-2">Degree and Field of Study</div>
                        <div className="hide-sm col-lg-2">Description</div>
                        <div className="hide-sm col-lg-2">From</div>
                        <div className="hide-sm col-lg-2">To</div>
                        {/*</ul>*/}
                    </div>
                </div>
                {/*<tbody>*/}
                {
                    this.state.educations&&this.state.educations.map(education =>
                        <Link to={`/dashboard/education/${education._id}`}>


                            {
                                console.log("Old Eid", this.props.educationId + " AA ", education._id)
                            }

                            {
                                this.state.edit === true && this.props.educationId === education._id &&

                                <div className="list-group-item active">
                                    <div className="container row" key={education._id}>
                                        <div className="col-lg-2">

                                            <input
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input School Here"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            updateSchool: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.updateSchool}
                                            />

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            <input
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input Degree Here"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            updateDegree: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.updateDegree}
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
                                                            updateDescription: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.updateDescription}
                                            />

                                        </div>

                                        <div className="hide-sm col-lg-2">

                                            <input
                                                type="date"
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input From Date"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            updateFrom: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.updateFrom}
                                            />

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {this.state.updateTo !== 'Present' &&
                                            <input
                                                type="date"
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input To Date"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            updateTo: n
                                                        }
                                                    )
                                                }}
                                                value={this.state.updateTo}
                                            />
                                            }
                                            {this.state.updateTo === 'Present' &&
                                            <input
                                                className="nav-item ml-auto form-control"
                                                placeholder="Input To Date"
                                                onChange={async (e) => {
                                                    const n = e.target.value;
                                                    await this.setState({
                                                            ...this.state,
                                                            updateTo: n
                                                        }
                                                    )
                                                }}
                                                readOnly={"true"}
                                                disabled={"true"}
                                                value={this.state.updateTo}
                                            />
                                            }

                                        </div>
                                        <div className="hide-sm col-lg-2">
                                            <button
                                                className="btn btn-danger"
                                                onClick={async () => {
                                                    await this.changeEdit()
                                                    await this.updateeducation(education._id)

                                                }}
                                            >

                                                Save
                                            </button>
                                        </div>

                                    </div>
                                </div>


                            }

                            {

                                this.state.edit === false && this.props.educationId === education._id &&


                                <div>
                                    <div className="list-group-item active">
                                        <div className="container row" key={education._id}>
                                            <div className="col-lg-2">

                                                {education.school}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {education.degree}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {education.description}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {education.from}

                                            </div>
                                            <div className="hide-sm col-lg-2">

                                                {education.to}

                                            </div>


                                            <div className="hide-sm col-lg-2">
                                                <button
                                                    className="btn btn-danger edit-button"
                                                    onClick={async () => {
                                                        await this.setState({
                                                            updateSchool: education.school,
                                                            updateDegree: education.degree,
                                                            updateDescription: education.description,
                                                            updateTo: education.to,
                                                            updateFrom: education.from,
                                                            updateCurrent: education.current
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
                                                    onClick={() => this.deleteeducation(education._id)}
                                                >

                                                    <i className="far fa-trash-alt"> </i>

                                                </button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                this.props.educationId !== education._id &&

                                <div className="list-group-item"
                                     onClick={() => {
                                         this.setState({
                                             edit: false
                                         })
                                     }}
                                >
                                    <div className="container row" key={education._id}>
                                        <div className="col-lg-2">

                                            {education.school}

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {education.degree}

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {education.description}

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {education.from}

                                        </div>
                                        <div className="hide-sm col-lg-2">

                                            {education.to}

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
                                placeholder="Input School Here"
                                onChange={async (e) =>
                                    await this.setState({
                                            inputSchool: e.target.value
                                        }
                                    )}
                                value={this.state.inputSchool}
                            />
                        </div>
                        <div className="col-lg-2">
                            <input
                                className="nav-item ml-auto form-control"
                                placeholder="Input Degree Here"
                                onChange={async (e) =>
                                    await this.setState({
                                            inputDegree: e.target.value
                                        }
                                    )}
                                value={this.state.inputDegree}
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
                                    this.addeducation()
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

export default educationTableComponent
