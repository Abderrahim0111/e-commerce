


const StartsRating = ({rating, setrating, hover, sethover}) => {
    
    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1
                return(
                    <label key={index}>
                        <input className=" hidden" type="radio" name="rating" value={ratingValue} onClick={() => {
                            setrating(ratingValue)
                        }}/>
                        <i onMouseEnter={() => {
                            sethover(ratingValue)
                        }} onMouseLeave={() => {
                            sethover(null)
                        }} className={`${ratingValue <= (hover || rating) ? 'text-yellow-400' : "text-slate-200"} hover:cursor-pointer fa-solid fa-star`} />
                    </label>
                )
            })} 
        </div>
    );
}

export default StartsRating;
