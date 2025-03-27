import {useState} from "react";

const SignUpForm = ({onSignUp}: {
    onSignUp: (
        firstname: string, 
        lastname: string, 
        contact: string, 
        email:string, 
        username: string, 
        password: string
    ) => void}) => 
{
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignUp(firstname, lastname, contact, email, username, password)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-[24px]">
                <input
                    className="mr-[16px] border-1 rounded-[12px] pl-[16px] h-[42px] w-[195px] text-[14px] border-[#3E3E3E]"
                    type = "text"
                    placeholder="First Name"
                    value = {firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                >
                </input>
                <input
                    className="border-1 rounded-[12px] pl-[16px] h-[42px] w-[195px] text-[14px] border-[#3E3E3E]"
                    type = "text"
                    placeholder="Last Name"
                    value = {lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                >
                </input>
            </div>

            <div className="mb-[24px]">
                <input
                    className="mr-[16px] border-1 rounded-[12px] pl-[16px] h-[42px] w-[195px] text-[14px] border-[#3E3E3E]"
                    type = "text"
                    placeholder="Contact No"
                    value = {contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                >
                </input>
                <input
                    className="border-1 rounded-[12px] pl-[16px] h-[42px] w-[195px] text-[14px] border-[#3E3E3E]"
                    type = "text"
                    placeholder="Email"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                >
                </input>
            </div>

            <div>
                <input
                    className="mr-[16px] border-1 rounded-[12px] pl-[16px] h-[42px] w-[195px] text-[14px] border-[#3E3E3E]"
                    type = "text"
                    placeholder="Username"
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                >
                </input>
                <input
                    className="border-1 rounded-[12px] pl-[16px] h-[42px] w-[195px] text-[14px] border-[#3E3E3E]"
                    type = "password"
                    placeholder="Password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                >
                </input>
            </div>

            <button
                className="hover:bg-[#2F2F2F] border-1 rounded-[12px] h-[42px] w-[267px] text-[14px] text-[white] border-black bg-black font-medium mt-[40px]" 
                type = "submit"
            >
                Sign Up
            </button>
        </form>
    )
}

export default SignUpForm;