import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SmallButton } from "./SmallButton";
import { useState } from "react";
import Modal from "./Modal";

import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface ButtonComboInterface{
    id: number;
    onSuccess: () => void;
}

export function ButtonCombo(props: ButtonComboInterface){
    const navigate = useNavigate();
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const openPaymentModal = () => {
        setPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
    };

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };
    
    
    return (
        <div className="flex flex-nowrap justify-center">
            <SmallButton label={<PriceCheckIcon/>} title="Paid" onClick={openPaymentModal} />
            <Modal
                isOpen={paymentModalOpen}
                onClose={closePaymentModal}
                heading="Payment Received"
                subHeading="Are you sure you want to continue with this payment?"
                onClick={async () => {
                try {
                    await axios.patch(
                    `${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/v1/client/paid`,
                    {
                        id: props.id,
                    },
                    {
                        headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                    ).then(() => {
                        props?.onSuccess?.();
                        closePaymentModal();
                    });
                } catch (error) {
                    console.error("Error occurred while updating client:", error);
                    console.log("The above is the error from frontend");
                }
                }}
            ></Modal> {/* CLIENT PAID */}
            
            <SmallButton
                label={<EditNoteIcon/>}
                title="Edit"
                onClick={() => {
                navigate("/editClient?id=" + props.id);
                }}
            />  {/* EDIT CLIENT */}
            
            <SmallButton label={<DeleteForeverIcon/>} title="Delete" onClick={openDeleteModal} />
            <Modal
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
                heading="Delete Client"
                subHeading="Are you sure you want to continue with this deletion?"
                onClick={async () => {
                try {
                    await axios.delete(`${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/v1/client/delete`, {
                    data: { id: props.id },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    })
                    .then(() => {
                        props?.onSuccess?.();
                        closeDeleteModal();
                    });
                } catch (error) {
                    console.error("Error occurred while deleting client:", error);
                }
                }}
            ></Modal>   {/* DELETE CLIENT */}
        </div>
    )
}
