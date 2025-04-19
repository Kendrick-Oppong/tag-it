import { prisma } from "@/lib/prisma";
import React from "react";

const page = async () => {
  const x = await prisma.user.findMany();
  console.log(x)
  return <div>page</div>;
};

export default page;
