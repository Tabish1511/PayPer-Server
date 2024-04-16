import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useState, useEffect } from "react"

export function CreateClient() {
    const [name, setName] = useState("");
    const [itemDescription, setItem] = useState("");
    const [phone, setPhone] = useState("");
    const [totalAmount, setTotal] = useState("");
    const [deposit, setDeposit] = useState("");
    const [months, setMonths] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
          navigate('/signin');
        }
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8787/api/v1/client/create", {
                name,
                itemDescription,
                phone,
                total: parseFloat(totalAmount),
                deposit: parseFloat(deposit),
                months: parseInt(months)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.status === 200) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <Appbar initial="U"/>
            
            <div className="flex-1 bg-cream-main flex justify-center">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg w-max h-max bg-white pb-5">
                            <Heading label="New Client" />
                            <SubHeading label="Enter client details" />
                        <div className="flex justify-center">
                            <div className="w-96 h-max">
                                <InputBox onChange={e => {
                                    setName(e.target.value);
                                }} label="name" type="text" id="name" name="name" placeholder="Eg. John Doe" />
                                <InputBox onChange={e => {
                                    setItem(e.target.value);
                                }} label="Item Description" type="text" id="itemDescription" name="itemDescription" placeholder="Eg. White BMW sale" />
                                <InputBox onChange={e => {
                                    setPhone(e.target.value);
                                }} label="Phone Number" type="text" id="phone" name="phone" placeholder="+268-xxxx-xxxx" />
                            </div>
                            <div className="w-96 h-max">
                                <InputBox onChange={e => {
                                    setTotal(e.target.value);
                                }} label="Total Amount" type="number" id="total" name="total" placeholder="Eg. 150,000" />
                                <InputBox onChange={e => {
                                    setDeposit(e.target.value);
                                }} label="Deposit" type="number" id="deposit" name="deposit" placeholder="Eg. 80,000" />
                                <InputBox onChange={e => {
                                    setMonths(e.target.value);
                                }} label="Months" type="number" id="months" name="months" placeholder="Eg. 6" />
                            </div>
                        </div>
                        <Button onClick={handleSubmit} label="Submit" />
                        <SubHeading label="Due date will automatically set today's date for next month" />
                    </div>
                </div>
            </div>
        </div>
    )
}