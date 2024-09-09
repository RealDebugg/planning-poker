import { PrismaClient } from '../../../../prisma/generated/client'

const prisma = new PrismaClient();

export default async function GenerateRoom(req, res) {
    function generateRandomString() {
        const digits = '0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return result;
    }

    let roomID = generateRandomString();
    let roomCreated = false;
    let room;

    while (!roomCreated) {
        try {
            room = await prisma.rooms.create({
                data: {
                    inviteCode: roomID,
                },
            });
            roomCreated = true;
        } catch (e) {
            // Failed to create, inviteCode exists
            room = await prisma.rooms.findUnique({
                where: {
                    inviteCode: roomID,
                },
            });

            const diff = new Date().getTime() - room.expiresAt.getTime();
            if (diff > 0) { // is in the past
                await prisma.rooms.update({
                    where: {
                        inviteCode: roomID,
                    },
                    data: {
                        expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Extend expiration by 24 hours
                    },
                });

                res.status(200).json({ id: room.id, inviteCode: room.inviteCode });
                return;
            } else { // is in the future
                // Generate a new invite code and retry
                roomID = generateRandomString();
            }
        }
    }

    res.status(200).json({ id: room.id, inviteCode: room.inviteCode });
}