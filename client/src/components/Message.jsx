import React from 'react';
// No specific CSS file needed if using global utility classes from global.css

const Message = ({ variant = 'info', children }) => {
    const className = `alert alert-${variant}`;
    return <div className={className}>{children}</div>;
};

export default Message;