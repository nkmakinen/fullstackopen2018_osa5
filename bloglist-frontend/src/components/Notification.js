import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ type, message }) => {
    if (type === null && message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

Notification.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default Notification