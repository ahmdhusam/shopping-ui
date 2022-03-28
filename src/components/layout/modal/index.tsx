import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '../card';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../store/modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'lightgrey',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function BasicModal() {
    const { isOpen, product } = useSelector((state: any) => state.modal);
    const dispatch = useDispatch();
    const { closeModal } = modalActions;

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={dispatch.bind(null, closeModal())}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Card product={product} isNotDefault />
                </Box>
            </Modal>
        </div>
    );
}
