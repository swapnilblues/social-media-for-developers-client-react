import React from "react";

const ImageComponent = ({imageUrl}) => {
    return (
        <img style={{height : 130, width : 100}}
             src={imageUrl}
             alt="new"
        />
    )
}
export default ImageComponent
