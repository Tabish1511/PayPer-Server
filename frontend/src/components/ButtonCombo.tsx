import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SmallButton } from "./SmallButton";
import { useState } from "react";
import Modal from "./Modal";

interface ButtonComboInterface{
    id: number;
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
            <SmallButton label="✓" onClick={openPaymentModal} />
            <Modal
                isOpen={paymentModalOpen}
                onClose={closePaymentModal}
                heading="Payment Received"
                subHeading="Are you sure you want to continue with this payment?"
                onClick={async () => {
                try {
                    await axios.patch(
                    // "http://localhost:3000/api/v1/client/paid",
                    "http://localhost:8787/api/v1/client/paid",
                    {
                        id: props.id,
                    },
                    {
                        headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                    ).then(() => {
                        closePaymentModal();
                    });
                } catch (error) {
                    console.error("Error occurred while updating client:", error);
                    console.log("The above is the error from frontend");
                }
                }}
            ></Modal> {/* CLIENT PAID */}
            
            <SmallButton
                label="+"
                onClick={() => {
                navigate("/editClient?id=" + props.id);
                }}
            />  {/* EDIT CLIENT */}
            
            <SmallButton label="-" onClick={openDeleteModal} />
            <Modal
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
                heading="Delete Client"
                subHeading="Are you sure you want to continue with this deletion?"
                onClick={async () => {
                try {
                    // await axios.delete("http://localhost:3000/api/v1/client/delete", {
                    await axios.delete("http://localhost:8787/api/v1/client/delete", {
                    data: { id: props.id },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    });
                    closeDeleteModal();
                } catch (error) {
                    console.error("Error occurred while deleting client:", error);
                }
                }}
            ></Modal>   {/* DELETE CLIENT */}
        </div>
    )
}
