import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import {useState} from "react";


const Taskbar = () => {
    const {id, logout} = useAuth();
    const [show, setShow] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState(""); 
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try {
            const result = await axiosInstance.post(`https://localhost:7182/api/Auth/logout?id=${id}`);
            
            if (result.status = 200) {
                logout();
                navigate("/signin");
            } 
            else {
                console.log(result);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const handleSetting = () => {
        setShow(!show);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErr("");
    }

    const handleChange = async (e:React.FormEvent) =>{
        await e.preventDefault();

        if (newPassword == confirmPassword){
            try{
                const response = await axiosInstance.put(`https://localhost:7182/api/Auth/change-password?id=${id}&oldPW=${oldPassword}&newPW=${newPassword}`);
                console.log(response);
                if (response.data.success == true) {
                    setErr("Change Password Successfully!");
                    setTimeout(() => {
                        handleSetting();
                    }, 500);
                }
                else {
                    setErr(response.data.message);
                }
            } catch (error){

            }
        } else {
            setErr("Confirm Password is Incorrect!");
        }

    }

    return (
        <div className="fixed select-none z-50">
            <div onClick={handleSetting} className={`mt-[71px] ml-[222px] absolute bg-[rgba(100,100,100,0.6)] w-screen h-screen ${show ? "": "invisible"}`}>
                <div  onClick={(e) => e.stopPropagation()} className="flex flex-col items-center w-[627px] h-[501px] rounded-[12px] fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center mt-[48px] mb-[20px]">
                        <div className="w-[60px] h-[60px] bg-[#D7D7D7] flex justify-center items-center rounded-[8px]">
                            <svg className="" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1 9.2214C18.29 9.2214 17.55 7.9414 18.45 6.3714C18.97 5.4614 18.66 4.3014 17.75 3.7814L16.02 2.7914C15.23 2.3214 14.21 2.6014 13.74 3.3914L13.63 3.5814C12.73 5.1514 11.25 5.1514 10.34 3.5814L10.23 3.3914C9.78 2.6014 8.76 2.3214 7.97 2.7914L6.24 3.7814C5.33 4.3014 5.02 5.4714 5.54 6.3814C6.45 7.9414 5.71 9.2214 3.9 9.2214C2.86 9.2214 2 10.0714 2 11.1214V12.8814C2 13.9214 2.85 14.7814 3.9 14.7814C5.71 14.7814 6.45 16.0614 5.54 17.6314C5.02 18.5414 5.33 19.7014 6.24 20.2214L7.97 21.2114C8.76 21.6814 9.78 21.4014 10.25 20.6114L10.36 20.4214C11.26 18.8514 12.74 18.8514 13.65 20.4214L13.76 20.6114C14.23 21.4014 15.25 21.6814 16.04 21.2114L17.77 20.2214C18.68 19.7014 18.99 18.5314 18.47 17.6314C17.56 16.0614 18.3 14.7814 20.11 14.7814C21.15 14.7814 22.01 13.9314 22.01 12.8814V11.1214C22 10.0814 21.15 9.2214 20.1 9.2214ZM12 15.2514C10.21 15.2514 8.75 13.7914 8.75 12.0014C8.75 10.2114 10.21 8.7514 12 8.7514C13.79 8.7514 15.25 10.2114 15.25 12.0014C15.25 13.7914 13.79 15.2514 12 15.2514Z" fill="black"/>
                            </svg>
                        </div>
                        <p className="text-[18px] font-[500] ml-[16px] mr-[250px]">Change Credentials</p>
                        <svg onClick={handleSetting} className="mr-[20px]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16992 14.8299L14.8299 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.8299 14.8299L9.16992 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="w-[530px] h-[2px] bg-black"></div>
                    <form onSubmit={handleChange} className="flex flex-col items-center">
                        <div className="w-[460px] mt-[40px] flex items-center justify-between">
                            <label
                                className="text-[#6D6D6D]"
                            >
                                Enter Current Password
                            </label>
                            <input
                                type="password"
                                value ={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="border-1 w-[272px] h-[42px] rounded-[12px] pl-[16px] pb-[4px]"    
                                placeholder="Enter Current Password"
                            >
                            </input>
                        </div>
                        <div className="w-[460px] mt-[40px] flex items-center justify-between">
                            <label
                                className="text-[#6D6D6D]"
                            >
                                Enter New Password
                            </label>
                            <input
                                type="password"
                                value ={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border-1 w-[272px] h-[42px] rounded-[12px] pl-[16px] pb-[4px]"    
                                placeholder="Enter New Password"
                            >
                            </input>
                        </div>
                        <div className="w-[460px] mt-[40px] flex items-center justify-between">
                            <label
                                className="text-[#6D6D6D]"
                            >
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value ={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border-1 w-[272px] h-[42px] rounded-[12px] pl-[16px] pb-[4px]"    
                                placeholder="Confirm New Password"
                            >
                            </input>
                        </div>
                        <div className="mt-[40px] flex items-center justify-between w-[530px]">
                            <button
                                type="button"
                                onClick ={handleSetting}
                                className="bg-[#D7D7D7] text-[20px] font-[700] w-[254px] h-[54px] rounded-[12px]"
                            >
                                CANCEL
                            </button>

                            <button
                                type="submit"
                                className="bg-black text-white text-[20px] font-[700] w-[254px] h-[54px] rounded-[12px]"
                            >
                                CONFIRM
                            </button>
                        </div>
                    </form>
                    {err && 
                    <div className={err=="Change Password Successfully!"? "text-[green]":"text-[red]"}>
                        <p className="text-[12px] absolute top-[378px] w-[260px] left-[280px] text-right">{err}</p>
                    </div>}
                </div>
            </div>
            <div className="left-0 w-[222px] h-screen bg-black text-white flex flex-col items-center shadow-lg">
                <svg className="mt-[32px]" width="48" height="48" viewBox="0 0 89 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M32.2944 13.5546C36.6213 13.9718 41.5259 13.6406 45.8783 15.026C55.6122 18.1251 58.3999 27.6049 52.6845 36.145C46.9642 44.6918 34.0079 48.5324 24.5756 44.4779C18.9621 42.0646 16.1901 37.6046 16.3644 31.2951C16.3947 30.2057 16.3683 29.1164 16.3683 27.5248C15.0131 28.58 14.1025 29.5863 12.9667 30.0846C11.9523 30.5301 10.3905 30.8955 9.61793 30.4158C8.80131 29.9068 8.13939 28.2986 8.26864 27.2796C8.75627 23.4204 10.788 20.3292 14.0486 18.1895C16.2772 16.726 18.3873 17.8828 18.635 20.5656C18.7065 21.3502 18.6458 22.1464 18.6458 23.0922C21.7605 20.5461 24.7284 18.1202 28.3219 15.1823C26.5477 15.5223 25.4598 15.9854 24.4444 15.8584C23.3292 15.7206 22.0484 15.2673 21.3072 14.4994C20.9606 14.1418 21.4227 12.435 22.02 11.8351C25.4167 8.42045 29.5547 6.44591 34.4446 6.52603C36.7261 6.56316 37.484 8.35792 35.9711 10.1341C34.7354 11.5899 33.1658 12.7613 32.2944 13.5546Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M61.7534 36.1624C68.0416 36.1663 71.1857 40.936 68.2737 46.7209C65.3127 52.6054 60.4218 56.2613 53.5754 56.4802C46.9338 56.6922 44.6523 52.3592 46.7223 46.3643C48.662 40.7465 55.8099 36.1594 61.7534 36.1624Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M68.0065 32.5964C62.3323 32.5573 57.2759 27.3704 57.2906 21.6041C57.3004 17.3473 60.3015 14.2013 64.3268 14.2277C69.9463 14.2658 75.7576 20.0985 75.7292 25.6753C75.7076 29.9692 72.7378 32.6277 68.0065 32.5964Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M30.6717 61.5677C28.0367 60.8388 25.3078 60.3406 22.7933 59.3176C20.3062 58.3055 18.4683 56.3065 18.5095 53.4409C18.5496 50.6438 20.4776 48.9926 22.9705 48.1407C27.838 46.4768 32.7132 46.6224 37.3153 48.9448C39.8748 50.2373 41.9399 52.2558 41.325 55.5405C40.7022 58.876 37.9077 59.9664 35.1083 60.7685C33.756 61.1564 32.2559 61.0333 30.8225 61.1427C30.7725 61.2844 30.7226 61.425 30.6717 61.5677Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M81.5964 39.3425C87.2481 39.3083 89.742 43.3414 87.3372 47.8884C85.2095 51.9136 79.8799 54.3591 76.1228 53.0343C72.4911 51.7534 71.136 48.5733 72.8485 45.1244C74.7217 41.3542 77.9431 39.6219 81.5964 39.3425Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M40.5309 73.8015C38.2739 73.1694 36.5046 72.9379 34.9908 72.1934C31.6744 70.5608 31.457 66.8726 34.5355 64.7984C38.2396 62.3032 42.356 62.1224 46.3892 63.6944C49.8799 65.0544 50.3431 68.9009 47.2107 71.018C45.179 72.3898 42.6087 72.9682 40.5309 73.8015Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M51.4847 14.5364C48.8508 13.704 45.8908 13.1451 43.297 11.8506C40.3732 10.3909 40.568 7.881 43.3861 6.23768C47.0285 4.11464 55.7784 4.57286 59.0997 7.06129C61.5241 8.8756 61.4555 11.3572 58.6737 12.5921C56.5715 13.5252 54.1911 13.8339 51.4847 14.5364Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.7588 43.6952C17.9772 46.3439 16.9324 48.4561 14.5295 49.4664C11.9817 50.5362 9.84422 49.185 8.28931 47.2749C6.29671 44.8266 4.99736 42.0118 5.93246 38.7271C7.16425 34.4009 11.4275 33.1132 14.461 36.4116C16.2215 38.3246 17.187 40.9664 18.5098 43.279C18.2601 43.4177 18.0095 43.5565 17.7588 43.6952Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M69.103 3.26953C71.3531 4.3755 73.3653 4.9959 74.8625 6.2367C75.7584 6.97825 76.4732 8.90784 76.1236 9.90145C75.7662 10.9185 73.9753 12.0948 72.8699 12.0391C70.9125 11.9414 68.7633 11.3142 67.1516 10.2307C66.0285 9.47645 64.8525 7.33876 65.1825 6.27578C65.5604 5.06038 67.5785 4.35401 69.103 3.26953Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.4725 56.6797C10.5276 58.0163 9.89407 59.8599 8.81895 60.1657C7.76146 60.4656 5.85698 59.5345 5.05211 58.5507C4.02595 57.2952 3.26514 55.4438 3.26709 53.8513C3.26905 52.5773 4.31088 50.8138 5.41244 50.2051C6.16444 49.7889 8.20893 50.6496 8.96583 51.5397C10.0782 52.8498 10.554 54.6944 11.4725 56.6797Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M39.4939 4.6667C38.4129 3.97791 37.3398 3.29303 36.2646 2.6101C37.3398 1.80993 38.3121 0.614077 39.5125 0.310228C41.135 -0.100115 42.9788 -0.0766662 44.6424 0.224252C46.3549 0.533963 46.6369 1.85585 45.0605 2.7166C43.4968 3.5705 41.6647 3.93297 39.4939 4.6667Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5641 28.8006C5.46031 31.9212 3.33552 35.0691 1.70815 34.858C1.08246 34.777 0.168905 33.6358 0.129738 32.9372C0.000488326 30.6237 2.54533 27.1543 4.1306 27.4025C4.80524 27.509 5.33106 28.5583 5.5641 28.8006Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.0487 15.8262C13.5082 14.3441 13.0402 13.6426 13.0784 12.9704C13.1058 12.4819 13.7119 11.8351 14.2191 11.5997C16.01 10.7692 17.8665 10.0863 19.6985 9.3457C19.8101 9.89771 20.2028 10.7624 19.9893 10.9529C18.2787 12.4858 16.4516 13.8898 14.0487 15.8262Z" fill="white"/>
                </svg>

                <p className="text-[40px] font-[300] mt-[-20px]">ReadOn</p>
                <p className="text-[14px] mt-[-12px]">LIBRARY</p>

                <div className="flex flex-col text-center w-full mt-[32px]">
                    <NavLink 
                        to="/admin_dashboard" 
                        className={({ isActive }) => `mb-[12px] flex pl-[40px] items-center w-full h-[48px] font-[500] ${isActive ? "bg-white text-black font-[700]" : ""}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 19.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V19.9C2.5 21.4 3.14 22 4.73 22H8.77C10.36 22 11 21.4 11 19.9Z"  fill="currentColor"/>
                            <path d="M21.5 10.9V4.1C21.5 2.6 20.86 2 19.27 2H15.23C13.64 2 13 2.6 13 4.1V10.9C13 12.4 13.64 13 15.23 13H19.27C20.86 13 21.5 12.4 21.5 10.9Z"  fill="currentColor"/>
                            <path d="M21.5 19.9V17.1C21.5 15.6 20.86 15 19.27 15H15.23C13.64 15 13 15.6 13 17.1V19.9C13 21.4 13.64 22 15.23 22H19.27C20.86 22 21.5 21.4 21.5 19.9Z"  fill="currentColor"/>
                        </svg>
                        <p className="ml-[24px]">Dashboard</p>
                    </NavLink>
                    <NavLink 
                        to="/admin_catalog" 
                        className={({ isActive }) => `mb-[12px] flex pl-[40px] items-center w-full h-[48px] font-[500] ${isActive ? "bg-white text-black font-[700]" : ""}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.9808 3.02084C20.1108 2.15084 18.8808 1.81084 17.6908 2.11084L7.89084 4.56084C6.24084 4.97084 4.97084 6.25084 4.56084 7.89084L2.11084 17.7008C1.81084 18.8908 2.15084 20.1208 3.02084 20.9908C3.68084 21.6408 4.55084 22.0008 5.45084 22.0008C5.73084 22.0008 6.02084 21.9708 6.30084 21.8908L16.1108 19.4408C17.7508 19.0308 19.0308 17.7608 19.4408 16.1108L21.8908 6.30084C22.1908 5.11084 21.8508 3.88084 20.9808 3.02084ZM12.0008 15.8808C9.86084 15.8808 8.12084 14.1408 8.12084 12.0008C8.12084 9.86084 9.86084 8.12084 12.0008 8.12084C14.1408 8.12084 15.8808 9.86084 15.8808 12.0008C15.8808 14.1408 14.1408 15.8808 12.0008 15.8808Z" fill="currentColor"/>
                        </svg>

                        <p className="ml-[24px]">Catalog</p>
                    </NavLink>
                    <NavLink 
                        to="/admin_books" 
                        className={({ isActive }) => `mb-[12px] flex pl-[40px] items-center w-full h-[48px] font-[500] ${isActive ? "bg-white text-black font-[700]" : ""}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 4.84969V16.7397C22 17.7097 21.21 18.5997 20.24 18.7197L19.93 18.7597C18.29 18.9797 15.98 19.6597 14.12 20.4397C13.47 20.7097 12.75 20.2197 12.75 19.5097V5.59969C12.75 5.22969 12.96 4.88969 13.29 4.70969C15.12 3.71969 17.89 2.83969 19.77 2.67969H19.83C21.03 2.67969 22 3.64969 22 4.84969Z" fill="currentColor"/>
                            <path d="M10.7083 4.70969C8.87828 3.71969 6.10828 2.83969 4.22828 2.67969H4.15828C2.95828 2.67969 1.98828 3.64969 1.98828 4.84969V16.7397C1.98828 17.7097 2.77828 18.5997 3.74828 18.7197L4.05828 18.7597C5.69828 18.9797 8.00828 19.6597 9.86828 20.4397C10.5183 20.7097 11.2383 20.2197 11.2383 19.5097V5.59969C11.2383 5.21969 11.0383 4.88969 10.7083 4.70969ZM4.99828 7.73969H7.24828C7.65828 7.73969 7.99828 8.07969 7.99828 8.48969C7.99828 8.90969 7.65828 9.23969 7.24828 9.23969H4.99828C4.58828 9.23969 4.24828 8.90969 4.24828 8.48969C4.24828 8.07969 4.58828 7.73969 4.99828 7.73969ZM7.99828 12.2397H4.99828C4.58828 12.2397 4.24828 11.9097 4.24828 11.4897C4.24828 11.0797 4.58828 10.7397 4.99828 10.7397H7.99828C8.40828 10.7397 8.74828 11.0797 8.74828 11.4897C8.74828 11.9097 8.40828 12.2397 7.99828 12.2397Z" fill="currentColor"/>
                        </svg>

                        <p className="ml-[24px]">Books</p>
                    </NavLink>
                    <NavLink 
                        to="/admin_users" 
                        className={({ isActive }) => `mb-[12px] flex pl-[40px] items-center w-full h-[48px] font-[500] ${isActive ? "bg-white text-black font-[700]" : ""}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="currentColor"/>
                            <path d="M20.7916 14.7004C19.6716 15.4504 18.1016 15.7304 16.6516 15.5404C17.0316 14.7204 17.2316 13.8104 17.2416 12.8504C17.2416 11.8504 17.0216 10.9004 16.6016 10.0704C18.0816 9.8704 19.6516 10.1504 20.7816 10.9004C22.3616 11.9404 22.3616 13.6504 20.7916 14.7004Z" fill="currentColor"/>
                            <path d="M6.44016 7.77C6.51016 7.76 6.58016 7.76 6.65016 7.77C8.20016 7.72 9.43016 6.45 9.43016 4.89C9.43016 3.29 8.14016 2 6.54016 2C4.95016 2 3.66016 3.29 3.66016 4.89C3.66016 6.45 4.89016 7.72 6.44016 7.77Z" fill="currentColor"/>
                            <path d="M6.55109 12.8506C6.55109 13.8206 6.76109 14.7406 7.14109 15.5706C5.73109 15.7206 4.26109 15.4206 3.18109 14.7106C1.60109 13.6606 1.60109 11.9506 3.18109 10.9006C4.25109 10.1806 5.76109 9.89059 7.18109 10.0506C6.77109 10.8906 6.55109 11.8406 6.55109 12.8506Z" fill="currentColor"/>
                            <path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.56078 10.54 10.0908 9 12.0008 9C13.9008 9 15.4408 10.54 15.4408 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="currentColor"/>
                            <path d="M8.87078 17.9406C7.36078 18.9506 7.36078 20.6106 8.87078 21.6106C10.5908 22.7606 13.4108 22.7606 15.1308 21.6106C16.6408 20.6006 16.6408 18.9406 15.1308 17.9406C13.4208 16.7906 10.6008 16.7906 8.87078 17.9406Z" fill="currentColor"/>
                        </svg>

                        <p className="ml-[24px]">Users</p>
                    </NavLink>
                    <NavLink 
                        to="/admin_branches" 
                        className={({ isActive }) => `mb-[16px] flex pl-[40px] items-center w-full h-[48px] font-[500] ${isActive ? "bg-white text-black font-[700]" : ""}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6 4.15C10.6 4.34 10.44 4.5 10.25 4.5H9.12C6.96 4.5 5.2 6.26 5.2 8.42V17.65C5.2 17.84 5.04 18 4.85 18H4.15C2.96 18 2 17.04 2 15.85V4.15C2 2.96 2.96 2 4.15 2H8.45C9.64 2 10.6 2.96 10.6 4.15Z" fill="currentColor"/>
                            <path d="M22.0004 4.15V15.85C22.0004 17.04 21.0404 18 19.8504 18H19.2204C19.0304 18 18.8704 17.84 18.8704 17.65V8.42C18.8704 6.26 17.1104 4.5 14.9504 4.5H13.7504C13.5604 4.5 13.4004 4.34 13.4004 4.15C13.4004 2.96 14.3604 2 15.5504 2H19.8504C21.0404 2 22.0004 2.96 22.0004 4.15Z" fill="currentColor"/>
                            <path d="M14.9492 6H9.11922C7.77922 6 6.69922 7.08 6.69922 8.42V19.58C6.69922 20.92 7.77922 22 9.11922 22H10.7492C11.0292 22 11.2492 21.78 11.2492 21.5V19C11.2492 18.59 11.5892 18.25 11.9992 18.25C12.4092 18.25 12.7492 18.59 12.7492 19V21.5C12.7492 21.78 12.9692 22 13.2492 22H14.9592C16.2892 22 17.3692 20.92 17.3692 19.59V8.42C17.3692 7.08 16.2892 6 14.9492 6ZM13.9992 14.75H9.99922C9.58922 14.75 9.24922 14.41 9.24922 14C9.24922 13.59 9.58922 13.25 9.99922 13.25H13.9992C14.4092 13.25 14.7492 13.59 14.7492 14C14.7492 14.41 14.4092 14.75 13.9992 14.75ZM13.9992 11.75H9.99922C9.58922 11.75 9.24922 11.41 9.24922 11C9.24922 10.59 9.58922 10.25 9.99922 10.25H13.9992C14.4092 10.25 14.7492 10.59 14.7492 11C14.7492 11.41 14.4092 11.75 13.9992 11.75Z" fill="currentColor"/>
                        </svg>

                        <p className="ml-[24px]">Branches</p>
                    </NavLink>

                </div>

                <div className="mt-[300px]">
                    <button type="button" className="flex" onClick={handleLogout}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z" fill="white"/>
                            <path d="M4.56141 11.2498L6.63141 9.17984C6.78141 9.02984 6.85141 8.83984 6.85141 8.64984C6.85141 8.45984 6.78141 8.25984 6.63141 8.11984C6.34141 7.82984 5.86141 7.82984 5.57141 8.11984L2.22141 11.4698C1.93141 11.7598 1.93141 12.2398 2.22141 12.5298L5.57141 15.8798C5.86141 16.1698 6.34141 16.1698 6.63141 15.8798C6.92141 15.5898 6.92141 15.1098 6.63141 14.8198L4.56141 12.7498H9.00141V11.2498H4.56141Z" fill="white"/>
                        </svg>
                        <p className="ml-[12px] mr-[8px]">Log Out</p>
                    </button>
                </div>
            </div>
            <div className="h-[71px] bg-white justify-between flex w-[calc(100%-222px)] right-0 px-[20px] fixed top-0 ">
                <div className="flex items-center"> 
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="black"/>
                        <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="black"/>
                    </svg>

                    <div className="ml-[16px]">
                        <p className="text-[16px] font-[500]">{localStorage.getItem("fullname")}</p>
                        <p className="text-[12px] font-[500]">{localStorage.getItem("role")}</p>
                    </div>
                </div>
                <div className="flex items-center text-right">
                    <div>
                        <p className="text-[17px] font-[500]">{(new Date()).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}</p>
                        <p className="text-[14px] font-[400]">{(new Date()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p>
                    </div>
                    <div className="ml-[12px] mr-[12px] h-[50px] w-[3px] bg-black"></div>
                    
                    <button onClick={handleSetting}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1 9.2214C18.29 9.2214 17.55 7.9414 18.45 6.3714C18.97 5.4614 18.66 4.3014 17.75 3.7814L16.02 2.7914C15.23 2.3214 14.21 2.6014 13.74 3.3914L13.63 3.5814C12.73 5.1514 11.25 5.1514 10.34 3.5814L10.23 3.3914C9.78 2.6014 8.76 2.3214 7.97 2.7914L6.24 3.7814C5.33 4.3014 5.02 5.4714 5.54 6.3814C6.45 7.9414 5.71 9.2214 3.9 9.2214C2.86 9.2214 2 10.0714 2 11.1214V12.8814C2 13.9214 2.85 14.7814 3.9 14.7814C5.71 14.7814 6.45 16.0614 5.54 17.6314C5.02 18.5414 5.33 19.7014 6.24 20.2214L7.97 21.2114C8.76 21.6814 9.78 21.4014 10.25 20.6114L10.36 20.4214C11.26 18.8514 12.74 18.8514 13.65 20.4214L13.76 20.6114C14.23 21.4014 15.25 21.6814 16.04 21.2114L17.77 20.2214C18.68 19.7014 18.99 18.5314 18.47 17.6314C17.56 16.0614 18.3 14.7814 20.11 14.7814C21.15 14.7814 22.01 13.9314 22.01 12.8814V11.1214C22 10.0814 21.15 9.2214 20.1 9.2214ZM12 15.2514C10.21 15.2514 8.75 13.7914 8.75 12.0014C8.75 10.2114 10.21 8.7514 12 8.7514C13.79 8.7514 15.25 10.2114 15.25 12.0014C15.25 13.7914 13.79 15.2514 12 15.2514Z" fill="black"/>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Taskbar;