import Searching from "../../components/Searching";
import TaskBar from "../../components/UserTaskBar";
import {useState, useEffect} from 'react';
import axiosInstance from "../../utils/axiosInstance";
import { nanoid } from "nanoid"; 
import BorrowDetail from "../../components/DetailView/BorrowDetail";

type Type =
 {
    id: string;
    fullname: string;
    type: string;
    language: string;
    availability: string;
};


const formatGuid = (guid: string) => {
    return <div>
        <p>{guid.substring(0, 18)}</p>
        {guid.substring(18, 36)}
    </div>
};
const User_Books = () =>{
    const [search, setSearch] = useState("");
    const [choice, setChoice] = useState("")
    const [render, setRender] = useState("");
    const [list, setList] = useState<Type[]>([]);

    const [isChecked, setIsChecked] = useState<string[]>([]);

    const getList = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7182/api/Book/books?n=${search}`);
            if (response.status = 200){
                setList(response.data);
            } else {
                console.log("Error: " + response.status);
            }
        } catch (error){
            console.error("Error fetching listAdmin: ", error);
        }
    }
    
    var id = localStorage.getItem("id");        
    
    const getIsCheck = async () =>{
        
        try {
            const response = await axiosInstance.get(`https://localhost:7182/api/LoanPreview/getpreview?id=${id}`);
            if (response.status = 200){
                setIsChecked(response.data.map((item: { applicationAccountId: string; bookId: string }) => item.bookId));
            } else {
                console.log("Error: " + response.status);
            }
        } catch (error){
            console.log("Error fetching listAdmin: ", error);
        }
    }
    
    useEffect(() => {
        
        getIsCheck();
        getList();
    }, [search,render]);

    const handleClick = async (n:string) =>{
        if (Array.isArray(isChecked) && isChecked.includes(n)){
            try {
                const response = await axiosInstance.delete(`https://localhost:7182/api/LoanPreview/remove-preview?id=${id}&bookId=${n}`);
                if (response.status = 200){
                    setIsChecked((prev) => prev.filter(item => item !== n));
                    setRender(nanoid());
                } else {
                    console.log("Error: " + response.status);
                }
            } catch (error) {
                console.log("Error fetching listAdmin: ", error);
            }
        }
        else {
            try {
                const response = await axiosInstance.post(`https://localhost:7182/api/LoanPreview/add-preview?id=${id}&bookId=${n}`);
                if (response.status = 200){
                    setIsChecked(prev => [...prev, n]);
                    setRender(nanoid());
                } else {
                    console.log("Error: " + response.status);
                }
            } catch (error) {
                console.log("Error fetching listAdmin: ", error);
            }
        }
    }

    const handleExit = async () =>{
        await setRender(nanoid());
        await setChoice("");
    }

    return (
        <div className="bg-[#F2F2F2] h-screen w-screen select-none">
            <TaskBar dashboard={false}></TaskBar>
            {choice  && <BorrowDetail handleRemove={(n)=>handleClick(n)} handleOut={handleExit} id={choice}></BorrowDetail>}
            

            <div className="pl-[93px] pt-[71px] w-full">
            <div className="flex justify-between pt-[28px] px-[20px]">
                    <p className="text-[28px] font-[500] ml-[12px]">Book Management</p>
                    <div className="flex items-center ">
                        <button
                            onClick={()=> setChoice(id ?? "")} 
                            className="flex items-center rounded-[12px] pl-[12px] mr-[32px] w-[120px] h-[44px] bg-black text-white"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="white"/>
                            </svg>
                            <p className="ml-[12px]">Acquire</p>
                            
                        </button>
                        <Searching 
                            text="Search by ID or Type"
                            searching = {(e) => setSearch(e)}
                        ></Searching>
                    </div>
                </div>

                <div className="p-[20px] w-[calc(100%-113px)]">
                    <div className="bg-white w-full p-[20px] rounded-[20px]">
                        <div className="flex pt-[12px]">
                            <p className="left-[250px] absolute">ID</p>
                            <p className="left-[530px] absolute">Name</p>
                            <p className="left-[820px] absolute">Type</p>
                            <p className="left-[1080px] absolute">Language</p>
                            <p className="left-[1360px] absolute">Availability</p>
                            <p className="left-[1620px] absolute">Action</p>
                        </div>

                        <div className=" bg-[#AAA] h-[2px] w-full mt-[40px]"></div>
                        
                        {(!list || list.length === 0) ? (
                            <p className="text-gray-500 mt-[32px] text-[18px] ml-[20px] ">No data available</p>
                        ) :(
                            <div className="overflow-y-auto max-h-[600px] min-h-[200px]">
                                { Array.isArray(list) ? list.map((item)=>(
                                    <div className="flex pl-[40px] mt-[80px] mb-[40px] items-center relative">
                                        <p className="w-[240px]">{formatGuid(item.id)}</p>
                                        <p className="w-[300px] ml-[40px]">{item.fullname}</p>
                                        <p className="w-[250px] ml-[40px]">{item.type}</p>
                                        <p className="w-[200px] ml-[40px]">{item.language}</p>
                                        <p className="w-[200px] ml-[85px]">{item.availability}</p>
                                        {(item.availability=="Available") && 
                                        <button className="ml-[65px]">
                                            <input 
                                                className="h-[16px] w-[16px]"
                                                type="checkbox" 
                                                checked= {isChecked.includes(item.id)}
                                                onClick={()=> handleClick(item.id)} 
                                            ></input>
                                        </button>}
                                    </div>
                                )): <p>Not found</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User_Books;