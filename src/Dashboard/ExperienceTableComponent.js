import React from "react";

const ExperienceTableComponent = ({experiences}) =>
    <ul className="list-group">
        {
            experiences.map(experience =>
                               <h1>{experience.company}</h1>
            )
        }
    </ul>

export default ExperienceTableComponent
