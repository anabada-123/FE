import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import Input, { InputFile } from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button/Button';
import ToggleButton from '../components/common/Button/ToggleButton';
import { useQueryClient, useMutation } from 'react-query';
import { updateTradingItem } from '../api/tradingItem';
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
// import { updateItem } from '../redux/modules/itemSlice';
import { useNavigate } from 'react-router-dom';
import { BsCardImage } from 'react-icons/bs';

const ProductUpdateContainer = () => {
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

    const { id } = useParams();
    const nav = useNavigate();
    const { isLoading, error, item } = useSelector((state) => {
        return state.item;
    });
    // const base64data = async (item) => {
    //     try {
    //         // 이미지 다운로드
    //         const response = await fetch(item);
    //         const imageBlob = await response.blob();

    //         // Base64 인코딩
    //         const reader = new FileReader();
    //         reader.readAsDataURL(imageBlob);
    //         reader.onloadend = () => {
    //             imgRef.current = reader.result; // Base64 데이터를 상태로 저장
    //         };
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    useEffect(() => {
        if (item) {
            setTitle(item.itemName);
            setProductOneDesc(item.itemOneContent);
            setProductDesc(item.itemContent);
            setTradeItem(item.tradingItem);
            setLocation(item.tradingPosition);
            setImage(item.img);
            setMultipleImage(item.imgList);
            setIsSale(item.check);
            imgRef.current = item.img;
            multipleImgRef.current = item.imgList;
            // console.log(item.check);
            // base64data(item.img);
        }
        // }
    }, []);

    //이미지 업로드 시 미리보기
    const ImageChangehandler = (event) => {
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
            imgRef.current = firstFile;
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

    const onClickImageHandler = (imageDataURL, idx) => {
        setImage(imageDataURL);
        setImgName(multipleImgName[idx]);
        imgRef.current = multipleImgRef.current[idx];
    };
    // 트레이드 아이템 등록
    const queryClient = useQueryClient();
    const mutation = useMutation((formData) => updateTradingItem(id, formData), {
        onSuccess: () => {
            queryClient.invalidateQueries('tradingItem');
        },
    });

    const ProductRegSubmitHandler = async (e) => {
        e.preventDefault();
        const img = imgRef.current;
        const multipleImg = multipleImgRef.current;
        const items = {
            itemName: title,
            itemContent: productDesc,
            itemOneContent: productOneDesc,
            tradingItem: tradeItem,
            tradingPosition: location,
            cate: cate,
            status: '판매완료',
            check: isSale,
        };
        const formData = new FormData();

        formData.append(
            'item',
            new Blob([JSON.stringify(items)], {
                type: 'application/json',
            })
        );

        formData.append('mainImg', img);
        multipleImg &&
            multipleImg.forEach((file) => {
                formData.append(`img`, file);
            });
        await mutation.mutateAsync(formData);

        // formData 콘솔 확인하기
        // for (let value of formData.values()) {
        //     console.log(value);
        // }
        setTitle('');
        setProductOneDesc('');
        setProductDesc('');
        setTradeItem('');
        setTradeItem('');
        setLocation('');
        nav(-1);
    };

    const onClickIsSale = (e) => {
        e.preventDefault();
        setIsSale(!isSale);
        console.log(isSale);
    };

    return (
        <ProductForm
            onSubmit={ProductRegSubmitHandler}
            name="product_reg_form"
            encType="multipart/form-data"
        >
            <ImgBox>
                <ProductThumbnail>
                    <span className="preview-img-title">이미지 미리보기</span>
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
                            {/* <p>미리보기 이미지가 없습니다</p> */}
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
                    $coreValue={imgRef.current ? false : true}
                    multiple
                />
                <InputFile
                    label={'대표이미지'}
                    accept="image/*"
                    $idName={'info-img'}
                    $value={imgName}
                    onChange={ImageChangehandler}
                />
                <Input
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
            <Button.Primary
                onClick={() => {
                    nav(-1);
                }}
            >
                수정 취소하기
            </Button.Primary>
            <Button.Secondary>상품 수정하기</Button.Secondary>
        </ProductForm>
    );
};

export default ProductUpdateContainer;
