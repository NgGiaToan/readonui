import Searching from "../../components/Searching";
import SwitchButtons from "../../components/SwitchButtons";
import TaskBar from "../../components/UserTaskBar";
import {useState, useEffect} from 'react';
import axiosInstance from "../../utils/axiosInstance";
import LoanDetail from "../../components/DetailView/LoanDetail";

type Type = {
    id: string;
    userId: string;
    amount: string;
    dueDate: string;
    time: string;
};

type ChoiceType = {
    id: string;
    amount : string;
    date: string;
}

const formatGuid = (guid: string) => {
    return <div>
        <p>{guid.substring(0, 18)}</p>
        {guid.substring(18, 36)}
    </div>
};
const User_Catalog = () =>{
    const [view, setView] = useState<"borrowed" | "overdueborrowers">("borrowed");
    const [search, setSearch] = useState("");
    const [choice, setChoice] = useState<ChoiceType>({ id: "", amount: "", date: "" });
    const [list, setList] = useState<Type[]>([]);

    const getList = async () => {
        try {
            const response = await axiosInstance.get(`https://localhost:7182/api/Loan/${view}?n=${search}`);
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
    }, [search, view]);

    const handleClick = (id:string, amount: string, date: string) =>{
        setChoice({ id, amount, date });
    }

    return (
        <div className="bg-[#F2F2F2] h-screen w-screen select-none">
            <TaskBar dashboard={false}></TaskBar>
            {choice['id'] && <LoanDetail handleOut={()=>setChoice({ id: "", amount: "", date: "" })} id={choice['id']} amount={choice['amount']} date={choice['date']}></LoanDetail>}
            <div className="pl-[93px] pt-[71px] w-full">
                <div className="flex justify-between pt-[28px] px-[20px]">
                    <SwitchButtons 
                        button1_name="Borrowed Books" 
                        button2_name="Overdue Borrowers" 
                        onClick1={() => setView("borrowed")}
                        onClick2={() => setView("overdueborrowers")}
                    ></SwitchButtons>
                    <Searching 
                        text="Search by ID"
                        searching = {(e) => setSearch(e)}
                    ></Searching>
                </div>

                <div className="p-[20px] w-[calc(100%-113px)]">
                    <div className="bg-white w-full p-[20px] rounded-[20px]">
                        <div className="flex pt-[12px]">
                            <p className="left-[360px] absolute">ID</p>
                            <p className="left-[650px] absolute">User ID</p>
                            <p className="left-[950px] absolute">Amount</p>
                            <p className="left-[1200px] absolute">Due Date</p>
                            <p className="left-[1490px] absolute">Date & Time</p>
                            <p className="left-[1590px] absolute">Action</p>
                        </div>

                        <div className=" bg-[#AAA] h-[2px] w-full mt-[40px]"></div>
                        
                        {(!list || list.length === 0) ? (
                            <p className="text-gray-500 mt-[32px] text-[18px] ml-[20px] ">No data available</p>
                        ) :(
                            <div className="overflow-y-auto max-h-[600px] min-h-[200px]">
                                { Array.isArray(list) ?  list.map((item)=>(
                                    <div className="flex pl-[40px] mt-[80px] mb-[40px] items-center relative">
                                        <p className="absolute">{formatGuid(item.id)}</p>
                                        <p className="left-[340px] absolute">{formatGuid(item.userId)}</p>
                                        <p className="left-[690px] absolute flex">{item.amount.toString().padStart(2, "0")} <p className="ml-[8px]">Book</p></p>
                                        <p className="left-[940px] absolute">{(new Date(item.dueDate)).toLocaleDateString("vi-VN")}</p>
                                        <p className="left-[1200px] absolute">{(new Date(item.time)).toLocaleString("en-GB", 
                                        { 
                                            day: "2-digit", month: "2-digit", year: "numeric", 
                                            hour: "2-digit", minute: "2-digit", second: "2-digit" 
                                        })}</p>
                                        <p className="left-[1540px] absolute">
                                            <svg onClick={()=>handleClick(item.id, item.amount, item.dueDate)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.5 3.67C19.5 3.66 19.5 3.65 19.48 3.64C19.26 3.36 18.97 3.21 18.63 3.21C18.1 3.21 17.46 3.56 16.77 4.3C15.95 5.18 14.69 5.11 13.97 4.15L12.96 2.81C12.56 2.27 12.03 2 11.5 2C10.97 2 10.44 2.27 10.04 2.81L9.02 4.16C8.31 5.11 7.06 5.18 6.24 4.31L6.23 4.3C5.1 3.09 4.09 2.91 3.52 3.64C3.5 3.65 3.5 3.66 3.5 3.67C3.14 4.44 3 5.52 3 7.04V16.96C3 18.48 3.14 19.56 3.5 20.33C3.5 20.34 3.51 20.36 3.52 20.37C4.1 21.09 5.1 20.91 6.23 19.7L6.24 19.69C7.06 18.82 8.31 18.89 9.02 19.84L10.04 21.19C10.44 21.73 10.97 22 11.5 22C12.03 22 12.56 21.73 12.96 21.19L13.97 19.85C14.69 18.89 15.95 18.82 16.77 19.7C17.46 20.44 18.1 20.79 18.63 20.79C18.97 20.79 19.26 20.65 19.48 20.37C19.49 20.36 19.5 20.34 19.5 20.33C19.86 19.56 20 18.48 20 16.96V7.04C20 5.52 19.86 4.44 19.5 3.67ZM14 14.5H8C7.59 14.5 7.25 14.16 7.25 13.75C7.25 13.34 7.59 13 8 13H14C14.41 13 14.75 13.34 14.75 13.75C14.75 14.16 14.41 14.5 14 14.5ZM16 11H8C7.59 11 7.25 10.66 7.25 10.25C7.25 9.84 7.59 9.5 8 9.5H16C16.41 9.5 16.75 9.84 16.75 10.25C16.75 10.66 16.41 11 16 11Z" fill="black"/>
                                            </svg>
                                        </p>
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

export default User_Catalog;