import React from 'react'

export const BtnCustom = ({onClick, name}) => {
    return (
        <div onClick={onClick} className="col mt-5 btn btn-outline-dark">
            {name}
        </div>
    )
}