import TaskBar from "../../components/UserTaskBar";
import PieChartComponent from "../../components/PieChartComponent";
import {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance";

const User_DashboardPage = () => {
    const [totalBorrowed, setTotalBorrowed] = useState(); 
    const [totalReturned, setTotalReturned] = useState(); 

    const data = [
        { name:"Total Borrowed Books", value: totalBorrowed||0},
        { name:"Total Returned Books", value: totalReturned||0}
    ];

    const statisticsData = async () => {
        var id = localStorage.getItem("id");
        try {
            const response = await axiosInstance.get(`https://localhost:7182/api/Loan/user-statistics?id=${id}`);
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


    useEffect(() => {
        statisticsData();
    }, []);

    return (
        <div className="bg-[#F2F2F2] h-screen w-screen select-none">
            <TaskBar dashboard={true}></TaskBar>
            <div className="pl-[93px] pt-[71px]"> 
                <div className="flex">
                    <div className="flex flex-col ml-[60px] mr-[20px]">
                        <div className="flex flex-col">
                            <div className="flex mt-[28px]">
                                <div className=" flex w-[490px] h-[180px] bg-white items-center rounded-[12px] pl-[20px]">
                                    <div className="mr-[20px] h-[80px] w-[2px] bg-black"></div>
                                    <div className="w-[72px] h-[72px] bg-[#D5D5D5] rounded-[8px] flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="black"/>
                                            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="black"/>
                                        </svg>
                                    </div>
                                    <div className="ml-[28px] mt-[-12px]">
                                        <p>Total Book Count</p>
                                    </div>
                                </div>
                                
                                <div className="ml-[40px] flex w-[490px] h-[180px] bg-white items-center rounded-[12px] pl-[20px]">
                                    <div className="w-[72px] h-[72px] bg-[#D5D5D5] rounded-[8px] flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 4.84969V16.7397C22 17.7097 21.21 18.5997 20.24 18.7197L19.93 18.7597C18.29 18.9797 15.98 19.6597 14.12 20.4397C13.47 20.7097 12.75 20.2197 12.75 19.5097V5.59969C12.75 5.22969 12.96 4.88969 13.29 4.70969C15.12 3.71969 17.89 2.83969 19.77 2.67969H19.83C21.03 2.67969 22 3.64969 22 4.84969Z" fill="black"/>
                                            <path d="M10.7083 4.70969C8.87828 3.71969 6.10828 2.83969 4.22828 2.67969H4.15828C2.95828 2.67969 1.98828 3.64969 1.98828 4.84969V16.7397C1.98828 17.7097 2.77828 18.5997 3.74828 18.7197L4.05828 18.7597C5.69828 18.9797 8.00828 19.6597 9.86828 20.4397C10.5183 20.7097 11.2383 20.2197 11.2383 19.5097V5.59969C11.2383 5.21969 11.0383 4.88969 10.7083 4.70969ZM4.99828 7.73969H7.24828C7.65828 7.73969 7.99828 8.07969 7.99828 8.48969C7.99828 8.90969 7.65828 9.23969 7.24828 9.23969H4.99828C4.58828 9.23969 4.24828 8.90969 4.24828 8.48969C4.24828 8.07969 4.58828 7.73969 4.99828 7.73969ZM7.99828 12.2397H4.99828C4.58828 12.2397 4.24828 11.9097 4.24828 11.4897C4.24828 11.0797 4.58828 10.7397 4.99828 10.7397H7.99828C8.40828 10.7397 8.74828 11.0797 8.74828 11.4897C8.74828 11.9097 8.40828 12.2397 7.99828 12.2397Z" fill="black"/>
                                        </svg>

                                    </div>
                                    <div className="ml-[20px] h-[80px] w-[2px] bg-black"></div>
                                    <div className="ml-[28px] mt-[-12px]">
                                        <p>Branch Count</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex h-[256px]">
                                <div className="mt-[28px] flex w-[620px] h-[180px] bg-white items-center rounded-[12px] pl-[20px]">
                                    <div className="w-[72px] h-[72px] bg-[#D5D5D5] rounded-[8px] flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.6 4.15C10.6 4.34 10.44 4.5 10.25 4.5H9.12C6.96 4.5 5.2 6.26 5.2 8.42V17.65C5.2 17.84 5.04 18 4.85 18H4.15C2.96 18 2 17.04 2 15.85V4.15C2 2.96 2.96 2 4.15 2H8.45C9.64 2 10.6 2.96 10.6 4.15Z" fill="black"/>
                                            <path d="M22.0004 4.15V15.85C22.0004 17.04 21.0404 18 19.8504 18H19.2204C19.0304 18 18.8704 17.84 18.8704 17.65V8.42C18.8704 6.26 17.1104 4.5 14.9504 4.5H13.7504C13.5604 4.5 13.4004 4.34 13.4004 4.15C13.4004 2.96 14.3604 2 15.5504 2H19.8504C21.0404 2 22.0004 2.96 22.0004 4.15Z" fill="black"/>
                                            <path d="M14.9492 6H9.11922C7.77922 6 6.69922 7.08 6.69922 8.42V19.58C6.69922 20.92 7.77922 22 9.11922 22H10.7492C11.0292 22 11.2492 21.78 11.2492 21.5V19C11.2492 18.59 11.5892 18.25 11.9992 18.25C12.4092 18.25 12.7492 18.59 12.7492 19V21.5C12.7492 21.78 12.9692 22 13.2492 22H14.9592C16.2892 22 17.3692 20.92 17.3692 19.59V8.42C17.3692 7.08 16.2892 6 14.9492 6ZM13.9992 14.75H9.99922C9.58922 14.75 9.24922 14.41 9.24922 14C9.24922 13.59 9.58922 13.25 9.99922 13.25H13.9992C14.4092 13.25 14.7492 13.59 14.7492 14C14.7492 14.41 14.4092 14.75 13.9992 14.75ZM13.9992 11.75H9.99922C9.58922 11.75 9.24922 11.41 9.24922 11C9.24922 10.59 9.58922 10.25 9.99922 10.25H13.9992C14.4092 10.25 14.7492 10.59 14.7492 11C14.7492 11.41 14.4092 11.75 13.9992 11.75Z" fill="black"/>
                                        </svg>
                                    </div>
                                    <div className="ml-[20px] h-[80px] w-[2px] bg-black"></div>
                                    <div className="ml-[28px] mt-[-12px]">
                                        <p>Total User Base</p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center w-[360px] ml-[40px] mt-[48px]">
                                    <svg width="73" height="61" viewBox="0 0 73 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M26.5028 11.167C30.0676 11.5107 34.1082 11.2378 37.694 12.3792C45.7132 14.9323 48.0099 22.7424 43.3012 29.7781C38.5886 36.8194 27.9145 39.9835 20.1437 36.6431C15.519 34.655 13.2352 30.9806 13.3788 25.7825C13.4038 24.885 13.3821 23.9876 13.3821 22.6764C12.2656 23.5457 11.5154 24.3747 10.5796 24.7852C9.7439 25.1523 8.45724 25.4533 7.82076 25.0581C7.14799 24.6387 6.60267 23.3138 6.70915 22.4743C7.11088 19.2949 8.78475 16.7482 11.471 14.9855C13.307 13.7797 15.0454 14.7327 15.2495 16.943C15.3084 17.5893 15.2584 18.2453 15.2584 19.0245C17.8245 16.9269 20.2695 14.9283 23.2301 12.5079C21.7684 12.788 20.8721 13.1696 20.0356 13.0649C19.1168 12.9514 18.0616 12.578 17.451 11.9453C17.1654 11.6507 17.5462 10.2445 18.0382 9.75032C20.8366 6.93716 24.2457 5.31044 28.2743 5.37645C30.1539 5.40703 30.7782 6.88565 29.5319 8.34898C28.5139 9.54829 27.2208 10.5134 26.5028 11.167Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M50.7725 29.7925C55.9531 29.7957 58.5433 33.7253 56.1442 38.4911C53.7048 43.3391 49.6754 46.3511 44.0351 46.5314C38.5633 46.706 36.6837 43.1363 38.3891 38.1973C39.9871 33.5691 45.8759 29.7901 50.7725 29.7925Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M55.9241 26.8547C51.2494 26.8225 47.0836 22.5492 47.0957 17.7986C47.1038 14.2916 49.5763 11.6998 52.8926 11.7216C57.5221 11.753 62.3098 16.5583 62.2864 21.1527C62.2687 24.6903 59.822 26.8804 55.9241 26.8547Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M25.1659 50.7226C22.9951 50.1222 20.7469 49.7116 18.6753 48.8689C16.6263 48.035 15.1122 46.3882 15.1461 44.0274C15.1791 41.7229 16.7675 40.3626 18.8213 39.6607C22.8314 38.29 26.8479 38.4099 30.6393 40.3232C32.748 41.3881 34.4493 43.051 33.9427 45.7571C33.4296 48.5051 31.1273 49.4034 28.821 50.0642C27.707 50.3837 26.4711 50.2823 25.2901 50.3725C25.249 50.4892 25.2079 50.6051 25.1659 50.7226Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M67.1203 32.4125C71.7765 32.3844 73.8311 35.707 71.8499 39.4531C70.0969 42.7693 65.7062 44.784 62.6109 43.6925C59.6189 42.6373 58.5024 40.0173 59.9133 37.176C61.4565 34.0698 64.1105 32.6427 67.1203 32.4125Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M33.2886 60.8017C31.4292 60.281 29.9715 60.0902 28.7244 59.4769C25.9921 58.1319 25.813 55.0933 28.3492 53.3845C31.4009 51.3288 34.7922 51.1799 38.115 52.475C40.9908 53.5954 41.3724 56.7643 38.7918 58.5086C37.1179 59.6387 35.0004 60.1152 33.2886 60.8017Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M42.3129 11.9758C40.1429 11.29 37.7043 10.8296 35.5674 9.76311C33.1586 8.56058 33.3191 6.49277 35.6408 5.13891C38.6417 3.38984 45.8502 3.76735 48.5865 5.81745C50.5839 7.31217 50.5274 9.35664 48.2356 10.374C46.5036 11.1427 44.5426 11.3971 42.3129 11.9758Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5274 35.9984C14.7073 38.1805 13.8465 39.9207 11.8669 40.753C9.76792 41.6344 8.00692 40.5212 6.7259 38.9476C5.0843 36.9305 4.01382 34.6115 4.78421 31.9054C5.79902 28.3413 9.31133 27.2804 11.8104 29.9978C13.2609 31.5738 14.0563 33.7503 15.1461 35.6555C14.9404 35.7698 14.7339 35.8841 14.5274 35.9984Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M56.8278 2.6936C58.6815 3.60476 60.3393 4.11588 61.5727 5.13811C62.3108 5.74904 62.8997 7.33873 62.6117 8.15733C62.3173 8.99524 60.8418 9.96435 59.9311 9.91847C58.3185 9.83798 56.5478 9.32122 55.22 8.42858C54.2948 7.80719 53.3259 6.04605 53.5978 5.17031C53.9092 4.169 55.5718 3.58705 56.8278 2.6936Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.34841 46.6955C8.56996 47.7966 8.04803 49.3155 7.16229 49.5674C6.29107 49.8145 4.72207 49.0474 4.05897 48.2369C3.21356 47.2026 2.58677 45.6773 2.58838 44.3653C2.59 43.3157 3.44831 41.8628 4.35583 41.3614C4.97537 41.0185 6.65973 41.7276 7.2833 42.4609C8.19969 43.5403 8.59174 45.0599 9.34841 46.6955Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M32.4344 3.84467C31.5438 3.27721 30.6597 2.71297 29.7739 2.15034C30.6597 1.49112 31.4607 0.505909 32.4497 0.255582C33.7864 -0.08248 35.3054 -0.0631616 36.6759 0.18475C38.0868 0.439907 38.3192 1.52895 37.0204 2.23807C35.7321 2.94156 34.2228 3.24018 32.4344 3.84467Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.48101 23.7276C4.3955 26.2985 2.64499 28.8919 1.30428 28.7181C0.788809 28.6513 0.0361708 27.7111 0.00390337 27.1356C-0.102579 25.2296 1.994 22.3714 3.30002 22.5758C3.85583 22.6636 4.28902 23.528 4.48101 23.7276Z" fill="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.4711 13.0384C11.0259 11.8174 10.6403 11.2395 10.6717 10.6857C10.6943 10.2832 11.1936 9.75037 11.6115 9.55639C13.0869 8.87221 14.6164 8.30958 16.1257 7.69946C16.2177 8.15424 16.5412 8.86658 16.3653 9.02354C14.956 10.2864 13.4508 11.4431 11.4711 13.0384Z" fill="black"/>
                                    </svg>

                                    <p className="text-[52px] font-[300] mt-[-8px]">ReadOn</p>

                                    <p className="mt-[-12px] text-[18px]">LIBRARY</p>
                                </div>
                            </div>

                            <div className="bg-white h-[343px] w-[1000px] rounded-[12px] pl-[80px] pt-[80px] pr-[40px]">
                                <p className="text-[38px]">"Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence anf the refinement of character."</p>
                                <p className="text-right mt-[50px]">~ ReadOn Team</p>
                            </div>
                        </div>

                    </div>

                    <PieChartComponent data = {data}></PieChartComponent>
                </div>
            </div>
        </div>
    );
};

export default User_DashboardPage;