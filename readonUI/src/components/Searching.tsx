
interface SearchingProps{
    text: string;
    searching: (e:string) => void;
}

const Searching = ({text, searching}: SearchingProps) =>{
    return (
        <form>
            <button type="submit" className="absolute mt-[15px] ml-[18px]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.58341 17.5C13.9557 17.5 17.5001 13.9556 17.5001 9.58335C17.5001 5.2111 13.9557 1.66669 9.58341 1.66669C5.21116 1.66669 1.66675 5.2111 1.66675 9.58335C1.66675 13.9556 5.21116 17.5 9.58341 17.5Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.4" d="M18.3334 18.3334L16.6667 16.6667" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <input 
                onChange={(e)=> searching(e.target.value)}
                className="w-[300px] h-[48px] bg-[white] pl-[54px] rounded-[12px]"
                placeholder={text}
            >
            </input>
        </form>
    )
}

export default Searching;