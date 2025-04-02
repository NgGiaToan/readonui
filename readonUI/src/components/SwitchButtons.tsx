import {useState} from 'react';

interface SwitchButtonsProps {
    button1_name: string;
    button2_name: string;
    onClick1: () => void;
    onClick2: () => void;
}

const SwitchButtons = ({ button1_name, button2_name, onClick1, onClick2 }: SwitchButtonsProps) =>{
    const [selected, setSelected] = useState<"button1" | "button2">("button1");

    const handleClick = (button: "button1" | "button2") => {
        setSelected(button);
        if (button === "button1") {
            onClick1();
        } else {
            onClick2();
        }
    };

    return (
        <div>
            <button
                className={`w-[244px] h-[38px] rounded-l-[12px] bg-[#E3E3E3] font-[500] ${selected=="button2" ? "bg-black text-white" : ""}`}
                onClick={()=>handleClick("button1")} 
            >{button1_name}</button>
            <button
                className={`w-[244px] h-[38px] ml-[20px] rounded-r-[12px] bg-[#E3E3E3] font-[500] ${selected=="button1" ? "bg-black text-white" : ""}`}
                onClick={() => handleClick("button2")}
            >{button2_name}</button>
        </div>
    )
}

export default SwitchButtons;