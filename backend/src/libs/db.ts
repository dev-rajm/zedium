import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

type AcceleratedPrismaClient = PrismaClient & ReturnType<typeof withAccelerate>;

let prisma: AcceleratedPrismaClient;

const getConn = (dbUrl: string) => {
  if (!prisma) {
    prisma = new PrismaClient({ datasourceUrl: dbUrl }).$extends(
      withAccelerate()
    ) as unknown as AcceleratedPrismaClient;
  }
  return prisma;
};

export default getConn;
