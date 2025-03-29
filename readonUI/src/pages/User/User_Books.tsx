import Searching from "../../components/Searching";
import TaskBar from "../../components/UserTaskBar";
import {useState, useEffect} from 'react';
import axiosInstance from "../../utils/axiosInstance";
import PopUpAdd from "../../components/PopUp/PopUpAdd";
import PopUpUpdate from "../../components/PopUp/PopUpUpdate";
import PopUpView from "../../components/PopUp/PopUpView";
import PopUpDelete from "../../components/PopUp/PopUpDelete";
import { nanoid } from "nanoid"; 

type Type = {
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
    const [choice, setChoice] = useState("");
    const [render, setRender] = useState("");
    const [list, setList] = useState<Type[]>([]);
    const [addPopUp, setAddPopUp] = useState(false);
    const [updatePopUp, setUpdatePopUp] = useState(false);
    const [viewPopUp, setViewPopUp] = useState(false);
    const [removePopUp, setRemovePopUp] = useState(false);

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

    useEffect(() => {
        getList();
    }, [search, render]);

    const handleClick = (id:string) =>{
        setChoice(id);
    }

    return (
        <div className="bg-[#F2F2F2] h-screen w-screen select-none">
            <TaskBar dashboard={false}></TaskBar>
            
            {/* Add Book */}
            {addPopUp && <PopUpAdd  object= {"book"} handleOut={()=>setAddPopUp(false)} handleConfirm={()=>setRender(nanoid())}></PopUpAdd>}

            {/* Update Book */}
            {updatePopUp && <PopUpUpdate object= {"book"} handleOut={()=>setUpdatePopUp(false)} id={choice} handleConfirm={()=>setRender(nanoid())}></PopUpUpdate>}

            {/* View Book */}
            {viewPopUp && <PopUpView object= {"book"} handleOut={()=>setViewPopUp(false)} id={choice}></PopUpView>}
            
            {/* Remove Book */}
            {removePopUp && <PopUpDelete object= {"book"} handleOut={()=> setRemovePopUp(false)} id={choice} handleConfirm={()=>setRender(nanoid())}></PopUpDelete>}

            <div className="pl-[222px] pt-[71px]">
            <div className="flex justify-between pt-[28px] px-[20px]">
                    <p className="text-[28px] font-[500] ml-[12px]">Book Management</p>
                    <div className="flex items-center ">
                        <button
                            onClick={()=> setAddPopUp(true)} 
                            className="flex items-center rounded-[12px] pl-[12px] mr-[24px] w-[138px] h-[44px] bg-black text-white"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="white"/>
                            </svg>
                            <p className="ml-[8px]">Add Book</p>
                            
                        </button>
                        <Searching 
                            text="Search by ID or Type"
                            searching = {(e) => setSearch(e)}
                        ></Searching>
                    </div>
                </div>

                <div className="p-[20px]">
                    <div className="bg-white w-full p-[20px] rounded-[20px]">
                        <div className="flex pt-[12px]">
                            <p className="left-[360px] absolute">ID</p>
                            <p className="left-[640px] absolute">Name</p>
                            <p className="left-[950px] absolute">Type</p>
                            <p className="left-[1200px] absolute">Language</p>
                            <p className="left-[1490px] absolute">Availability</p>
                            <p className="left-[1765px] absolute">Action</p>
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
                                        <button className="w-[40px] ml-[40px]"
                                            onClick={()=>setUpdatePopUp(true)}
                                        >
                                            <svg onClick={()=>handleClick(item.id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="black"/>
                                                <path d="M19.0206 3.48162C17.0806 1.54162 15.1806 1.49162 13.1906 3.48162L11.9806 4.69162C11.8806 4.79162 11.8406 4.95162 11.8806 5.09162C12.6406 7.74162 14.7606 9.86162 17.4106 10.6216C17.4506 10.6316 17.4906 10.6416 17.5306 10.6416C17.6406 10.6416 17.7406 10.6016 17.8206 10.5216L19.0206 9.31162C20.0106 8.33162 20.4906 7.38162 20.4906 6.42162C20.5006 5.43162 20.0206 4.47162 19.0206 3.48162Z" fill="black"/>
                                                <path d="M15.6103 11.5309C15.3203 11.3909 15.0403 11.2509 14.7703 11.0909C14.5503 10.9609 14.3403 10.8209 14.1303 10.6709C13.9603 10.5609 13.7603 10.4009 13.5703 10.2409C13.5503 10.2309 13.4803 10.1709 13.4003 10.0909C13.0703 9.81086 12.7003 9.45086 12.3703 9.05086C12.3403 9.03086 12.2903 8.96086 12.2203 8.87086C12.1203 8.75086 11.9503 8.55086 11.8003 8.32086C11.6803 8.17086 11.5403 7.95086 11.4103 7.73086C11.2503 7.46086 11.1103 7.19086 10.9703 6.91086C10.9491 6.86547 10.9286 6.8203 10.9088 6.7754C10.7612 6.44208 10.3265 6.34463 10.0688 6.60239L4.34032 12.3309C4.21032 12.4609 4.09032 12.7109 4.06032 12.8809L3.52032 16.7109C3.42032 17.3909 3.61032 18.0309 4.03032 18.4609C4.39032 18.8109 4.89032 19.0009 5.43032 19.0009C5.55032 19.0009 5.67032 18.9909 5.79032 18.9709L9.63032 18.4309C9.81032 18.4009 10.0603 18.2809 10.1803 18.1509L15.9016 12.4296C16.1612 12.17 16.0633 11.7246 15.7257 11.5805C15.6877 11.5643 15.6492 11.5477 15.6103 11.5309Z" fill="black"/>
                                            </svg>
                                        </button>
                                        
                                        <button className="w-[40px]"
                                            onClick={()=>setViewPopUp(true)}
                                        >
                                            <svg onClick={()=>handleClick(item.id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.5 3.67C19.5 3.66 19.5 3.65 19.48 3.64C19.26 3.36 18.97 3.21 18.63 3.21C18.1 3.21 17.46 3.56 16.77 4.3C15.95 5.18 14.69 5.11 13.97 4.15L12.96 2.81C12.56 2.27 12.03 2 11.5 2C10.97 2 10.44 2.27 10.04 2.81L9.02 4.16C8.31 5.11 7.06 5.18 6.24 4.31L6.23 4.3C5.1 3.09 4.09 2.91 3.52 3.64C3.5 3.65 3.5 3.66 3.5 3.67C3.14 4.44 3 5.52 3 7.04V16.96C3 18.48 3.14 19.56 3.5 20.33C3.5 20.34 3.51 20.36 3.52 20.37C4.1 21.09 5.1 20.91 6.23 19.7L6.24 19.69C7.06 18.82 8.31 18.89 9.02 19.84L10.04 21.19C10.44 21.73 10.97 22 11.5 22C12.03 22 12.56 21.73 12.96 21.19L13.97 19.85C14.69 18.89 15.95 18.82 16.77 19.7C17.46 20.44 18.1 20.79 18.63 20.79C18.97 20.79 19.26 20.65 19.48 20.37C19.49 20.36 19.5 20.34 19.5 20.33C19.86 19.56 20 18.48 20 16.96V7.04C20 5.52 19.86 4.44 19.5 3.67ZM14 14.5H8C7.59 14.5 7.25 14.16 7.25 13.75C7.25 13.34 7.59 13 8 13H14C14.41 13 14.75 13.34 14.75 13.75C14.75 14.16 14.41 14.5 14 14.5ZM16 11H8C7.59 11 7.25 10.66 7.25 10.25C7.25 9.84 7.59 9.5 8 9.5H16C16.41 9.5 16.75 9.84 16.75 10.25C16.75 10.66 16.41 11 16 11Z" fill="black"/>
                                            </svg>
                                        </button>
                                        
                                        <button className="w-[40px]"
                                            onClick={()=>setRemovePopUp(true)}
                                        >
                                            <svg onClick={()=>handleClick(item.id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="black"/>
                                                <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="black"/>
                                            </svg>
                                        </button>
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