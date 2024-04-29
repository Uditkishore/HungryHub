import React from 'react'

export const BtnCustom = ({onClick, name,  className}) => {
    return (
        <div onClick={onClick} className={className}>
            {name}
        </div>
    )
}