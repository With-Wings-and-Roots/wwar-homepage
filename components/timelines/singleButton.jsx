const SingleButton = ({title, color="yellow"})=>{
  return(
    <div className={`px-5 text-lg lg:text-xl lg:py-1 font-normal tracking-wide hover:text-white transition-all duration-300 ${color==="turquoise"? `bg-wwr_turquoise`: `bg-wwr_yellow_orange`}`}>{title}</div>
  )
}

export default SingleButton