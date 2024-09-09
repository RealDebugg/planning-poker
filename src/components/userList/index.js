import { usePresence, usePresenceListener } from 'ably/react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const UserList = ({ channelName }) => {
    const { presenceData } = usePresenceListener(channelName)
    usePresence(channelName, {})
    const users = presenceData;

    return (
        <div className="flex mx-4 my-4 absolute right-4 min-w-10">
            {users.map((v, i) => (
                <TooltipProvider key={i}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <img src={"https://ui-avatars.com/api/?name=" + v.clientId + "&background=random"} alt={v.clientId} className="border-2 border-black rounded-full h-10 w-10 -mr-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{v.clientId}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
}

export default UserList