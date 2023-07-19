import React, { useRef, useState } from 'react';
import useInput from '../hooks/useInput';
import { useQueryClient, useMutation } from 'react-query';
import { addTradingItems } from '../api/tradingItems';
import { useNavigate } from 'react-router-dom';

import ProductSubmitForm from '../components/ProductSubmitForm';
import useImageHandler from '../hooks/useImageHandler';

// [ ]스타일과 기능 분리 필요
// [ ]재사용 컴포넌트 분리 필요

const ProductCreateContainer = () => {
    //텍스트
    const [title, setTitle, onChangeTitle] = useInput();
    const [productOneDesc, setProductOneDesc, onChangeProductOneDesc] = useInput();
    const [productDesc, setProductDesc, onChangeProductDesc] = useInput();
    const [tradeItem, setTradeItem, onChangeTradeItem] = useInput();
    const [location, setLocation, onChangeLocation] = useInput();
    const [cate, setCate, onChangeCate] = useInput('기타');

    //이미지
    // const [image, setImage] = useState(null);
    // const [imgName, setImgName] = useState('');
    // const [imgFile, setImgFile] = useState('');
    // const [image, setImage] = useState(null);
    const [multipleImage, setMultipleImage] = useState('');
    // const [imgName, setImgName] = useState('');
    const [multipleImgName, setMultipleImgName] = useState([]);
    // const imgRef = useRef();
    const multipleImgRef = useRef();

    const nav = useNavigate();
    const fileReaders = [];
    const fileNames = [];
    //이미지 업로드 시 미리보기

    const { image, setImage, imgName, setImgName, imgRef, MainImagehandler } = useImageHandler();

    // 대표 이미지 지정
    // const MainImagehandler = (event) => {
    //     const file = event.target.files[0];
    //     const { name } = file;
    //     setImgName(name);
    //     imgRef.current = file;
    //     // fileReaders.push(file);
    //     // fileNames.push(name);
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //         // setMultipleImage([reader.result]);
    //     };
    // };

    //이미지 리스트 등록
    const MultipleImageHander = (event) => {
        const files = event.target.files;
        const selectedFiles = Array.from(files);

        if (selectedFiles.length > 4) {
            return alert('이미지는 최대 4장 등록할 수 있습니다.');
        }

        multipleImgRef.current = selectedFiles;

        const fileReaders = [];
        const fileNames = [];

        // 첫 번째 이미지는 단일 이미지 미리보기로 유지
        if (selectedFiles.length > 0) {
            const firstFile = selectedFiles[0];
            // imgRef.current = firstFile;
            const firstReader = new FileReader();
            firstReader.readAsDataURL(firstFile);
            firstReader.onloadend = () => {
                setImage(firstReader.result);
                setImgName(firstFile.name);
            };
        }

        selectedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const imageDataURL = reader.result;
                fileReaders.push(imageDataURL);
                fileNames.push(file.name);
                if (fileReaders.length === selectedFiles.length) {
                    setMultipleImage(fileReaders);
                    setMultipleImgName(fileNames);
                }
            };
        });
    };

    //이미지 클릭시 대표이미지 수정
    const onClickImageHandler = (imageDataURL, idx) => {
        setImage(imageDataURL);
        setImgName(multipleImgName[idx]);
        // imgRef.current = multipleImgRef.current[idx];
    };
    // console.log(multipleImgName);
    // 트레이드 아이템 등록
    const queryClient = useQueryClient();

    const mutation = useMutation(addTradingItems, {
        onSuccess: () => {
            queryClient.invalidateQueries('tradingItem');
        },
    });

    const ProductRegSubmitHandler = async (e) => {
        e.preventDefault();

        const multipleImg = multipleImgRef.current;

        let emptyFields = [];
        if (!title) {
            emptyFields.push('제목');
        }

        if (!productOneDesc) {
            emptyFields.push('한 줄 설명');
        }

        if (!tradeItem) {
            emptyFields.push('교환 희망 물품');
        }

        if (!location) {
            emptyFields.push('교환 희망 장소');
        }

        if (!productDesc) {
            emptyFields.push('상세내용');
        }
        if (!multipleImage) {
            emptyFields.push('이미지');
        }

        if (emptyFields.length > 0) {
            return alert(emptyFields.join(', ') + '을(를) 입력해주세요');
        }

        const items = {
            itemName: title,
            itemContent: productDesc,
            itemOneContent: productOneDesc,
            tradingItem: tradeItem,
            tradingPosition: location,
            cate: cate,
            mainImgName: imgName,
        };

        const formData = new FormData();

        formData.append(
            'item',
            new Blob([JSON.stringify(items)], {
                type: 'application/json',
            })
        );

        multipleImg &&
            multipleImg.forEach((file) => {
                formData.append(`img`, file);
            });
        console.log(items);
        for (let value of formData.values()) {
            console.log(value);
        }

        await mutation.mutateAsync(formData);

        nav('/');
        setTitle('');
        setProductOneDesc('');
        setProductDesc('');
        setTradeItem('');
        setTradeItem('');
        setLocation('');
    };
    return (
        <>
            <ProductSubmitForm
                ProductRegSubmitHandler={ProductRegSubmitHandler}
                image={image}
                multipleImage={multipleImage}
                onClickImageHandler={onClickImageHandler}
                multipleImgName={multipleImgName}
                MultipleImageHander={MultipleImageHander}
                // imgRef={imgRef}
                imgName={imgName}
                MainImagehandler={MainImagehandler}
                title={title}
                onChangeTitle={onChangeTitle}
                productOneDesc={productOneDesc}
                onChangeProductOneDesc={onChangeProductOneDesc}
                tradeItem={tradeItem}
                onChangeTradeItem={onChangeTradeItem}
                location={location}
                onChangeLocation={onChangeLocation}
                productDesc={productDesc}
                onChangeProductDesc={onChangeProductDesc}
                nav={nav}
            />
        </>
        // <ProductForm
        //     onSubmit={ProductRegSubmitHandler}
        //     name="product_reg_form"
        //     encType="multipart/form-data"
        // >
        //     <ImgBox>
        //         <ProductThumbnail>
        //             <span className="preview-img-title">대표 이미지</span>
        //             {image ? (
        //                 <img src={image} alt="thumbnail_image" />
        //             ) : (
        //                 <NoneImg>
        //                     <BsCardImage size={50} color={'#777'} />
        //                     <p>미리보기 이미지가 없습니다</p>
        //                 </NoneImg>
        //             )}
        //         </ProductThumbnail>
        //         <ProductImgs>
        //             {multipleImage ? (
        //                 multipleImage.map((img, idx) => {
        //                     return (
        //                         <img
        //                             key={idx}
        //                             src={img}
        //                             alt={`images-${idx}`}
        //                             onClick={() => onClickImageHandler(img, idx)}
        //                         />
        //                     );
        //                 })
        //             ) : (
        //                 <NoneImg className="multiple">
        //                     <BsCardImage size={30} color={'#777'} />
        //                     {/* <p>미리보기 이미지가 없습니다</p> */}
        //                 </NoneImg>
        //             )}
        //         </ProductImgs>
        //     </ImgBox>
        //     <div className="core">
        //         <InputFile
        //             label={'이미지'}
        //             accept="image/*"
        //             $idName={'info-imgs'}
        //             $value={multipleImgName.join(',')}
        //             onChange={MultipleImageHander}
        //             $coreValue={imgRef.current ? false : true}
        //             multiple
        //         />
        //         <InputFile
        //             label={'대표이미지 지정'}
        //             accept="image/*"
        //             $idName={'info-img'}
        //             $value={imgName}
        //             onChange={MainImagehandler}
        //         />
        //         <Input
        //             label={'제목'}
        //             type={'text'}
        //             value={title}
        //             onChange={onChangeTitle}
        //             placeholder="제목을 입력해주세요"
        //             $coreValue={title ? false : true}
        //         />
        //         <Textarea
        //             label={'상품 한 줄 설명'}
        //             type={'text'}
        //             value={productOneDesc}
        //             onChange={onChangeProductOneDesc}
        //             placeholder="교환 물품에 대한 한 줄 설명을 해주세요"
        //             $coreValue={productOneDesc ? false : true}
        //         />
        //         <Textarea
        //             label={'교환 희망 물품'}
        //             type={'text'}
        //             value={tradeItem}
        //             onChange={onChangeTradeItem}
        //             placeholder="어떤 물품이랑 교환하실 건가요?"
        //             $coreValue={tradeItem ? false : true}
        //         />
        //         <Textarea
        //             label={'희망 장소'}
        //             type={'text'}
        //             value={location}
        //             onChange={onChangeLocation}
        //             placeholder="어디서 교환하실 건가요"
        //             $coreValue={location ? false : true}
        //         />
        //     </div>
        //     <div className="sub">
        //         <Textarea
        //             label={'상세한 내용을 적어주세요'}
        //             type={'text'}
        //             value={productDesc}
        //             onChange={onChangeProductDesc}
        //             $heigth={'600px'}
        //             $padding={'50px'}
        //             placeholder="상세한 내용을 적어주세요"
        //             $coreValue={productDesc ? false : true}
        //             $center
        //         />
        //     </div>
        //     <Button.Secondary onClick={() => nav('/')}>등록 취소하기</Button.Secondary>
        //     <Button.Primary>상품 등록하기</Button.Primary>
        // </ProductForm>
    );
};

export default ProductCreateContainer;
