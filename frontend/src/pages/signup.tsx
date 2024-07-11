import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Signup(){
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-cream-main h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg w-96 h-max bg-white">
                    <Heading label="Sign Up" />
                    <SubHeading label="Enter your details" />
                    <InputBox onChange={e => {
                        setUsername(e.target.value);
                    }} label="Username" type="email" id="username" name="username" placeholder="john@gmail.com" />
                    <InputBox onChange={e => {
                        setFirstName(e.target.value);
                    }} label="Firstname" type="text" id="firstname" name="firstname" placeholder="John" />
                    <InputBox onChange={e => {
                        setLastName(e.target.value);
                    }} label="Lastname" type="text" id="lastname" name="lastname" placeholder="Doe" />
                    <InputBox onChange={e => {
                        setPassword(e.target.value);
                    }} label="Password" type="password" id="password" name="password" placeholder="1234Aa@" />
                    <Button onClick={async()=>{
                        await axios.post(`${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/v1/user/signup`, {
                            username,
                            firstName,
                            lastName,
                            password
                        }).then((res) => {
                            localStorage.setItem("token", res.data.token);
                            
                        }).then(() => {
                            navigate('/dashboard');
                        })
                        .catch((err) => {
                            console.error("Error", err);
                        })
                    }} label="Sign Up" />
                    <BottomWarning warning="Already have an account? " link="Sign in" to={"/signin"}/>
                    <div className="text-center mb-4">
                        (Note: kindly use a 'test@random.com' email)
                    </div>
                </div>
            </div>
        </div>
    )
}