import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { setCookie } from "cookies-next";
import { useState } from "react"

const UsernameCard = ({ setFormPosition }) => {
    const [username, setUsername] = useState("");

    // When user submits the form, save the favorite number to the local storage
    const saveToCookie = e => {
        e.preventDefault()
        setCookie("username", username);
        setFormPosition(2);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Enter a username</CardTitle>
                <CardDescription>A username is required in-order to join a room</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={saveToCookie}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Username</Label>
                            <Input id="name" placeholder="Your prefered username" type="username" onChange={e => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div className="mt-2">
                        {(username !== "" ?
                            (
                                <Button type="submit">Next</Button>
                            ) : (
                                <Button disabled>Next</Button>
                            )
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default UsernameCard