import {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance";

interface LoanDetailProps{
    id: string;
    amount: string;
    date: string;
    handleOut: () => void;
    handleReturn: () => void;
}

type Type = {
    id: string;
    fullname: string;
    type: string;
    language: string;
};

const ReturnDetail = ({id, amount, date, handleOut, handleReturn}:LoanDetailProps) => {
    const [list, setList] = useState<Type[]>([]);

    const getList = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7182/api/Loan/loandetail?id=${id}`)
            
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
                            <p className="absolute left-[880px]">Name</p>
                            <p className="absolute left-[1290px]">Type</p>
                            <p className="absolute left-[1470px]">Language</p>
                        </div>
                        <div className="h-[1px] w-[1040px] mt-[36px] bg-[#E3E3E3]"></div>

                        <div className="h-[500px] overflow-y-auto w-full pt-[28px]">
                            {list.map((item)=>
                                <div className="flex mb-[40px]">
                                    <p className="w-[160px] ml-[60px]">{item.id}</p>
                                    <p className="w-[400px] ml-[60px]">{item.fullname}</p>
                                    <p className="w-[200px] ml-[40px]">{item.type}</p>
                                    <p className="w-[100px] ml-[40px]">{item.language}</p>
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
                                onClick= {handleReturn}
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

export default ReturnDetail;