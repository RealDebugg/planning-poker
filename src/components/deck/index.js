import { useEffect, useState } from "react";
import s from "./deck.module.css";

const Deck = ({ onSubmit, receiveCMD, messages }) => {
    const cardArray = [
        {
            title: "0"
        },
        {
            label: "XS",
            title: "½"
        },
        {
            label: "S",
            title: "1"
        },
        {
            label: "M",
            title: "2"
        },
        {
            label: "L",
            title: "3"
        },
        {
            label: "XL",
            title: "5"
        },
        {
            label: "2XL",
            title: "8"
        },
        {
            label: "3XL",
            title: "13"
        },
        {
            label: "4XL",
            title: "20"
        },
        {
            label: "5XL",
            title: "40"
        },
        {
            label: "6XL",
            title: "100"
        },
        {
            label: "?",
            title: "?"
        },
        {
            label: "∞",
            title: "∞"
        },
        {
            label: "☕",
            title: "☕"
        }
    ]

    const [selectedCard, setSelectedCard] = useState(-1);

    const handleCardSelect = (cardID) => {
        onSubmit(cardID);
        setSelectedCard(cardID);
    }

    useEffect(() => {
        if (messages.length == 0) {
            setSelectedCard(-1);
        } else {
            switch (receiveCMD) {
                case "RESET":
                    setSelectedCard(-1);
                    break;
            }
        }
    }, [receiveCMD, messages])

    return (
        <>
            <div>
                {/* <p>Average</p>
                <p></p> */}
            </div>
            <div className={s.cards}>
                {cardArray.map((v, i) => (
                    <div className={`${s.card} ${(selectedCard == i ? s.selected : "")}`} key={i} onClick={() => handleCardSelect(i)}>
                        <div className={s.cardFace}>
                            {
                                (
                                    v.label != undefined ? (
                                        <>
                                            <div className={s.cardLabel}>{v.label}</div>
                                            <div className={s.cardLabel}>{v.label}</div>
                                        </>
                                    ) : (
                                        <></>
                                    )
                                )
                            }

                            <div className={s.cardTitle}>{v.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Deck