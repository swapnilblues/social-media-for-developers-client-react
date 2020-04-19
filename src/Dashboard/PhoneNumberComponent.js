import React from "react";
import DatePicker from "react-datepicker/es";
import {API_URL} from "../common/constants";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import MaskedInput from "react-text-mask/dist/reactTextMask";


class phoneNumberComponent extends React.Component {

    state = {
        phoneNumber: '',
        dashboardToken: '',
        edit: false,
        p: ''
    }

    addPhoneNumber = () => {
        if(this.state.phoneNumber === null) {
            alert("Enter correct format phone number");
            this.setState({
                phoneNumber: null
            })

        }
        else if(this.unFormatPhoneNumber(this.state.phoneNumber).length < 10) {
            alert("Enter correct format phone number");
            this.setState({
                phoneNumber: null
            })

        }
        else {
            fetch(`${API_URL}/profile/phone`, {
                method: "POST",
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        phone: this.unFormatPhoneNumber(this.state.phoneNumber)
                    }
                )
            }).then(() => this.getPhoneNumber())
        }
    }

    formatPhoneNumber = (phoneNumberString) => {
        console.log("AA",phoneNumberString)
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }


    unFormatPhoneNumber = (phoneNumberString) => {
        var p = '';
        if(phoneNumberString.length===10){
            p=phoneNumberString;
        }
        else {
            var j = 0;
            for (j = 0; j < phoneNumberString.length; j++) {
                var char = phoneNumberString.charAt(j);
                if(char>='0' && char<='9'){
                    p+=phoneNumberString.charAt(j);
                }
            }
        }
         console.log("BB",p);
        return p;
    }

    deletePhoneNumber = () => {
        fetch(`${API_URL}/profile/phone`, {
            method: "DELETE",
            headers: {
                'x-auth-token': this.state.dashboardToken,
                'content-type': 'application/json'
            }
        })
            .then( () => {
                 this.getPhoneNumber()
            })

    }


    componentDidMount = async () => {
        // this.unFormatPhoneNumber('(666) 555-4454')
        await this.setState({
            dashboardToken: localStorage.getItem('token')
        })
        await this.getPhoneNumber();
    }


    getPhoneNumber = () => {
        fetch(
            `${API_URL}/profile/me`, {
                headers: {
                    'x-auth-token': this.state.dashboardToken
                }
            }
        )
            .then(response => response.json())
            .then(results => this.setState({
                phoneNumber: results.phone !== "" ? results.phone: null
            }))
            .then(() => this.setState({
                p: this.formatPhoneNumber(this.state.phoneNumber)
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
            // <div>
            //     {this.state.phoneNumber}
            // </div>


            <div>
                {this.state.edit === false &&
                <div className="col list-group">
                    <div className="list-group-item">
                        <div className="container row">
                            {!this.state.phoneNumber &&
                            <div className="col-lg-2"><i>No Phone Number Given</i></div>
                            }
                            {this.state.phoneNumber &&

                            <div className="col-lg-2">

                                <i>{this.state.p}</i>
                            </div>
                            }

                            <div className="col-lg-2">
                                {!this.state.phoneNumber &&
                                <button
                                    onClick={() => {
                                        this.setState({
                                            edit: true
                                        })
                                    }
                                    }
                                    className="btn btn-danger">
                                    Add Phone Number
                                </button>
                                }
                                {this.state.phoneNumber &&
                                <button
                                    onClick={() => {
                                        this.setState({
                                            edit: true
                                        })
                                    }
                                    }
                                    className="btn btn-danger">
                                    Edit Phone Number
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                }
                {this.state.edit === true &&
                <div className="list-group-item">
                    <div className="container row">
                        <div className="col-lg-2">
                            <MaskedInput
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                guide
                                showMasked

                                className="nav-item ml-auto form-control"

                                onChange={async (e) =>
                                    await this.setState({
                                            phoneNumber: e.target.value,
                                        }
                                    )}
                                value={this.state.phoneNumber}
                            />

                            {/*<MaskedInput*/}
                            {/*    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}*/}
                            {/*    guide*/}
                            {/*    */}
                            {/*    value={this.state.phoneNumber}*/}
                            {/*/>*/}

                        </div>


                        <div className="col-lg-1">
                            <button
                                onClick={async () => {
                                    await this.setState({
                                        edit: false
                                    })
                                    await this.addPhoneNumber()
                                }
                                }
                                className="btn btn-danger">
                                Save

                            </button>
                        </div>

                        <div className="col-lg-1">
                            <button
                                onClick={async () => {
                                    await this.setState({
                                        edit: false
                                    })
                                    await this.deletePhoneNumber()
                                }
                                }
                                className="btn btn-danger">
                                Delete

                            </button>
                        </div>
                        {/*<div className="col-lg-1">*/}
                        {/*    <button*/}
                        {/*        onClick={async () => {*/}
                        {/*            await this.setState({*/}
                        {/*                edit: false*/}
                        {/*            })*/}
                        {/*            await this.deletephoneNumber()*/}
                        {/*        }*/}
                        {/*        }*/}
                        {/*        className="btn btn-danger"*/}
                        {/*    >*/}
                        {/*        Delete*/}
                        {/*    </button>*/}


                        {/*</div>*/}


                    </div>
                </div>
                }
            </div>


        );
    }
}

export default phoneNumberComponent