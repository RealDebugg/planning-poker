import { usePresence, usePresenceListener } from 'ably/react'
import s from "./board.module.css"
import { Eye } from 'lucide-react'

const Board = ({ channelName, messages }) => {
    const { presenceData } = usePresenceListener(channelName)
    const users = presenceData;
    const cardArray = [
        {
            title: "0",
            class: s.card1
        },
        {
            label: "XS",
            title: "½",
            class: s.card2
        },
        {
            label: "S",
            title: "1",
            class: s.card3
        },
        {
            label: "M",
            title: "2",
            class: s.card4
        },
        {
            label: "L",
            title: "3",
            class: s.card5
        },
        {
            label: "XL",
            title: "5",
            class: s.card6
        },
        {
            label: "2XL",
            title: "8",
            class: s.card7
        },
        {
            label: "3XL",
            title: "13",
            class: s.card8
        },
        {
            label: "4XL",
            title: "20",
            class: s.card9
        },
        {
            label: "5XL",
            title: "40",
            class: s.card10
        },
        {
            label: "6XL",
            title: "100",
            class: s.card11
        },
        {
            label: "?",
            title: "?",
            class: s.card12
        },
        {
            label: "∞",
            title: "∞",
            class: s.card13
        },
        {
            label: "☕",
            title: "☕",
            class: s.card14
        }
    ]

    const getDataIdByConnectionId = (connectionId) => {
        for (let entry of messages) {
            if (entry.connectionId === connectionId) {
                return entry.data;
            }
        }
        return -1; // Return -1 if no matching connectionId is found
    }

    function Card(props) {
        const data = props.cardData;
        const username = props.username;
        if (data == -1 || data.id == -1) {
            return (<></>)
        } else {
            return (
                <div className='flex'>
                    <div>
                        <div className={`${s.card} ${cardArray[data.id]?.class} ${data.hidden ? s.flipped : ""}`}>
                            <div className={s.cardFace}>
                                {
                                    (!data.hidden) && (
                                        <>
                                            {
                                                (
                                                    cardArray[data.id]?.label != undefined ? (
                                                        <>
                                                            <div className={s.cardLabel}>{cardArray[data.id]?.label}</div>
                                                            <div className={s.cardLabel}>{cardArray[data.id]?.label}</div>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )
                                                )
                                            }

                                            <div className={s.cardTitle}>{cardArray[data.id]?.title}</div>
                                        </>
                                    )
                                }
                            </div>
                            <div className={`${s.cardBack}`}>
                                <span className='text-xl uppercase font-bold absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>Hidden</span>
                            </div>
                        </div>
                        <p className='text-center text-white'>{username}</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='flex flex-wrap gap-3 p-4 w-3/4 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 justify-center pointer-events-none transition-all'>
            {users.map((v, i) => (
                <Card cardData={getDataIdByConnectionId(v.connectionId)} username={v.clientId} key={i}/>
            ))}
        </div>
    );
}

export default Board