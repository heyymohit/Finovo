import React from "react";

export const Transaction = ({ transaction }) => {
    return (
        <li className="minus">
            {transaction.text}<span>Rs. 400</span><button className="delete-btn">x</button>
        </li>
    )
}