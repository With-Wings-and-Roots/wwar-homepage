const SingleButton = ({title, color="yellow"})=>{
  return(
    <div className={`px-5 text-lg ${color==="turquoise"? `bg-wwr_turquoise`: `bg-wwr_yellow_orange`}`}>{title}</div>
  )
}

export default SingleButton