import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";

const RoomSelectCard = ({ setFormPosition }) => {
    const { toast } = useToast()
    const router = useRouter();
    const { handleSubmit, setValue } = useForm({
        defaultValues: {
            otp: "",
        },
    });
    const [inviteCode, setInviteCode] = useState("");
    const [roomCode, setRoomCode] = useState("");

    useEffect(() => {
        if (inviteCode === "") {
            fetch('/api/game/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async (res) => {
                if (res.ok) {
                    let response = await res.json();
                    if (response) {
                        setInviteCode(response.inviteCode);
                        setRoomCode(response.id);
                    }
                }
            })
        }
    }, [router]);

    const onSubmit = (data) => {
        const otp = data.otp;
        if (otp.length >= 6) {
            fetch('/api/game/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: otp,
                }),
            }).then(async (res) => {
                if (res.ok) {
                    let response = await res.json();
                    if (response) {
                        router.push("/game/" + response.id);
                    }
                }
            })
        } else {
            toast({
                title: "Error",
                description: "An invite code is 6 characters long.",
            });
        }
    };

    function JoinRoomCard() {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Join a room</CardTitle>
                    <CardDescription>
                        To join a room, enter it's invite PIN.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-2">
                        <div className="space-y-1 flex justify-center">
                            <InputOTP maxLength={6} onChange={(value) => setValue("otp", value)} name="otp">
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className={`mr-1`} onClick={() => { setFormPosition(1) }}>Back</Button>
                        <Button type="submit">Join</Button>
                    </CardFooter>
                </form>
            </Card>
        )
    }

    function CreateRoomCard() {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Create a room</CardTitle>
                    <CardDescription>
                        A room has been created with the invite code: {inviteCode}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className={`mr-1`} onClick={() => { setFormPosition(1) }}>Back</Button>
                    <Button onClick={() => {router.push("/game/" + roomCode);}}>Join</Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Tabs defaultValue="join" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="join">Join a room</TabsTrigger>
                <TabsTrigger value="create">Create a room</TabsTrigger>
            </TabsList>
            <TabsContent value="join">
                <JoinRoomCard />
            </TabsContent>
            <TabsContent value="create">
                <CreateRoomCard />
            </TabsContent>
        </Tabs>
    );
}

export default RoomSelectCard