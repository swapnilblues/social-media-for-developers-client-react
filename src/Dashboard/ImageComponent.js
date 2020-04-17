import React from "react";

const ImageComponent = ({imageUrl}) => {
    return (
            <img style={{height : 150, width : 150}}
                src={imageUrl}
                alt="new"
            />
    )
}

export default ImageComponent


