import React, { useRef, useState } from 'react';
import {
    ImgBox,
    ProductThumbnail,
    ProductImgs,
    ProductForm,
    NoneImg,
} from './ProductSubmitFormStyle';
import { BsCardImage } from 'react-icons/bs';
import Input, { InputFile } from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Button from './common/Button/Button';

const ProductSubmitForm = ({
    ProductRegSubmitHandler,
    image,
    multipleImage,
    onClickImageHandler,
    multipleImgName,
    MultipleImageHander,
    imgRef,
    imgName,
    MainImagehandler,
    title,
    onChangeTitle,
    productOneDesc,
    onChangeProductOneDesc,
    tradeItem,
    onChangeTradeItem,
    location,
    onChangeLocation,
    productDesc,
    onChangeProductDesc,
    nav,
}) => {
    return (
        <>
            <ProductForm
                onSubmit={ProductRegSubmitHandler}
                name="product_reg_form"
                encType="multipart/form-data"
            >
                <ImgBox>
                    <ProductThumbnail>
                        <span className="preview-img-title">대표 이미지</span>
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
                    <InputFile
                        label={'이미지'}
                        accept="image/*"
                        $idName={'info-imgs'}
                        $value={multipleImgName.join(',')}
                        onChange={MultipleImageHander}
                        $coreValue={imgName ? false : true}
                        multiple
                    />
                    <InputFile
                        label={'대표이미지 지정'}
                        accept="image/*"
                        $value={imgName}
                        $functionActive={'none-active'}
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
                        label={'교환 희망 물품'}
                        type={'text'}
                        value={tradeItem}
                        onChange={onChangeTradeItem}
                        placeholder="어떤 물품이랑 교환하실 건가요?"
                        $coreValue={tradeItem ? false : true}
                    />
                    <Textarea
                        label={'희망 장소'}
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
                    <Button.Primary onClick={() => nav('/')} $width={'100px'} $center={'center'}>
                        취소하기
                    </Button.Primary>
                    <Button.Secondary $width={'100px'} $center={'center'}>
                        상품 등록하기
                    </Button.Secondary>
                </div>
            </ProductForm>
        </>
    );
};

export default ProductSubmitForm;
