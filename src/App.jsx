import { useState } from "react";
import ImageCompressed from "./ImageCompressed";
import compressed from "browser-image-compression";
import "./style.css";
function App() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgConverted,setImagConverted] = useState('');
  console.log("before compressed: ", image.size);
  const handleCompressed = async () => {
    setLoading(true);
    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    };
    // let url = URL.createObjectURL(image);
    const newImage = await compressed(image, options);
    console.log("after compressed: ", newImage.size);
    const converted = await imageConverted(newImage);
    console.log(converted);
    setImagConverted(converted)
    setLoading(false);
  };

  function imageConverted(img) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="App">
      <div className="img_compress">
        <h1>image compressor</h1>
        <div className="input">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={handleCompressed}>Compressed</button>
        </div>
        {loading && "loading"}
        <div className="img_compress_body">
          <ImageCompressed image={imgConverted} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

export default App;
