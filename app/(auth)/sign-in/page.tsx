import { prisma } from "@/lib/prisma";

const page = async () => {
  const x = await prisma.collection.findMany();
  console.log(x);
  return <div>page</div>;
};

export default page;
