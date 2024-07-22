import React from "react"

export default function ContainerSmall(props) {

    
		return (
            <div className='layoutForm'>
            <div className="container">
            <div className="titleForm">
                <p>{props.title}</p>
                </div>
                {props.children}
            </div>
            </div>
        )
    
}