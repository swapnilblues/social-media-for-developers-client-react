import React from "react";
import DatePicker from "react-datepicker/es";
import {API_URL, LOCALHOST_URL} from "../common/constants";
import {connect} from "react-redux";

class ExperienceTableComponent extends React.Component {

    state = {
        experiences: [],
        inputCompany: '',
        inputPosition: '',
        inputFrom: '',
        inputTo: ''
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
            .then(response=> {
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
                                               experiences: results.experience
                                           }))
    }

    render() {
        return (
            <table className="table">
                {this.props.user._id}
                {this.props.user.name}
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
                    this.state.experiences !== undefined
                    && this.state.experiences.map(experience =>
                                                      <tr key={experience._id}>
                                                          <td>{experience.company}</td>
                                                          <td>{experience.title}</td>
                                                          <td className="hide-sm">
                                                              {experience.from}
                                                          </td>
                                                          <td>
                                                              <button
                                                                  className="btn btn-danger">
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
                            onChange={async (e) =>
                                await this.setState({
                                                        inputCompany: e.target.value
                                                    }
                                )}
                            // onChange={}
                            // value={}
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
                            // value={}
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
                            // value={}
                        />
                        <input
                            type="date"
                            className="nav-item ml-auto form-control"
                            placeholder="To"
                            onChange={async (e) =>
                                await this.setState({
                                                        inputTo: e.target.value
                                                    }
                                )}
                            // onChange={}
                            // value={}
                        />
                    </td>
                    <td>
                        <button
                            onClick={ () => {
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
            </table>
        );
    }
}

export default ExperienceTableComponent
