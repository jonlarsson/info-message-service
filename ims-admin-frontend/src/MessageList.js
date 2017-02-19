import React from "react";
export function MessageList(props) {
    return (
        <ul>
            {props.messages.map((message) =>
                (
                    <li key={message.id}>
                        {message.content}
                    </li>
                )
            )}
        </ul>
    );
}