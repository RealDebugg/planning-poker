import { useRouter } from 'next/router';
import { useEffect, useState } from "react"
import { useUser } from "@/lib/user"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"


import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react'
import Game from '@/components/game';
import { Meta } from '@/components/meta';


export default function GamePage() {
    const router = useRouter();
    const gameID = router.query.gameId;
    const [open, setOpen] = useState(false);
    const { user } = useUser();

    const [fetched, setFetched] = useState(false);
    const [roomId, setRoomId] = useState("");
    useEffect(() => {
        fetch('/api/game/fetch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: gameID,
            }),
        }).then(async (res) => {
            if (res.ok) {
                let response = await res.json();
                if (response) {
                    setRoomId(`${response.inviteCode}`);
                    setFetched(true);
                }
            } else if (res.status == 410) {
                //not valid code, redirect with error
                router.push("/?error=1");
            }
        })
    }, [gameID]);

    const client = new Ably.Realtime({
        key: 'CS5ryw.pCXGxQ:SQ8Fv1scsQ9IZSBXayCzMLvseffEtjzWC6psbfeDpuY',
        clientId: (user.name != "" ? user.name : 'John Doe'),
        transportParams: { remainPresentFor: 1000 }
    })

    useEffect(() => {
        setOpen(true);
    }, [])

    return (
        <>
            <Meta />
            {fetched ? (
                <AblyProvider client={client}>
                    <ChannelProvider channelName={roomId}>
                        <AlertDialog open={open} onOpenChange={setOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Invite others!</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        The invite code for this room is "{roomId}", you can share it with others to help them join a room.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction>Thanks!</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <h1 className='font-bold text-white text-2xl uppercase absolute my-2 w-full text-center z-0 blur-lg hover:blur-none'>{roomId}</h1>
                        <Game channelName={roomId} />
                    </ChannelProvider>
                </AblyProvider>
            ) : (<></>)}
        </>
    );
}