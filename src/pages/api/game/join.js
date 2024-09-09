import { PrismaClient } from '../../../../prisma/generated/client'

const prisma = new PrismaClient();

export default async function JoinRoom(req, res) {
    const { id } = req.body;

    let room = await prisma.rooms.findUnique({
        where: {
            inviteCode: id.toString()
        },
    });

    if (room != null) {
        res.status(200).json({ id: room.id });
    } else {
        res.status(200).json({ id: id.toString() });
    }
}