import React, { useState } from 'react';

const ImageUploader = ({ buttonLabel, containerClassName }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  const openFileSelector = () => {
    // Simula el clic en el input de tipo file
    inputRef.current.click();
  };

  const inputRef = React.createRef();

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={openFileSelector}>
        {buttonLabel || 'Seleccionar Imagen'}
      </button>
      <div className={containerClassName || 'imagenContainer'}>
        {selectedImage && <img src={selectedImage} alt="Imagen seleccionada" />}
      </div>
    </div>
  );
};

export default ImageUploader;
