import {useState} from "react";

const SignInForm = ({onSignIn}: {onSignIn: (username: string, password: string) => void}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignIn(username, password);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <input
                className="border-1 rounded-[12px] pl-[16px] h-[42px] w-[267px] text-[14px] border-[#3E3E3E]" 
                type = "text"
                placeholder = "Username"
                value = {username}
                onChange = { (e) => setUsername(e.target.value)}
                required
            >
            </input>
            <input
                className="border-1 rounded-[12px] pl-[16px] h-[42px] w-[267px] text-[14px] mt-[20px] border-[#3E3E3E]" 
                type = "password"
                placeholder = "Password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                required
            >
            </input>
            <a href="/forgot_password" className="hover:text-[#4f4f4f] font-[500] text-[14px] mt-[20px]">Forgot password?</a>

            <button
                className="hover:bg-[#2F2F2F] border-1 rounded-[12px] h-[42px] w-[267px] text-[14px] text-[white] border-black bg-black font-medium mt-[40px]" 
                type = "submit"
            >
                SIGN IN
            </button>
        </form>
    )
}

export default SignInForm;