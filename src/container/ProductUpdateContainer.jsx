import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import Input, { InputFile } from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button/Button';
import ToggleButton from '../components/common/Button/ToggleButton';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { updateTradingItem, getTradingItem } from '../api/tradingItem';
import {
    ImgBox,
    ProductThumbnail,
    ProductImgs,
    ProductForm,
    NoneImg,
    ToggleIsSale,
} from '../components/ProductSubmitFormStyle';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BsCardImage } from 'react-icons/bs';
import Modal, { IntentCheckModel } from '../components/common/Modal';

const ProductUpdateContainer = () => {
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

    const [title, setTitle, onChangeTitle] = useInput();
    const [productOneDesc, setProductOneDesc, onChangeProductOneDesc] = useInput();
    const [productDesc, setProductDesc, onChangeProductDesc] = useInput();
    const [tradeItem, setTradeItem, onChangeTradeItem] = useInput();
    const [location, setLocation, onChangeLocation] = useInput();
    const [cate, setCate, onChangeCate] = useInput('기타');
    const [isSale, setIsSale] = useState(true);
    //이미지
    const [image, setImage] = useState('');
    const [multipleImage, setMultipleImage] = useState([]);
    const [imgName, setImgName] = useState('');
    const [multipleImgName, setMultipleImgName] = useState([]);
    const imgRef = useRef();
    const multipleImgRef = useRef();

    const [existingImgListName, setExistingImgListName] = useState([]);

    const { id } = useParams();
    const nav = useNavigate();
    // const { isLoading, error, item } = useSelector((state) => {
    //     return state.item;
    // });

    const { data } = useQuery('tradingItem', () => getTradingItem(id));

    const imgListNameExtraction = (imgList, mainImg) => {
        let imgListName = [];
        const mainimgName = mainImg.split('/').pop();
        imgList.forEach((item) => {
            imgListName.push(item.split('/').pop());
        });
        setImgName(mainimgName);
        setExistingImgListName(imgListName);
        setMultipleImgName(imgListName);
    };

    useEffect(() => {
        if (data) {
            setTitle(data.itemName);
            setProductOneDesc(data.itemOneContent);
            setProductDesc(data.itemContent);
            setTradeItem(data.tradingItem);
            setLocation(data.tradingPosition);
            setImage(data.img);
            setMultipleImage(data.imgList);
            imgListNameExtraction(data.imgList, data.img);
        }

        // }
    }, [data]);

    //이미지 업로드 시 미리보기
    // const ImageChangehandler = (event) => {
    //     const file = event.target.files[0];
    //     const { name } = file;
    //     setImgName(name);
    //     // imgRef.current = file;
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //     };
    // };

    const MultipleImageHander = (event) => {
        const files = event.target.files;
        const selectedFiles = Array.from(files);
        const currentFilesNum = multipleImgName.length + selectedFiles.length;
        const fileReaders = [];
        const fileNames = [];
        console.log(currentFilesNum);

        if (currentFilesNum > 4) {
            return alert('이미지는 최대 4장 등록할 수 있습니다.');
        }

        multipleImgRef.current = selectedFiles;

        // 첫 번째 이미지는 단일 이미지 미리보기로 유지
        if (selectedFiles.length > 0) {
            const firstFile = selectedFiles[0];
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
                    setMultipleImage((prevImgList) => [...prevImgList, ...fileReaders]);
                    setMultipleImgName((prevImgName) => [...prevImgName, ...fileNames]);
                }
            };
        });
    };

    const onClickImageHandler = (imageDataURL, idx) => {
        setImage(imageDataURL);
        setImgName(multipleImgName[idx]);
    };
    // 트레이드 아이템 등록
    const queryClient = useQueryClient();
    const mutation = useMutation((formData) => updateTradingItem(id, formData), {
        onSuccess: (msg) => {
            if (msg === '상품등록을 수정했습니다') {
                setMassage(msg);
                openModalIntentCheck();
            }
            if (msg === '상품등록 수정을 실패했습니다') {
                setMassage(msg);
                openModal();
            }
            queryClient.invalidateQueries('tradingItem');
        },
    });

    const ProductRegSubmitHandler = async (e) => {
        e.preventDefault();
        const multipleImg = multipleImgRef.current;
        const items = {
            itemName: title,
            itemContent: productDesc,
            itemOneContent: productOneDesc,
            tradingItem: tradeItem,
            tradingPosition: location,
            cate: cate,
            status: '판매완료',
            mainImgName: imgName,
        };
        const formData = new FormData();

        if (!multipleImg) {
            items.imgNameList = existingImgListName;
        } else {
            items.imgNameList = existingImgListName;
            multipleImg.forEach((file) => {
                formData.append(`img`, file);
            });
        }

        formData.append(
            'item',
            new Blob([JSON.stringify(items)], {
                type: 'application/json',
            })
        );

        await mutation.mutateAsync(formData);

        // formData 콘솔 확인하기
        // for (let value of formData.values()) {
        //     console.log(value);
        // }
    };

    const onClickIsSale = (e) => {
        e.preventDefault();
        setIsSale(!isSale);
    };
    return (
        <>
            <ProductForm
                onSubmit={ProductRegSubmitHandler}
                name="product_reg_form"
                encType="multipart/form-data"
            >
                <ImgBox>
                    <ProductThumbnail>
                        <span className="preview-img-title">대표이미지</span>
                        {image ? (
                            <img src={image} alt="thumbnail_image" />
                        ) : (
                            <NoneImg>
                                <BsCardImage size={50} color={'#777'} />
                                <p>미리보기 이미지가 없습니다</p>
                            </NoneImg>
                        )}
                    </ProductThumbnail>
                    <ProductImgs>
                        {multipleImage ? (
                            multipleImage.map((img, idx) => {
                                return (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`images-${idx}`}
                                        onClick={() => onClickImageHandler(img, idx)}
                                    />
                                );
                            })
                        ) : (
                            <NoneImg className="multiple">
                                <BsCardImage size={30} color={'#777'} />
                            </NoneImg>
                        )}
                    </ProductImgs>
                </ImgBox>
                <div className="core">
                    <ToggleButton toggle={isSale} onClickHandler={onClickIsSale} />
                    <InputFile
                        label={'이미지'}
                        accept="image/*"
                        $idName={'info-imgs'}
                        $value={multipleImgName.join(',')}
                        onChange={MultipleImageHander}
                        $coreValue={multipleImgName ? false : true}
                        multiple
                    />
                    <InputFile
                        label={'대표이미지'}
                        accept="image/*"
                        $value={imgName}
                        $functionActive={'none-active'}
                    />
                    <Textarea
                        label={'제목'}
                        type={'text'}
                        value={title}
                        onChange={onChangeTitle}
                        placeholder="제목을 입력해주세요"
                        $coreValue={title ? false : true}
                    />
                    <Textarea
                        label={'상품 한 줄 설명'}
                        type={'text'}
                        value={productOneDesc}
                        onChange={onChangeProductOneDesc}
                        placeholder="교환 물품에 대한 한 줄 설명을 해주세요"
                        $coreValue={productOneDesc ? false : true}
                    />
                    <Textarea
                        label={'어떤 물품이랑 교환하실 건가요?'}
                        type={'text'}
                        value={tradeItem}
                        onChange={onChangeTradeItem}
                        placeholder="어떤 물품이랑 교환하실 건가요?"
                        $coreValue={tradeItem ? false : true}
                    />
                    <Textarea
                        label={'어디서 교환하실 건가요'}
                        type={'text'}
                        value={location}
                        onChange={onChangeLocation}
                        placeholder="어디서 교환하실 건가요"
                        $coreValue={location ? false : true}
                    />
                </div>
                <div className="sub">
                    <Textarea
                        label={'상세한 내용을 적어주세요'}
                        type={'text'}
                        value={productDesc}
                        onChange={onChangeProductDesc}
                        $heigth={'600px'}
                        $padding={'50px'}
                        placeholder="상세한 내용을 적어주세요"
                        $coreValue={productDesc ? false : true}
                        $center
                    />
                </div>
                <div className="btn-box">
                    <Button.Primary
                        onClick={() => {
                            nav(-1);
                        }}
                    >
                        수정 취소하기
                    </Button.Primary>
                    <Button.Secondary>상품 수정하기</Button.Secondary>
                </div>
            </ProductForm>
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

export default ProductUpdateContainer;
