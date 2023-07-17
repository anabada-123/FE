import { useState, useRef } from 'react';

const useImageHandler = () => {
    const [image, setImage] = useState(null);
    const [imgName, setImgName] = useState('');
    const imgRef = useRef();

    const MainImagehandler = (event) => {
        const file = event.target.files[0];
        const { name } = file;
        setImgName(name);
        imgRef.current = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    return {
        image,
        imgName,
        setImage,
        setImgName,
        imgRef,
        MainImagehandler,
    };
};

export default useImageHandler;
