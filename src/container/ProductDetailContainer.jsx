import React, { useEffect, useState } from 'react';
import ProductDetail from '../components/ProductDetail';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deleteTradingItems } from '../api/tradingItems';
import { getTradingItem } from '../api/tradingItem';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateItem } from '../redux/modules/itemSlice';
import Modal, { IntentCheckModel } from '../components/common/Modal';

const ProductDetailContainer = () => {
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
    const { id } = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const mutation = useMutation((id) => deleteTradingItems(id), {
        onSuccess: (msg) => {
            if (msg === '물품이 삭제되었습니다.') {
                setMassage(msg);
                openModalIntentCheck();
            }
            if (msg === '물품 삭제 실패했습니다.') {
                setMassage(msg);
                openModal();
            }
            queryClient.invalidateQueries('tradingItem');
        },
    });

    const { data } = useQuery('tradingItem', () => getTradingItem(id), {
        onSuccess: (data) => {},
    });

    const onClickDelete = async (id) => {
        await mutation.mutateAsync(id);
    };

    return (
        <>
            {data && (
                <>
                    <ProductDetail data={data} btnDeleteEvent={onClickDelete} />
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
            )}
        </>
    );
};

export default ProductDetailContainer;
