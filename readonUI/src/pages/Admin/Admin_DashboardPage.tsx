import TaskBar from "../../components/TaskBar";
import PieChartComponent from "../../components/PieChartComponent";
import {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance";


type Type = {
    fullname: string;
    id: string;
    status: string;
};

const formatGuid = (guid: string) => {
    return `${guid.substring(0, 8)}...`;
};

const Admin_DashboardPage = () => {
    const [totalBorrowed, setTotalBorrowed] = useState(); 
    const [totalReturned, setTotalReturned] = useState(); 
    const [totalUser, setTotalUser] = useState();
    const [totalBook, setTotalBook] = useState();
    const [totalBranch, setTotalBranch] = useState();
    const [listAdmin, setListAdmin] = useState<Type[]>([]);
    const [listOverdue, setListOverdue] = useState<Type[]>([]);
    const [listBranch, setListBranch] = useState<Type[]>([]);

    const data = [
        { name:"Total Borrowed Books", value: totalBorrowed||0},
        { name:"Total Returned Books", value: totalReturned||0}
    ];

    const statisticsData = async () => {
        try {
          const response = await axiosInstance.get("https://localhost:7182/api/Loan/dashboard-statistics");
          if (response.status == 200){
              setTotalBorrowed(response.data.totalBorrowed)
              setTotalReturned(response.data.totalReturned)
          }
          else {
            console.log("Error:" + response.status);
          }
        } catch (error) {
          console.error("Error fetching statistics:", error);
        }
    };

    const getTotalUser = async () =>{
        try{
            const response = await axiosInstance.get("https://localhost:7182/api/Account/dashboard-totaluser");
            if (response.status == 200){
                setTotalUser(response.data.toString().padStart(4, "0"))
            } else{
                console.log("Error:" + response.status);
            }
        } catch (error) {
            console.error("Error fetching totalUser:", error);
        }
    }

    const getTotalBook = async () =>{
        try{
            const response = await axiosInstance.get("https://localhost:7182/api/Book/dashboard-totalbook");
            if (response.status == 200){
                setTotalBook(response.data.toString().padStart(4, "0"))
            } else{
                console.log("Error:" + response.status);
            }
        } catch (error) {
            console.error("Error fetching totalBook:", error);
        }
    }

    const getTotalBranch = async () =>{
        try{
            const response = await axiosInstance.get("https://localhost:7182/api/Branch/dashboard-totalbranch");
            if (response.status == 200){
                setTotalBranch(response.data.toString().padStart(4, "0"))
            } else{
                console.log("Error: " + response.status);
            }
        } catch (error) {
            console.error("Error fetching totalBranch: ", error);
        }
    }

    const getListAdmin = async () => {
        try {
            const response = await axiosInstance.get("https://localhost:7182/api/Account/dashboard-admins");
            if (response.status = 200){
                setListAdmin(response.data);
            } else {
                console.log("Error: " + response.status);
            }
        } catch (error){
            console.error("Error fetching listAdmin: ", error);
        }
    }

    const getListOverdue = async () => {
        try {
            const response = await axiosInstance.get("https://localhost:7182/api/Loan/dashboard-overdueborrowers");
            if (response.status = 200){
                setListOverdue(response.data);
            } else {
                console.log("Error: " + response.status);
            }
        } catch (error){
            console.error("Error fetching listAdmin: ", error);
        }
    }

    const getListBranch = async () => {
        try {
            const response = await axiosInstance.get("https://localhost:7182/api/Branch/dashboard-branches");
            if (response.status = 200){
                setListBranch(response.data);
            } else {
                console.log("Error: " + response.status);
            }
        } catch (error){
            console.error("Error fetching listAdmin: ", error);
        }
    }

    useEffect(() => {
            statisticsData();

            getTotalUser();
            getTotalBook();
            getTotalBranch();

            getListAdmin();
            getListOverdue();
            getListBranch();
    }, []);
    


    return (
        <div className="bg-[#F2F2F2] h-screen w-screen select-none">
            <TaskBar></TaskBar>
            <div className="pl-[222px] pt-[71px]"> 
                <div className="flex">
                    <PieChartComponent data = {data}></PieChartComponent>
                    <div className="flex flex-col ml-[60px]">
                        <div className="flex flex-col ml-[40px] w-[420px]">
                            
                            {/* total user base */}
                            <div className="mt-[28px] flex w-full h-[100px] bg-white items-center rounded-[12px] pl-[20px]">
                                <div className="w-[72px] h-[72px] bg-[#D5D5D5] rounded-[8px] flex items-center justify-center">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="black"/>
                                        <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="black"/>
                                    </svg>
                                </div>
                                <div className="ml-[20px] h-[80px] w-[2px] bg-black"></div>
                                <div className="ml-[28px] mt-[-12px]">
                                    <p className="text-[40px] font-[800]">{totalUser}</p>
                                    <p>Total Book Count</p>
                                </div>
                            </div>
                            
                            {/* total book count */}
                            <div className="mt-[16px] flex w-full h-[100px] bg-white items-center rounded-[12px] pl-[20px]">
                                <div className="w-[72px] h-[72px] bg-[#D5D5D5] rounded-[8px] flex items-center justify-center">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 4.84969V16.7397C22 17.7097 21.21 18.5997 20.24 18.7197L19.93 18.7597C18.29 18.9797 15.98 19.6597 14.12 20.4397C13.47 20.7097 12.75 20.2197 12.75 19.5097V5.59969C12.75 5.22969 12.96 4.88969 13.29 4.70969C15.12 3.71969 17.89 2.83969 19.77 2.67969H19.83C21.03 2.67969 22 3.64969 22 4.84969Z" fill="black"/>
                                        <path d="M10.7083 4.70969C8.87828 3.71969 6.10828 2.83969 4.22828 2.67969H4.15828C2.95828 2.67969 1.98828 3.64969 1.98828 4.84969V16.7397C1.98828 17.7097 2.77828 18.5997 3.74828 18.7197L4.05828 18.7597C5.69828 18.9797 8.00828 19.6597 9.86828 20.4397C10.5183 20.7097 11.2383 20.2197 11.2383 19.5097V5.59969C11.2383 5.21969 11.0383 4.88969 10.7083 4.70969ZM4.99828 7.73969H7.24828C7.65828 7.73969 7.99828 8.07969 7.99828 8.48969C7.99828 8.90969 7.65828 9.23969 7.24828 9.23969H4.99828C4.58828 9.23969 4.24828 8.90969 4.24828 8.48969C4.24828 8.07969 4.58828 7.73969 4.99828 7.73969ZM7.99828 12.2397H4.99828C4.58828 12.2397 4.24828 11.9097 4.24828 11.4897C4.24828 11.0797 4.58828 10.7397 4.99828 10.7397H7.99828C8.40828 10.7397 8.74828 11.0797 8.74828 11.4897C8.74828 11.9097 8.40828 12.2397 7.99828 12.2397Z" fill="black"/>
                                    </svg>

                                </div>
                                <div className="ml-[20px] h-[80px] w-[2px] bg-black"></div>
                                <div className="ml-[28px] mt-[-12px]">
                                    <p className="text-[40px] font-[800]">{totalBook}</p>
                                    <p>Branch Count</p>
                                </div>
                            </div>

                            {/* branch count */}
                            <div className="mt-[16px] flex w-full h-[100px] bg-white items-center rounded-[12px] pl-[20px]">
                                <div className="w-[72px] h-[72px] bg-[#D5D5D5] rounded-[8px] flex items-center justify-center">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6 4.15C10.6 4.34 10.44 4.5 10.25 4.5H9.12C6.96 4.5 5.2 6.26 5.2 8.42V17.65C5.2 17.84 5.04 18 4.85 18H4.15C2.96 18 2 17.04 2 15.85V4.15C2 2.96 2.96 2 4.15 2H8.45C9.64 2 10.6 2.96 10.6 4.15Z" fill="black"/>
                                        <path d="M22.0004 4.15V15.85C22.0004 17.04 21.0404 18 19.8504 18H19.2204C19.0304 18 18.8704 17.84 18.8704 17.65V8.42C18.8704 6.26 17.1104 4.5 14.9504 4.5H13.7504C13.5604 4.5 13.4004 4.34 13.4004 4.15C13.4004 2.96 14.3604 2 15.5504 2H19.8504C21.0404 2 22.0004 2.96 22.0004 4.15Z" fill="black"/>
                                        <path d="M14.9492 6H9.11922C7.77922 6 6.69922 7.08 6.69922 8.42V19.58C6.69922 20.92 7.77922 22 9.11922 22H10.7492C11.0292 22 11.2492 21.78 11.2492 21.5V19C11.2492 18.59 11.5892 18.25 11.9992 18.25C12.4092 18.25 12.7492 18.59 12.7492 19V21.5C12.7492 21.78 12.9692 22 13.2492 22H14.9592C16.2892 22 17.3692 20.92 17.3692 19.59V8.42C17.3692 7.08 16.2892 6 14.9492 6ZM13.9992 14.75H9.99922C9.58922 14.75 9.24922 14.41 9.24922 14C9.24922 13.59 9.58922 13.25 9.99922 13.25H13.9992C14.4092 13.25 14.7492 13.59 14.7492 14C14.7492 14.41 14.4092 14.75 13.9992 14.75ZM13.9992 11.75H9.99922C9.58922 11.75 9.24922 11.41 9.24922 11C9.24922 10.59 9.58922 10.25 9.99922 10.25H13.9992C14.4092 10.25 14.7492 10.59 14.7492 11C14.7492 11.41 14.4092 11.75 13.9992 11.75Z" fill="black"/>
                                    </svg>
                                </div>
                                <div className="ml-[20px] h-[80px] w-[2px] bg-black"></div>
                                <div className="ml-[28px] mt-[-12px]">
                                    <p className="text-[40px] font-[800]">{totalBranch}</p>
                                    <p>Total User Base</p>
                                </div>
                            </div>
                        </div>

                        <div className="pb-[16px] pt-[16px] flex w-[460px] rounded-[12px] justify-center flex-col items-center bg-white mt-[24px]">
                            
                            {/* readon admins */}
                            <div className="mb-[8px] text-[22px]">ReadOn Admins</div>

                            <div className="overflow-y-auto min-h-[80px] max-h-[312px]">
                                
                                { Array.isArray(listAdmin) ? listAdmin.map((admin) => (
                                    <div className=" mt-[8px] flex justify-between items-center border-[1px] rounded-[12px] p-[4px] w-[420px]">
                                        <div className="flex items-center h-[60px] bg-[#E4E4E4] pl-[12px] w-[346px] rounded-[8px] ">
                                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.5002 4.11031L13.5102 2.24031C12.6802 1.93031 11.3202 1.93031 10.4902 2.24031L5.50016 4.11031C4.35016 4.54031 3.41016 5.90031 3.41016 7.12031V14.5503C3.41016 15.7303 4.19016 17.2803 5.14016 17.9903L9.44016 21.2003C10.8502 22.2603 13.1702 22.2603 14.5802 21.2003L18.8802 17.9903C19.8302 17.2803 20.6102 15.7303 20.6102 14.5503V7.12031C20.5902 5.90031 19.6502 4.54031 18.5002 4.11031ZM11.9302 7.03031C13.1102 7.03031 14.0702 7.99031 14.0702 9.17031C14.0702 10.3303 13.1602 11.2603 12.0102 11.3003H11.9902H11.9702C11.9502 11.3003 11.9302 11.3003 11.9102 11.3003C10.7102 11.2603 9.81016 10.3303 9.81016 9.17031C9.80016 7.99031 10.7602 7.03031 11.9302 7.03031ZM14.1902 16.3603C13.5802 16.7603 12.7902 16.9703 12.0002 16.9703C11.2102 16.9703 10.4102 16.7703 9.81016 16.3603C9.24016 15.9803 8.93016 15.4603 8.92016 14.8903C8.92016 14.3303 9.24016 13.7903 9.81016 13.4103C11.0202 12.6103 12.9902 12.6103 14.2002 13.4103C14.7702 13.7903 15.0902 14.3103 15.0902 14.8803C15.0802 15.4403 14.7602 15.9803 14.1902 16.3603Z" fill="black"/>
                                            </svg>
                                            <div className="h-[40px] w-[2px] bg-black ml-[12px] mr-[16px]"></div>
                                            <div className="w-[250px]">
                                                <p className="text-[16px] font-[500] mt-[8px]">{admin.fullname}</p>
                                                <div className="justify-between flex">
                                                    <div className="flex">
                                                        <p className="text-[14px]">Admin ID: {formatGuid(admin.id)}</p>
                                                    </div>
                                                    
                                                    <div className="flex items-center mt-[8px] mb-[4px]">
                                                        <div className="h-[8px] w-[8px] bg-black rounded-full"></div>
                                                        <p className="text-[12px] ml-[8px]">{admin.status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="mr-[10px]">
                                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.6914 2.71C21.6114 2.53 21.4714 2.38 21.2814 2.3C21.1914 2.27 21.1014 2.25 21.0014 2.25H17.0014C16.5914 2.25 16.2514 2.59 16.2514 3C16.2514 3.41 16.5914 3.75 17.0014 3.75H19.1914L14.4714 8.47C14.1814 8.76 14.1814 9.24 14.4714 9.53C14.6214 9.68 14.8114 9.75 15.0014 9.75C15.1914 9.75 15.3814 9.68 15.5314 9.53L20.2514 4.81V7C20.2514 7.41 20.5914 7.75 21.0014 7.75C21.4114 7.75 21.7514 7.41 21.7514 7V3C21.7514 2.9 21.7314 2.81 21.6914 2.71Z" fill="black"/>
                                                <path d="M8.47 14.4714L3.75 19.1914V17.0014C3.75 16.5914 3.41 16.2514 3 16.2514C2.59 16.2514 2.25 16.5914 2.25 17.0014V21.0014C2.25 21.1014 2.27 21.1914 2.31 21.2914C2.39 21.4714 2.53 21.6214 2.72 21.7014C2.8 21.7314 2.9 21.7514 3 21.7514H7C7.41 21.7514 7.75 21.4114 7.75 21.0014C7.75 20.5914 7.41 20.2514 7 20.2514H4.81L9.53 15.5314C9.82 15.2414 9.82 14.7614 9.53 14.4714C9.24 14.1814 8.76 14.1814 8.47 14.4714Z" fill="black"/>
                                                <path d="M2.2 14.75C1.85 14.75 1.54 14.5 1.47 14.15C1.33 13.45 1.25 12.72 1.25 12C1.25 6.07 6.07 1.25 12 1.25C12.73 1.25 13.46 1.32 14.17 1.47C14.58 1.55 14.84 1.95 14.76 2.35C14.68 2.76 14.27 3.01 13.88 2.94C13.25 2.81 12.63 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 12.62 2.81 13.25 2.94 13.85C3.02 14.26 2.76 14.65 2.35 14.73C2.3 14.75 2.25 14.75 2.2 14.75Z" fill="black"/>
                                                <path d="M12.001 22.7483C11.271 22.7483 10.541 22.6783 9.83101 22.5283C9.42101 22.4483 9.16101 22.0483 9.24101 21.6483C9.32101 21.2383 9.73101 20.9883 10.121 21.0583C10.731 21.1783 11.361 21.2483 11.991 21.2483C17.091 21.2483 21.241 17.0983 21.241 11.9983C21.241 11.3783 21.181 10.7583 21.061 10.1483C20.981 9.73835 21.241 9.34835 21.651 9.26835C22.061 9.18835 22.451 9.44835 22.531 9.85835C22.671 10.5583 22.741 11.2783 22.741 11.9983C22.751 17.9283 17.931 22.7483 12.001 22.7483Z" fill="black"/>
                                            </svg>
                                        </button>

                                    </div>
                                )): <p>Not found</p>}

                            </div>
                        </div>
                    </div>

                    <div className="ml-[40px]">

                        {/* overdue borrowers */}
                        <div className="pb-[16px] pt-[12px] flex w-[420px] rounded-[12px] justify-center flex-col items-center bg-white mt-[28px]">
                            <div className="mb-[4px] text-[20px]">Overdue Borrowers</div>

                            <div className="overflow-y-auto min-h-[40px] max-h-[270px]">
                                        
                                { Array.isArray(listOverdue) ? listOverdue.map((overdue)=>(
                                    <div className=" mt-[8px] flex justify-between items-center border-[1px] rounded-[12px] p-[4px] w-[380px]">
                                        <div className="flex items-center h-[36px] pl-[8px] w-[310px] rounded-[8px] ">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="black"/>
                                                <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="black"/>
                                            </svg>
                                            <div className="h-[36px] w-[2px] bg-black ml-[8px] mr-[16px]"></div>
                                            <div className="w-[220px]">
                                                <p className="text-[16px] ">{overdue.fullname}</p>
                                                <div className="justify-between flex">
                                                    <div>
                                                        <p className="text-[14px] mt-[-4px]">Borrowed ID: {formatGuid(overdue.id)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="mr-[10px]">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.6914 2.71C21.6114 2.53 21.4714 2.38 21.2814 2.3C21.1914 2.27 21.1014 2.25 21.0014 2.25H17.0014C16.5914 2.25 16.2514 2.59 16.2514 3C16.2514 3.41 16.5914 3.75 17.0014 3.75H19.1914L14.4714 8.47C14.1814 8.76 14.1814 9.24 14.4714 9.53C14.6214 9.68 14.8114 9.75 15.0014 9.75C15.1914 9.75 15.3814 9.68 15.5314 9.53L20.2514 4.81V7C20.2514 7.41 20.5914 7.75 21.0014 7.75C21.4114 7.75 21.7514 7.41 21.7514 7V3C21.7514 2.9 21.7314 2.81 21.6914 2.71Z" fill="black"/>
                                                <path d="M8.47 14.4714L3.75 19.1914V17.0014C3.75 16.5914 3.41 16.2514 3 16.2514C2.59 16.2514 2.25 16.5914 2.25 17.0014V21.0014C2.25 21.1014 2.27 21.1914 2.31 21.2914C2.39 21.4714 2.53 21.6214 2.72 21.7014C2.8 21.7314 2.9 21.7514 3 21.7514H7C7.41 21.7514 7.75 21.4114 7.75 21.0014C7.75 20.5914 7.41 20.2514 7 20.2514H4.81L9.53 15.5314C9.82 15.2414 9.82 14.7614 9.53 14.4714C9.24 14.1814 8.76 14.1814 8.47 14.4714Z" fill="black"/>
                                                <path d="M2.2 14.75C1.85 14.75 1.54 14.5 1.47 14.15C1.33 13.45 1.25 12.72 1.25 12C1.25 6.07 6.07 1.25 12 1.25C12.73 1.25 13.46 1.32 14.17 1.47C14.58 1.55 14.84 1.95 14.76 2.35C14.68 2.76 14.27 3.01 13.88 2.94C13.25 2.81 12.63 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 12.62 2.81 13.25 2.94 13.85C3.02 14.26 2.76 14.65 2.35 14.73C2.3 14.75 2.25 14.75 2.2 14.75Z" fill="black"/>
                                                <path d="M12.001 22.7483C11.271 22.7483 10.541 22.6783 9.83101 22.5283C9.42101 22.4483 9.16101 22.0483 9.24101 21.6483C9.32101 21.2383 9.73101 20.9883 10.121 21.0583C10.731 21.1783 11.361 21.2483 11.991 21.2483C17.091 21.2483 21.241 17.0983 21.241 11.9983C21.241 11.3783 21.181 10.7583 21.061 10.1483C20.981 9.73835 21.241 9.34835 21.651 9.26835C22.061 9.18835 22.451 9.44835 22.531 9.85835C22.671 10.5583 22.741 11.2783 22.741 11.9983C22.751 17.9283 17.931 22.7483 12.001 22.7483Z" fill="black"/>
                                            </svg>
                                        </button>

                                    </div>
                                )): <p>Not found</p>}
                                
                            </div>
                        </div>

                        {/* branch network */}
                        <div className="pb-[16px] pt-[12px] flex w-[420px] rounded-[12px] justify-center flex-col items-center bg-white mt-[24px]">
                            <div className="mb-[2px] text-[20px]">Branch Network</div>

                            <div className="overflow-y-auto min-h-[40px] max-h-[324px]">
                                
                                { Array.isArray(listBranch) ? listBranch.map((branch)=>(
                                    <div className=" mt-[8px] flex justify-between items-center border-[1px] rounded-[12px] p-[4px] w-[380px]">
                                        <div className="flex items-center h-[36px] pl-[8px] w-[310px] rounded-[8px] ">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.6 4.15C10.6 4.34 10.44 4.5 10.25 4.5H9.12C6.96 4.5 5.2 6.26 5.2 8.42V17.65C5.2 17.84 5.04 18 4.85 18H4.15C2.96 18 2 17.04 2 15.85V4.15C2 2.96 2.96 2 4.15 2H8.45C9.64 2 10.6 2.96 10.6 4.15Z" fill="black"/>
                                                <path d="M22.0004 4.15V15.85C22.0004 17.04 21.0404 18 19.8504 18H19.2204C19.0304 18 18.8704 17.84 18.8704 17.65V8.42C18.8704 6.26 17.1104 4.5 14.9504 4.5H13.7504C13.5604 4.5 13.4004 4.34 13.4004 4.15C13.4004 2.96 14.3604 2 15.5504 2H19.8504C21.0404 2 22.0004 2.96 22.0004 4.15Z" fill="black"/>
                                                <path d="M14.9492 6H9.11922C7.77922 6 6.69922 7.08 6.69922 8.42V19.58C6.69922 20.92 7.77922 22 9.11922 22H10.7492C11.0292 22 11.2492 21.78 11.2492 21.5V19C11.2492 18.59 11.5892 18.25 11.9992 18.25C12.4092 18.25 12.7492 18.59 12.7492 19V21.5C12.7492 21.78 12.9692 22 13.2492 22H14.9592C16.2892 22 17.3692 20.92 17.3692 19.59V8.42C17.3692 7.08 16.2892 6 14.9492 6ZM13.9992 14.75H9.99922C9.58922 14.75 9.24922 14.41 9.24922 14C9.24922 13.59 9.58922 13.25 9.99922 13.25H13.9992C14.4092 13.25 14.7492 13.59 14.7492 14C14.7492 14.41 14.4092 14.75 13.9992 14.75ZM13.9992 11.75H9.99922C9.58922 11.75 9.24922 11.41 9.24922 11C9.24922 10.59 9.58922 10.25 9.99922 10.25H13.9992C14.4092 10.25 14.7492 10.59 14.7492 11C14.7492 11.41 14.4092 11.75 13.9992 11.75Z" fill="black"/>
                                            </svg>

                                            <div className="h-[36px] w-[2px] bg-black ml-[8px] mr-[16px]"></div>
                                            <div className="w-[220px]">
                                                <p className="text-[16px] ">{branch.fullname}</p>
                                                <div className="justify-between flex">
                                                    <div>
                                                        <p className="text-[14px] mt-[-4px]">Branch ID: {formatGuid(branch.id)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="mr-[10px]">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.6914 2.71C21.6114 2.53 21.4714 2.38 21.2814 2.3C21.1914 2.27 21.1014 2.25 21.0014 2.25H17.0014C16.5914 2.25 16.2514 2.59 16.2514 3C16.2514 3.41 16.5914 3.75 17.0014 3.75H19.1914L14.4714 8.47C14.1814 8.76 14.1814 9.24 14.4714 9.53C14.6214 9.68 14.8114 9.75 15.0014 9.75C15.1914 9.75 15.3814 9.68 15.5314 9.53L20.2514 4.81V7C20.2514 7.41 20.5914 7.75 21.0014 7.75C21.4114 7.75 21.7514 7.41 21.7514 7V3C21.7514 2.9 21.7314 2.81 21.6914 2.71Z" fill="black"/>
                                                <path d="M8.47 14.4714L3.75 19.1914V17.0014C3.75 16.5914 3.41 16.2514 3 16.2514C2.59 16.2514 2.25 16.5914 2.25 17.0014V21.0014C2.25 21.1014 2.27 21.1914 2.31 21.2914C2.39 21.4714 2.53 21.6214 2.72 21.7014C2.8 21.7314 2.9 21.7514 3 21.7514H7C7.41 21.7514 7.75 21.4114 7.75 21.0014C7.75 20.5914 7.41 20.2514 7 20.2514H4.81L9.53 15.5314C9.82 15.2414 9.82 14.7614 9.53 14.4714C9.24 14.1814 8.76 14.1814 8.47 14.4714Z" fill="black"/>
                                                <path d="M2.2 14.75C1.85 14.75 1.54 14.5 1.47 14.15C1.33 13.45 1.25 12.72 1.25 12C1.25 6.07 6.07 1.25 12 1.25C12.73 1.25 13.46 1.32 14.17 1.47C14.58 1.55 14.84 1.95 14.76 2.35C14.68 2.76 14.27 3.01 13.88 2.94C13.25 2.81 12.63 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 12.62 2.81 13.25 2.94 13.85C3.02 14.26 2.76 14.65 2.35 14.73C2.3 14.75 2.25 14.75 2.2 14.75Z" fill="black"/>
                                                <path d="M12.001 22.7483C11.271 22.7483 10.541 22.6783 9.83101 22.5283C9.42101 22.4483 9.16101 22.0483 9.24101 21.6483C9.32101 21.2383 9.73101 20.9883 10.121 21.0583C10.731 21.1783 11.361 21.2483 11.991 21.2483C17.091 21.2483 21.241 17.0983 21.241 11.9983C21.241 11.3783 21.181 10.7583 21.061 10.1483C20.981 9.73835 21.241 9.34835 21.651 9.26835C22.061 9.18835 22.451 9.44835 22.531 9.85835C22.671 10.5583 22.741 11.2783 22.741 11.9983C22.751 17.9283 17.931 22.7483 12.001 22.7483Z" fill="black"/>
                                            </svg>
                                        </button>

                                    </div>
                                )): <p>Not found</p>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin_DashboardPage;