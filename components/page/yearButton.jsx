import React from 'react'

const YearButton = ({year, endYear=null}) => {
   
  return (
    <div className="flex gap-2 bg-wwr_yellow_orange w-max text-wwr_white py-2 px-4 text-xl font-light mb-2"> 
            <div>{year}</div>
            {endYear && <div>-</div>}
             {endYear && <div>{endYear}</div>}
            </div>
  )
}

export default YearButton