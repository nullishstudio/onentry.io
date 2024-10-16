"use client";
import { useParams } from "next/navigation";

const Creator = () => {
  const params = useParams();
  return <div>{params?.creator}</div>;
};

export default Creator;
