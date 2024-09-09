import { useReducer, useEffect, useState } from 'react'
import { useChannel } from 'ably/react'
import UserList from '../userList'
import Deck from "@/components/deck";
import ActionList from '../actionList';
import Board from '../board';

const ADD = 'ADD'
const EMPTY = 'EMPTY'
const FLIP = 'FLIP'

const reducer = (prev, event) => {
    switch (event.name) {
        case FLIP:
            const newHiddenState = !prev.every(msg => msg.data.hidden);
            return prev.map(msg => ({
                ...msg,
                data: {
                    ...msg.data,
                    hidden: newHiddenState
                }
            }));
        case EMPTY:
            return [];
        case ADD:
            const existingMessageIndex = prev.findIndex(msg => msg.connectionId === event.connectionId);
            if (existingMessageIndex !== -1) {
                // Update the existing message
                const updatedMessages = [...prev];
                updatedMessages[existingMessageIndex] = {
                    ...updatedMessages[existingMessageIndex],
                    data: event.data,
                };
                return updatedMessages;
            } else {
                // Add a new message
                return [...prev, event];
            }
    }
}

const Game = ({ channelName }) => {
    const [messages, dispatch] = useReducer(reducer, [])
    const { channel, publish } = useChannel(channelName, dispatch)
    const [setCMD, updateCMD] = useState(null);

    useEffect(() => {
        let ignore = false
        const fetchHist = async () => {
            const history = await channel.history({ limit: 100, direction: 'forwards' })
            if (!ignore) history.items.forEach(dispatch)
        }

        fetchHist()
        return () => {
            ignore = true
        }
    }, [channel])

    const publishCard = (id) => {
        publish({
            name: ADD,
            data: {
                id,
                hidden: (messages[0]?.data.hidden != undefined ? messages[0]?.data.hidden : true),
            },
        })
        updateCMD(null);
    }

    const handleAction = (action) => {
        switch (action) {
            case "UNDO":
                publish({
                    name: ADD,
                    data: {
                        id: -1,
                        hidden: true,
                    },
                })
                updateCMD("RESET");
                break;
            case "CLEAR":
                publish({
                    name: EMPTY
                })
                updateCMD("RESET");
                break;
            case "TOGGLE":
                publish({
                    name: FLIP
                })
                updateCMD(null);
                break;
        }
    }

    return (
        <>
            <UserList channelName={channelName} />
            <ActionList boardAction={handleAction} />
            <Board channelName={channelName} messages={messages} />
            <Deck onSubmit={publishCard} receiveCMD={setCMD} messages={messages} />
        </>
    );
}

export default Game