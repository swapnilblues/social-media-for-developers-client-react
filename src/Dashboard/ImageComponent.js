import React from "react";
const ImageComponent = ({imageUrl}) => {
    return (
        <div>
            { imageUrl !== undefined && imageUrl !== "" &&
                <img style={{height: 150, width: 150}}
                     src={imageUrl}
                     alt="new"
                />
            }
        </div>
    )
}
export default ImageComponent