import {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance";

interface LoanDetailProps{
    id: string;
    amount: string;
    date: string;
    handleOut: () => void;
    handleRemove: () => void;
    handleConfirm: () => void;
}

type Type = {
    id: string;
    fullname: string;
    type: string;
    language: string;
};

const BorrowDetail = ({id, amount, date, handleOut, handleRemove, handleConfirm}:LoanDetailProps) => {
    const [list, setList] = useState<Type[]>([]);

    const getList = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7182/api/LoanPreview/getpreview?id=${id}`)
            
            if (response.status = 200){
                setList(response.data);
            } else {
                console.log("Error: " + response.status);
            }
        } catch (error){
            console.error("Error fetching listAdmin: ", error);
        }
        
    }
    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="z-10 absolute flex items-center justify-center pl-[222px] pt-[71px] h-full w-full bg-[#9999]" onClick={handleOut}>
            <div className="" onClick={(e) => e.stopPropagation()}>
                <div className="h-[729px] rounded-[16px] w-[1140px] bg-white flex flex-col justify-center items-center">
                    <div className=" flex flex-col items-center h-[558px] border-1 border-[#E3E3E3] rounded-[16px] w-[1087px]">
                        <div className="flex mt-[16px] text-[19px] font-[500]">
                            <p className="absolute left-[630px]">Book ID</p>
                            <p className="absolute left-[840px]">Name</p>
                            <p className="absolute left-[1220px]">Type</p>
                            <p className="absolute left-[1360px]">Language</p>
                            <p className="absolute left-[1505px]">Action</p>
                        </div>
                        <div className="h-[1px] w-[1040px] mt-[36px] bg-[#E3E3E3]"></div>

                        <div className="h-[500px] overflow-y-auto w-full pt-[28px]">
                            {list.map((item)=>
                                <div className="flex mb-[40px] items-center">
                                    <p className="w-[160px] ml-[60px]">{item.id}</p>
                                    <p className="w-[390px] ml-[40px]">{item.fullname}</p>
                                    <p className="w-[200px]">{item.type}</p>
                                    <p className="w-[100px]">{item.language}</p>
                                    <button 
                                        className="ml-[40px]"
                                        onClick={handleRemove}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="black"/>
                                            <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="black"/>
                                        </svg>
                                    </button>
                                </div>
                            )}
                            
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-[20px] border-1 border-[#E3E3E3] rounded-[16px] w-[1087px] mt-[16px]">
                        <div className="flex items-center py-[12px]">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-[20px] font-[600]">ID</p>
                                <p className="w-[160px] text-center text-[16px]">{id}</p>
                            </div>

                            <div className="h-[80px] w-[2px] bg-black ml-[12px] mr-[12px]"></div>
                            
                            <div>
                                    <div className="flex">
                                        <p className="text-[16px] font-[500]">Total Books:</p> 
                                        <p className="ml-[8px] text-[16px]">{amount} Books</p>
                                    </div>
                                    <div className="flex mt-[16px]">
                                        <p className="text-[16px] font-[500]">Total Books:</p> 
                                        <p className="ml-[8px] text-[16px]">{(new Date(date)).toLocaleDateString("vi-VN")}</p>
                                    </div>
                            
                            </div>
                        </div>
                        <div>
                            <button
                                className="bg-[#D7D7D7] text-black font-[500] rounded-[12px] h-[54px] w-[259px]"
                                onClick= {handleOut}
                            >
                                CANCEL
                            </button>

                            <button 
                                className="bg-black h-[54px] w-[259px] rounded-[12px] text-white font-[500] ml-[20px]"
                                onClick= {handleConfirm}
                            >
                                RETURN
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowDetail;