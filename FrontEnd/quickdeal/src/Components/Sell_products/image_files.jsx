
// export default ImageInput;
import React, { useState } from 'react';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
        <img
          src={URL.createObjectURL(image)}
          alt={`Image ${index + 1}`}
          style={{ maxWidth: '150px', maxHeight: '150px' }}
        />
        <br />
        <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
      </div>
    ));
  };

//   const handleAddImageField = () => {
//     if (images.length < 5) {
//       setImages([...images, null]);
//     }
//   };

  return (
    <div>
      {renderImages()}
      {images.length < 5 && (
        <div>
          <label htmlFor="addImage">Add Image:</label>
          <input
            type="file"
            accept="image/*"
            id="addImage"
            onChange={(event) => handleImageChange(images.length, event)}
          />
        </div>
      )}
      {/* <button type="button" onClick={handleAddImageField}>Add Image Field</button> */}
    </div>
  );
};

export default ImageUpload;

