import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.tag} alert-dismissible fade show my-3`} role="alert">
            <strong className='text-capitalize'>{ props.alert.tag!=="danger"? props.alert.tag: "error" }:</strong> {props.alert.msg}
        </div>
    )
}