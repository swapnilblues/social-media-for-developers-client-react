import React from "react";
import NavBarComponent from "./NavBar/NavBarComponent";
import  bkg_image from '../images/landing-page-image.jpg'
import bkg_image_1 from '../images/person-holding-midnight-black-samsung-galaxy-s8-turn-on-near-1092671.jpg'

export default class LandingComponent extends React.Component {

    render() {
        return (
            <div>
                <NavBarComponent/>
                <div className={"landingContainer"}>
                <img src={bkg_image_1} className="img-fluid" alt="Logo"/>
                {/*<div className="center landing-main-div">*/}
                    {/*<h2 className="text-dark">*/}
                    {/*    <b style={{color:'white'}}>Welcome to GeeksHub</b>*/}
                    {/*</h2>*/}

                    {/*<h2 className="text-dark">*/}
                    {/*    <b><i>A Social Media for Developers</i></b>*/}
                    {/*</h2>*/}

                    {/*<button className="login-button btn-secondary btn-lg">Login</button>*/}
                    {/*<button className="register-button btn-secondary btn-lg">Register</button>*/}

                {/*</div>*/}
                </div>
            </div>
        )
    }
}
