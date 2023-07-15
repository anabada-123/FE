import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import Input, { InputFile } from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';
import { useQueryClient, useMutation } from 'react-query';
import { addTradingItems } from '../api/tradingItems';
import { ImgBox, ProductThumbnail, ProductImgs, ProductForm } from '../components/ProductRegSt';

// [ ]스타일과 기능 분리 필요
// [ ]재사용 컴포넌트 분리 필요

const ProductRegContainer = () => {
    //텍스트
    const [title, setTitle, onChangeTitle] = useInput();
    const [productOneDesc, setProductOneDesc, onChangeProductOneDesc] = useInput();
    const [productDesc, setProductDesc, onChangeProductDesc] = useInput();
    const [tradeItem, setTradeItem, onChangeTradeItem] = useInput();
    const [location, setLocation, onChangeLocation] = useInput();
    const [cate, setCate, onChangeCate] = useInput('기타');

    //이미지
    const [image, setImage] = useState(null);
    const [multipleImage, setMultipleImage] = useState([]);
    const [imgName, setImgName] = useState(null);
    const [multipleImgName, setMultipleImgName] = useState([]);
    const imgRef = useRef();
    const multipleImgRef = useRef();

    //이미지 업로드 시 미리보기

    const handleImageChange = (event) => {
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
        multipleImgRef.current = selectedFiles;
        const fileReaders = [];
        const fileNames = [];
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
    console.log(multipleImgName);
    // 트레이드 아이템 등록
    const queryClient = useQueryClient();

    const mutation = useMutation(addTradingItems, {
        onSuccess: () => {
            queryClient.invalidateQueries('tradingItem');
        },
    });

    const ProductRegSubmitHandler = (e) => {
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

        // console.log(items);

        mutation.mutateAsync(formData);

        //formData 콘솔 확인하기
        // for (let value of formData.values()) {
        //     console.log(value);
        // }
        setTitle('');
        setProductOneDesc('');
        setProductDesc('');
        setTradeItem('');
        setTradeItem('');
        setLocation('');
    };
    return (
        <ProductForm
            onSubmit={ProductRegSubmitHandler}
            name="product_reg_form"
            encType="multipart/form-data"
        >
            <ImgBox>
                <span className="preview-img-title">이미지 미리보기</span>
                <ProductThumbnail>
                    <img src={image ? image : '/img/img0.jpg'} alt={'img'} />
                </ProductThumbnail>
                <ProductImgs>
                    {multipleImage ? (
                        multipleImage.map((img, idx) => {
                            return <img key={idx} src={img} alt="img" />;
                        })
                    ) : (
                        <img src="/img/img0.jpg" alt="img" />
                    )}
                </ProductImgs>
            </ImgBox>
            <div className="core">
                <InputFile
                    label={'대표이미지'}
                    accept="image/*"
                    $idName={'info-img'}
                    $value={imgName}
                    onChange={handleImageChange}
                />
                <InputFile
                    label={'이미지'}
                    accept="image/*"
                    $idName={'info-imgs'}
                    $value={multipleImgName.join(',')}
                    onChange={MultipleImageHander}
                    multiple
                />
                <Input label={'제목'} type={'text'} value={title} onChange={onChangeTitle} />
                <Textarea
                    label={'상품 한 줄 설명'}
                    type={'text'}
                    value={productOneDesc}
                    onChange={onChangeProductOneDesc}
                />
                <Textarea
                    label={'어떤 물품이랑 교환하실 건가요?'}
                    type={'text'}
                    value={tradeItem}
                    onChange={onChangeTradeItem}
                />
                <Textarea
                    label={'어디서 교환하실 건가요'}
                    type={'text'}
                    value={location}
                    onChange={onChangeLocation}
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
                    $center
                />
            </div>
            <Button.Primary>상품 등록하기</Button.Primary>
        </ProductForm>
    );
};

export default ProductRegContainer;
