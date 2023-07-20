import React, { useRef, useState } from 'react';
import useInput from '../hooks/useInput';
import { useQueryClient, useMutation } from 'react-query';
import { addTradingItems } from '../api/tradingItems';
import { useNavigate } from 'react-router-dom';
import ProductSubmitForm from '../components/ProductSubmitForm';
import useImageHandler from '../hooks/useImageHandler';
import Modal, { IntentCheckModel } from '../components/common/Modal';
// [ ]스타일과 기능 분리 필요
// [ ]재사용 컴포넌트 분리 필요

const ProductCreateContainer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenIntentCheck, setIsOpenIntentCheck] = useState(false);
    const [massage, setMassage] = useState('');
    const openModal = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const openModalIntentCheck = () => {
        setIsOpenIntentCheck(true);
    };
    const handleIntentCheck = () => {
        setIsOpenIntentCheck(false);
        nav('/');
    };

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
    };

    // 트레이드 아이템 등록
    const queryClient = useQueryClient();

    const mutation = useMutation(addTradingItems, {
        onSuccess: (msg) => {
            if (msg === '상품등록을 성공했습니다') {
                setMassage(msg);
                openModalIntentCheck();
            }
            if (msg === '상품등록을 실패했습니다') {
                setMassage(msg);
                openModal();
            }
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
            setMassage(emptyFields.join(', ') + '을(를) 입력해주세요');
            openModal();
            return;
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
        // console.log(items);
        // for (let value of formData.values()) {
        //     console.log(value);
        // }

        await mutation.mutateAsync(formData);
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
            <Modal isOpen={isOpen} handleClose={handleClose}>
                {massage && massage}
            </Modal>
            <IntentCheckModel
                isOpenIntentCheck={isOpenIntentCheck}
                onClickEvent={handleIntentCheck}
            >
                {massage && massage}
            </IntentCheckModel>
        </>
    );
};

export default ProductCreateContainer;
