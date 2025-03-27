import axiosInstance from "../../utils/axiosInstance";

interface LoanDetailProps{
    id: string;
    object: ("book" | "user"| "branch");
    handleConfirm: () => void;
    handleOut: () => void;
}

const PopUpDelete = ({id, object, handleOut, handleConfirm}:LoanDetailProps) => {

    const handleDelete = async () =>{
        
        handleOut();
        if (object == "book")
        try{
            const response = await axiosInstance.delete(`https://localhost:7182/api/Book/delete-book?id=${id}`)
            if (response.status = 200){
                handleConfirm();
                console.log("Successfully");
            } else {
                console.log("Error: " + response.status);
            }
        } catch (error){
            console.error("Error: ", error);
        }
    }

    return (
        <div className="z-10 absolute flex items-center justify-center pl-[222px] pt-[71px] h-full w-full bg-[#9999]" onClick={handleOut}>
            <div className="" onClick={(e) => e.stopPropagation()}>
                <div className="h-[393px] rounded-[16px] w-[627px] bg-white flex flex-col justify-center items-center">
                    <div className="flex items-center">
                        <div className="flex items-center w-[480px]">
                            <div className="bg-[#D7D7D7] flex justify-center items-center w-[60px] h-[60px] rounded-[8px]">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="black"/>
                                    <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="black"/>
                                </svg>

                            </div>

                            <p className="text-[20px] font-[500] ml-[12px]">Delete Confirmation</p>

                        </div>

                        <svg onClick={handleOut} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16992 14.8299L14.8299 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.8299 14.8299L9.16992 9.16992" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </div>

                    <div className="mt-[20px] h-[1px] w-[530px] bg-black"></div>
                    
                    <div className="flex items-center h-[140px] w-[270px]">
                        <p>"Are you certain you wish to proceed with the deletion of the selected entry?"</p>
                    </div>  

                        
                    <button 
                        className="bg-black h-[54px] w-[259px] rounded-[12px] text-white font-[500] mt-[40px]"
                        onClick= {handleDelete}
                    >
                        CONFIRM
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default PopUpDelete;