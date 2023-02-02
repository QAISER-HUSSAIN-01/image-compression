import React from "react";

function ImageCompressed({ image,loading }) {
  return <>{image ? <img src={image} alt="compressed image output" /> : loading ? <p>loading</p> : <p>no item</p> }</>;
}

export default ImageCompressed;
