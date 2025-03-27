import {useState, useEffect} from "react";
import axiosInstance from "../../utils/axiosInstance";

interface LoanDetailProps{
    id: string;
    object: ("book" | "user"| "branch");
    handleOut: () => void;
    handleConfirm: () => void;
}

const PopUpUpdate = ({id, object, handleOut, handleConfirm}:LoanDetailProps) => {
    const [err, setErr] = useState("");
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(Number);

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        if ( object == "book"){
            try {
                const response = await axiosInstance.get(`https://localhost:7182/api/Book/view-book?id=${id}`)
                
                if (response.status = 200){
                    console.log(response.data)
                    setName(response.data.name);
                    setLanguage(response.data.language);
                    setType(response.data.type);
                    setQuantity(response.data.quantity);
                } else {
                    console.log("Error: " + response.status);
                }
            } catch (error){
                console.error("Error fetching listAdmin: ", error);
            }
        }
        
        
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if ( object == "book"){
            try {
                const response = await axiosInstance.put(`https://localhost:7182/api/Book/update-book?id=${id}`,
                    {
                        name,
                        language,
                        type,
                        quantity
                    },
                    {
                        headers: {
                            "Accept": "*/*",
                            "Content-Type": "application/json"
                        },
                    });
                    
                    
                    console.log(response.status);
                    
                if (response.status = 201){
                    setErr("Update Book Successfully!")
                    setTimeout(handleOut,500);
                    handleConfirm();
                } else {
                    setErr(response.data.message)
                    console.log("Error: " + response.status);
                }
            } catch (error){
                setErr((error as any)?.response?.data?.message|| "Data is Incorrect!")
                console.error("Error fetching: ",error);
            }
        }
        
        
    }
    

    return (
        <div className="z-10 absolute flex items-center justify-center pl-[222px] pt-[71px] h-full w-full bg-[#9999]" onClick={handleOut}>
            <div className="" onClick={(e) => e.stopPropagation()}>
                
                {/* book */}
                {object=="book" && 
                    
                    <div className="h-[491px] rounded-[16px] w-[627px] bg-white flex flex-col justify-center items-center">
                        <div className="flex items-center">
                            <div className="flex items-center w-[480px]">
                                <div className="bg-[#D7D7D7] flex justify-center items-center w-[60px] h-[60px] rounded-[8px]">
                                    <svg  width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 4.84969V16.7397C22 17.7097 21.21 18.5997 20.24 18.7197L19.93 18.7597C18.29 18.9797 15.98 19.6597 14.12 20.4397C13.47 20.7097 12.75 20.2197 12.75 19.5097V5.59969C12.75 5.22969 12.96 4.88969 13.29 4.70969C15.12 3.71969 17.89 2.83969 19.77 2.67969H19.83C21.03 2.67969 22 3.64969 22 4.84969Z" fill="black"/>
                                        <path d="M10.7083 4.70969C8.87828 3.71969 6.10828 2.83969 4.22828 2.67969H4.15828C2.95828 2.67969 1.98828 3.64969 1.98828 4.84969V16.7397C1.98828 17.7097 2.77828 18.5997 3.74828 18.7197L4.05828 18.7597C5.69828 18.9797 8.00828 19.6597 9.86828 20.4397C10.5183 20.7097 11.2383 20.2197 11.2383 19.5097V5.59969C11.2383 5.21969 11.0383 4.88969 10.7083 4.70969ZM4.99828 7.73969H7.24828C7.65828 7.73969 7.99828 8.07969 7.99828 8.48969C7.99828 8.90969 7.65828 9.23969 7.24828 9.23969H4.99828C4.58828 9.23969 4.24828 8.90969 4.24828 8.48969C4.24828 8.07969 4.58828 7.73969 4.99828 7.73969ZM7.99828 12.2397H4.99828C4.58828 12.2397 4.24828 11.9097 4.24828 11.4897C4.24828 11.0797 4.58828 10.7397 4.99828 10.7397H7.99828C8.40828 10.7397 8.74828 11.0797 8.74828 11.4897C8.74828 11.9097 8.40828 12.2397 7.99828 12.2397Z" fill="black"/>
                                    </svg>
                                </div>

                                <p className="text-[20px] font-[500] ml-[12px]">Update Book</p>

                            </div>

                            <svg onClick={handleOut} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16992 14.8299L14.8299 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.8299 14.8299L9.16992 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                        </div>

                        <div className="mt-[20px] h-[1px] w-[530px] bg-black"></div>
                        
                        <div className="mt-[32px] h-[290px] ml-[90px]">
                            <form onSubmit={handleUpdate}>
                                <input
                                    value = {name}
                                    required
                                    className="pl-[16px] w-[441px] h-[42px] border-1 border-[#3E3E3E] rounded-[12px]"
                                    placeholder="Name" 
                                    onChange={(e)=> setName(e.target.value)}
                                ></input>

                                <input
                                    value = {language}
                                    required
                                    className="mt-[20px] pl-[16px] w-[441px] h-[42px] border-1 border-[#3E3E3E] rounded-[12px]"
                                    placeholder="Language" 
                                    onChange={(e)=> setLanguage(e.target.value)}
                                ></input>

                                <input
                                    value = {type}
                                    required
                                    className="mt-[20px] pl-[16px] w-[293px] h-[42px] border-1 border-[#3E3E3E] rounded-[12px]"
                                    placeholder="Type" 
                                    onChange={(e)=> setType(e.target.value)}
                                ></input>

                                <input
                                    value = {quantity}
                                    required
                                    className="pl-[16px] w-[133px] h-[42px] ml-[15px] border-1 border-[#3E3E3E] rounded-[12px]"
                                    placeholder="Quantity" 
                                    onChange={(e)=> setQuantity(parseInt(e.target.value, 10))}
                                ></input>
                            
                                <div className="absolute text-[red] top-[570px] w-[440px] left-[848px] text-right">
                                    <p className={err=="Update Book Successfully!" ? "text-[green]":""}>{err}</p>
                                </div>
                                <div className="ml-[-44px]">
                                    <button 
                                        className="h-[54px] w-[259px] rounded-[12px] bg-[#D7D7D7] font-[500] mt-[40px]"
                                        onClick= {handleOut}
                                        >
                                        CANCEL
                                    </button>

                                    <button 
                                        className="ml-[16px] bg-black h-[54px] w-[259px] rounded-[12px] text-white font-[500]"
                                        type= "submit"
                                        >
                                        ADD
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>  

                }

                
            </div>
        </div>
    )
}

export default PopUpUpdate;