// import { useState, useRef } from 'react';

// const useMultipleImageHandler = () => {
//   const [multipleImage, setMultipleImage] = useState([]);
//   const [multipleImgName, setMultipleImgName] = useState([]);
//   const multipleImgRef = useRef();

//   const handleMultipleImage = (event) => {
//     const files = event.target.files;
//     const selectedFiles = Array.from(files);

//     if (selectedFiles.length > 4) {
//       return alert('이미지는 최대 4장 등록할 수 있습니다.');
//     }

//     multipleImgRef.current = selectedFiles;

//     const fileReaders = [];
//     const fileNames = [];

//     // 첫 번째 이미지는 단일 이미지 미리보기로 유지
//     if (selectedFiles.length > 0) {
//       const firstFile = selectedFiles[0];
//       imgRef.current = firstFile;
//       const firstReader = new FileReader();
//       firstReader.readAsDataURL(firstFile);
//       firstReader.onloadend = () => {
//         setImage(firstReader.result);
//         setImgName(firstFile.name);
//       };
//     }

//     selectedFiles.forEach((file) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         const imageDataURL = reader.result;
//         fileReaders.push(imageDataURL);
//         fileNames.push(file.name);
//         if (fileReaders.length === selectedFiles.length) {
//           setMultipleImage(fileReaders);
//           setMultipleImgName(fileNames);
//         }
//       };
//     });
//   };

//   return {
//     multipleImage,
//     multipleImgName,
//     multipleImgRef,
//     handleMultipleImage,
//   };
// };

// export default useMultipleImageHandler;
