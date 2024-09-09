import { PrismaClient } from '../../../../prisma/generated/client'

const prisma = new PrismaClient();

export default async function FetchRoom(req, res) {
    const { id } = req.body;

    let room = await prisma.rooms.findUnique({
        where: {
            id: id.toString()
        },
    });

    if (room != null) { //exists
        const diff = new Date().getTime() - room.expiresAt.getTime();

        if (diff < 0) { //future
            res.status(200).json({ inviteCode: room.inviteCode });
        } else { //past
            res.status(410).json({});
        }
    }

    res.status(410).json({});
}