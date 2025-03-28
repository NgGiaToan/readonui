import {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance";

interface LoanDetailProps{
    id: string;
    object: ("book" | "user"| "branch" | "admin");
    handleOut: () => void;
}

const PopUpView = ({id, object,  handleOut}:LoanDetailProps) => {
    const [key, setKey] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [language, setLanguage] = useState("");
    const [note, setNote] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [location, setLocation] = useState("");

    const getList = async () => {
        if ( object == "book"){
            try {
                const response = await axiosInstance.get(`https://localhost:7182/api/Book/view-book?id=${id}`)
                
                if (response.status = 200){
                    setKey(response.data.id);
                    setName(response.data.name);
                    setType(response.data.type);
                    setLanguage(response.data.language);
                    setNote(response.data.note);
                } else {
                    console.log("Error: " + response.status);
                }
            } catch (error){
                console.error("Error fetching listAdmin: ", error);
            }
        }
        
        if ( object == "user" || "admin"){
            try {
                const response = await axiosInstance.get(`https://localhost:7182/api/Account/view-user?id=${id}`)
                
                if (response.status = 200){
                    setKey(response.data.id);
                    setName(response.data.name);
                    setEmail(response.data.email);
                    setUsername(response.data.username);
                    setNote(response.data.note);
                } else {
                    console.log("Error: " + response.status);
                }
            } catch (error){
                console.error("Error fetching listAdmin: ", error);
            }
        }

        if ( object == "branch"){
            try {
                const response = await axiosInstance.get(`https://localhost:7182/api/Branch/view-branch?id=${id}`)
                
                if (response.status = 200){
                    setKey(response.data.id);
                    setName(response.data.name);
                    setContact(response.data.contactNo);
                    setLocation(response.data.location);
                    setNote(response.data.note);
                } else {
                    console.log("Error: " + response.status);
                }
            } catch (error){
                console.error("Error fetching listAdmin: ", error);
            }
        }
    }
    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="z-10 absolute flex items-center justify-center pl-[222px] pt-[71px] h-full w-full bg-[#9999]" onClick={handleOut}>
            <div className="" onClick={(e) => e.stopPropagation()}>
                
                {/* book */}
                {object =="book" && 
                    <div className="h-[491px] rounded-[16px] w-[627px] bg-white flex flex-col justify-center items-center">
                        
                        <div className="flex items-center">
                            <div className="flex items-center w-[480px]">
                                <div className="bg-[#D7D7D7] flex justify-center items-center w-[60px] h-[60px] rounded-[8px]">
                                    <svg  width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 4.84969V16.7397C22 17.7097 21.21 18.5997 20.24 18.7197L19.93 18.7597C18.29 18.9797 15.98 19.6597 14.12 20.4397C13.47 20.7097 12.75 20.2197 12.75 19.5097V5.59969C12.75 5.22969 12.96 4.88969 13.29 4.70969C15.12 3.71969 17.89 2.83969 19.77 2.67969H19.83C21.03 2.67969 22 3.64969 22 4.84969Z" fill="black"/>
                                        <path d="M10.7083 4.70969C8.87828 3.71969 6.10828 2.83969 4.22828 2.67969H4.15828C2.95828 2.67969 1.98828 3.64969 1.98828 4.84969V16.7397C1.98828 17.7097 2.77828 18.5997 3.74828 18.7197L4.05828 18.7597C5.69828 18.9797 8.00828 19.6597 9.86828 20.4397C10.5183 20.7097 11.2383 20.2197 11.2383 19.5097V5.59969C11.2383 5.21969 11.0383 4.88969 10.7083 4.70969ZM4.99828 7.73969H7.24828C7.65828 7.73969 7.99828 8.07969 7.99828 8.48969C7.99828 8.90969 7.65828 9.23969 7.24828 9.23969H4.99828C4.58828 9.23969 4.24828 8.90969 4.24828 8.48969C4.24828 8.07969 4.58828 7.73969 4.99828 7.73969ZM7.99828 12.2397H4.99828C4.58828 12.2397 4.24828 11.9097 4.24828 11.4897C4.24828 11.0797 4.58828 10.7397 4.99828 10.7397H7.99828C8.40828 10.7397 8.74828 11.0797 8.74828 11.4897C8.74828 11.9097 8.40828 12.2397 7.99828 12.2397Z" fill="black"/>
                                    </svg>
                                </div>

                                <p className="text-[20px] font-[500] ml-[12px]">View Book</p>

                            </div>

                            <svg onClick={handleOut} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16992 14.8299L14.8299 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.8299 14.8299L9.16992 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                        </div>

                        <div className="mt-[20px] h-[1px] w-[530px] bg-black"></div>
                        
                        <div className="mt-[32px] border-1 border-[#B0B0B0] rounded-[16px] w-[531px] h-[205px] flex items-center">
                            <div className="pl-[32px]">
                                
                                <div className="flex">
                                    <p>Book ID:</p>
                                    <p className=" ml-[8px] w-[180px]">{key}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                
                                <div className="flex mt-[12px]">
                                    <p>Name:</p>
                                    <p className=" ml-[8px] w-[240px]">{name}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                <div className="flex mt-[12px]">
                                    <p>Type:</p>
                                    <p className=" ml-[8px] w-[240px]">{type}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                <div className="flex mt-[12px]">
                                    <p>Language:</p>
                                    <p className=" ml-[8px] w-[220px]">{language}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                            </div>
                            <div className="h-[160px] w-[1px] bg-black"></div>
                            <div className="ml-[20px]">
                                <p className="mb-[16px]">Save by:</p>
                                <p>{note}</p>
                                <p>(Admin)</p>
                            </div>
                        </div>  

                            
                        <button 
                            className="bg-black h-[54px] w-[259px] rounded-[12px] text-white font-[500] mt-[40px]"
                            onClick= {handleOut}
                            >
                            CLOSE
                        </button>
                    </div>
                }

                {/* admin */}
                {object =="admin" && 
                    <div className="h-[491px] rounded-[16px] w-[627px] bg-white flex flex-col justify-center items-center">
                        
                        <div className="flex items-center">
                            <div className="flex items-center w-[480px]">
                                <div className="bg-[#D7D7D7] flex justify-center items-center w-[60px] h-[60px] rounded-[8px]">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="black"/>
                                        <path d="M20.7916 14.7004C19.6716 15.4504 18.1016 15.7304 16.6516 15.5404C17.0316 14.7204 17.2316 13.8104 17.2416 12.8504C17.2416 11.8504 17.0216 10.9004 16.6016 10.0704C18.0816 9.8704 19.6516 10.1504 20.7816 10.9004C22.3616 11.9404 22.3616 13.6504 20.7916 14.7004Z" fill="black"/>
                                        <path d="M6.44016 7.77C6.51016 7.76 6.58016 7.76 6.65016 7.77C8.20016 7.72 9.43016 6.45 9.43016 4.89C9.43016 3.29 8.14016 2 6.54016 2C4.95016 2 3.66016 3.29 3.66016 4.89C3.66016 6.45 4.89016 7.72 6.44016 7.77Z" fill="black"/>
                                        <path d="M6.55109 12.8506C6.55109 13.8206 6.76109 14.7406 7.14109 15.5706C5.73109 15.7206 4.26109 15.4206 3.18109 14.7106C1.60109 13.6606 1.60109 11.9506 3.18109 10.9006C4.25109 10.1806 5.76109 9.89059 7.18109 10.0506C6.77109 10.8906 6.55109 11.8406 6.55109 12.8506Z" fill="black"/>
                                        <path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.56078 10.54 10.0908 9 12.0008 9C13.9008 9 15.4408 10.54 15.4408 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="black"/>
                                        <path d="M8.87078 17.9406C7.36078 18.9506 7.36078 20.6106 8.87078 21.6106C10.5908 22.7606 13.4108 22.7606 15.1308 21.6106C16.6408 20.6006 16.6408 18.9406 15.1308 17.9406C13.4208 16.7906 10.6008 16.7906 8.87078 17.9406Z" fill="black"/>
                                    </svg>
                                </div>

                                <p className="text-[20px] font-[500] ml-[12px]">View Admin</p>

                            </div>

                            <svg onClick={handleOut} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16992 14.8299L14.8299 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.8299 14.8299L9.16992 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                        </div>

                        <div className="mt-[20px] h-[1px] w-[530px] bg-black"></div>
                        
                        <div className="mt-[32px] border-1 border-[#B0B0B0] rounded-[16px] w-[531px] h-[205px] flex items-center">
                            <div className="pl-[32px]">
                                
                                <div className="flex">
                                    <p>User ID:</p>
                                    <p className=" ml-[8px] w-[460px]">{key}</p>
                                </div>
                                <div className="h-[1px] w-[460px] bg-[#B0B0B0]"></div>
                                
                                <div className="flex mt-[12px]">
                                    <p>Name:</p>
                                    <p className=" ml-[8px] w-[460px]">{name}</p>
                                </div>
                                <div className="h-[1px] w-[460px] bg-[#B0B0B0]"></div>
                                <div className="flex mt-[12px]">
                                    <p>Email:</p>
                                    <p className=" ml-[8px] w-[460px]">{email}</p>
                                </div>
                                <div className="h-[1px] w-[460px] bg-[#B0B0B0]"></div>
                                <div className="flex mt-[12px]">
                                    <p>Username:</p>
                                    <p className=" ml-[8px] w-[460px]">{username}</p>
                                </div>
                                <div className="h-[1px] w-[460px] bg-[#B0B0B0]"></div>
                            </div>
                        </div>  

                            
                        <button 
                            className="bg-black h-[54px] w-[259px] rounded-[12px] text-white font-[500] mt-[40px]"
                            onClick= {handleOut}
                            >
                            CLOSE
                        </button>
                    </div>
                }

                {/* user */}
                {object =="user" && 
                    <div className="h-[491px] rounded-[16px] w-[627px] bg-white flex flex-col justify-center items-center">
                        
                        <div className="flex items-center">
                            <div className="flex items-center w-[480px]">
                                <div className="bg-[#D7D7D7] flex justify-center items-center w-[60px] h-[60px] rounded-[8px]">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="black"/>
                                        <path d="M20.7916 14.7004C19.6716 15.4504 18.1016 15.7304 16.6516 15.5404C17.0316 14.7204 17.2316 13.8104 17.2416 12.8504C17.2416 11.8504 17.0216 10.9004 16.6016 10.0704C18.0816 9.8704 19.6516 10.1504 20.7816 10.9004C22.3616 11.9404 22.3616 13.6504 20.7916 14.7004Z" fill="black"/>
                                        <path d="M6.44016 7.77C6.51016 7.76 6.58016 7.76 6.65016 7.77C8.20016 7.72 9.43016 6.45 9.43016 4.89C9.43016 3.29 8.14016 2 6.54016 2C4.95016 2 3.66016 3.29 3.66016 4.89C3.66016 6.45 4.89016 7.72 6.44016 7.77Z" fill="black"/>
                                        <path d="M6.55109 12.8506C6.55109 13.8206 6.76109 14.7406 7.14109 15.5706C5.73109 15.7206 4.26109 15.4206 3.18109 14.7106C1.60109 13.6606 1.60109 11.9506 3.18109 10.9006C4.25109 10.1806 5.76109 9.89059 7.18109 10.0506C6.77109 10.8906 6.55109 11.8406 6.55109 12.8506Z" fill="black"/>
                                        <path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.56078 10.54 10.0908 9 12.0008 9C13.9008 9 15.4408 10.54 15.4408 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="black"/>
                                        <path d="M8.87078 17.9406C7.36078 18.9506 7.36078 20.6106 8.87078 21.6106C10.5908 22.7606 13.4108 22.7606 15.1308 21.6106C16.6408 20.6006 16.6408 18.9406 15.1308 17.9406C13.4208 16.7906 10.6008 16.7906 8.87078 17.9406Z" fill="black"/>
                                    </svg>
                                </div>

                                <p className="text-[20px] font-[500] ml-[12px]">View User</p>

                            </div>

                            <svg onClick={handleOut} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16992 14.8299L14.8299 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.8299 14.8299L9.16992 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                        </div>

                        <div className="mt-[20px] h-[1px] w-[530px] bg-black"></div>
                        
                        <div className="mt-[32px] border-1 border-[#B0B0B0] rounded-[16px] w-[531px] h-[205px] flex items-center">
                            <div className="pl-[32px]">
                                
                                <div className="flex">
                                    <p>User ID:</p>
                                    <p className=" ml-[8px] w-[180px]">{key}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                
                                <div className="flex mt-[12px]">
                                    <p>Name:</p>
                                    <p className=" ml-[8px] w-[240px]">{name}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                <div className="flex mt-[12px]">
                                    <p>Email:</p>
                                    <p className=" ml-[8px] w-[240px]">{email}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                <div className="flex mt-[12px]">
                                    <p>Username:</p>
                                    <p className=" ml-[8px] w-[220px]">{username}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                            </div>
                            <div className="h-[160px] w-[1px] bg-black"></div>
                            <div className="ml-[20px]">
                                <p className="mb-[16px]">Save by:</p>
                                <p>{note}</p>
                                <p>(Admin)</p>
                            </div>
                        </div>  

                            
                        <button 
                            className="bg-black h-[54px] w-[259px] rounded-[12px] text-white font-[500] mt-[40px]"
                            onClick= {handleOut}
                            >
                            CLOSE
                        </button>
                    </div>
                }

                {/* branch */}
                {object =="branch" && 
                    <div className="h-[521px] rounded-[16px] w-[627px] bg-white flex flex-col justify-center items-center">
                        
                        <div className="flex items-center">
                            <div className="flex items-center w-[480px]">
                                <div className="bg-[#D7D7D7] flex justify-center items-center w-[60px] h-[60px] rounded-[8px]">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6 4.15C10.6 4.34 10.44 4.5 10.25 4.5H9.12C6.96 4.5 5.2 6.26 5.2 8.42V17.65C5.2 17.84 5.04 18 4.85 18H4.15C2.96 18 2 17.04 2 15.85V4.15C2 2.96 2.96 2 4.15 2H8.45C9.64 2 10.6 2.96 10.6 4.15Z" fill="black"/>
                                        <path d="M22.0004 4.15V15.85C22.0004 17.04 21.0404 18 19.8504 18H19.2204C19.0304 18 18.8704 17.84 18.8704 17.65V8.42C18.8704 6.26 17.1104 4.5 14.9504 4.5H13.7504C13.5604 4.5 13.4004 4.34 13.4004 4.15C13.4004 2.96 14.3604 2 15.5504 2H19.8504C21.0404 2 22.0004 2.96 22.0004 4.15Z" fill="black"/>
                                        <path d="M14.9492 6H9.11922C7.77922 6 6.69922 7.08 6.69922 8.42V19.58C6.69922 20.92 7.77922 22 9.11922 22H10.7492C11.0292 22 11.2492 21.78 11.2492 21.5V19C11.2492 18.59 11.5892 18.25 11.9992 18.25C12.4092 18.25 12.7492 18.59 12.7492 19V21.5C12.7492 21.78 12.9692 22 13.2492 22H14.9592C16.2892 22 17.3692 20.92 17.3692 19.59V8.42C17.3692 7.08 16.2892 6 14.9492 6ZM13.9992 14.75H9.99922C9.58922 14.75 9.24922 14.41 9.24922 14C9.24922 13.59 9.58922 13.25 9.99922 13.25H13.9992C14.4092 13.25 14.7492 13.59 14.7492 14C14.7492 14.41 14.4092 14.75 13.9992 14.75ZM13.9992 11.75H9.99922C9.58922 11.75 9.24922 11.41 9.24922 11C9.24922 10.59 9.58922 10.25 9.99922 10.25H13.9992C14.4092 10.25 14.7492 10.59 14.7492 11C14.7492 11.41 14.4092 11.75 13.9992 11.75Z" fill="black"/>
                                    </svg>
                                </div>

                                <p className="text-[20px] font-[500] ml-[12px]">View Branch</p>

                            </div>

                            <svg onClick={handleOut} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16992 14.8299L14.8299 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.8299 14.8299L9.16992 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                        </div>

                        <div className="mt-[20px] h-[1px] w-[530px] bg-black"></div>
                        
                        <div className="mt-[32px] border-1 border-[#B0B0B0] rounded-[16px] w-[531px] h-[255px] flex items-center">
                            <div className="pl-[32px]">
                                
                                <div className="flex">
                                    <p>Branch ID:</p>
                                    <p className=" ml-[8px] w-[180px]">{key}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                
                                <div className="flex mt-[12px]">
                                    <p>Name:</p>
                                    <p className=" ml-[8px] w-[240px]">{name}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                <div className="flex mt-[12px]">
                                    <p>Contact No:</p>
                                    <p className=" ml-[8px] w-[240px]">{contact}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                                <div className="flex mt-[12px]">
                                    <p>Location:</p>
                                    <p className=" ml-[8px] w-[220px]">{location}</p>
                                </div>
                                <div className="h-[1px] w-[260px] bg-[#B0B0B0]"></div>
                            </div>
                            <div className="h-[160px] w-[1px] bg-black"></div>
                            <div className="ml-[20px]">
                                <p className="mb-[16px]">Save by:</p>
                                <p>{note}</p>
                                <p>(Admin)</p>
                            </div>
                        </div>  

                            
                        <button 
                            className="bg-black h-[54px] w-[259px] rounded-[12px] text-white font-[500] mt-[40px]"
                            onClick= {handleOut}
                            >
                            CLOSE
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default PopUpView;