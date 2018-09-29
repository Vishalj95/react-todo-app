import React from 'react'

export default (props) => {
    return (
        <div>
            <p
                className="d-inline"
                style={{
                    textDecoration: props.todo.complete ? "line-through" : "",
                    cursor: "pointer"
                }}
                onClick={props.togglerComplete}
            >
                {props.todo.text}
            </p>
            <button className="btn btn-danger ml-3" onClick={props.onDelete}>X</button>
        </div>
    )
}
