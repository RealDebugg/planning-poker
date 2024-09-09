import { Meta } from "@/components/meta";
import UsernameCard from "@/components/home/usernameCard";
import {useEffect, useState} from "react";
import RoomSelectCard from "@/components/home/roomSelectCard";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/router'

export default function Home() {
  const [formPosition, setFormPosition] = useState(1);
  const { toast } = useToast()
    const router = useRouter()

    const errorList = {
      1: "The room you tried joining does not exist.",
        2: "You need a username in-order to join a room."
    }

    const [errorId, setErrorId] = useState(0);

  function FormStateCard(props) {
    const { stage } = props;
    switch (stage) {
      case 1:
        return (<UsernameCard setFormPosition={setFormPosition} />)
      case 2:
        return (<RoomSelectCard setFormPosition={setFormPosition} />)
    }
  }

    useEffect(() => {
        if (errorId != 0) {
            toast({
                title: "Error",
                description: errorList[errorId],
            })
        }
    }, [errorId]);

    useEffect(() => {
        const errorQuery = router.query.error;
        if (errorQuery != undefined || errorQuery != null) {
            setErrorId(errorQuery);
        }
    }, [router]);

  return (
    <>
      <Meta />
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] text-white">Let's get started</h1>
        <span className="max-w-[500px] text-center text-lg font-light text-foreground text-white inline-block">In-order to join a planning poker table you'll need to provide some information such as a username you'd like to use and a room ID, alternatively you can create a new room.</span>
      </section>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 pb-8 md:pb-12 lg:pb-24 lg:pb-20">
        <FormStateCard stage={formPosition} />
      </section>
    </>
  );
}
