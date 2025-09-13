"use client";

import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";

type ProviderProps = {
  children: React.ReactNode;
  cookies: string;
};

export const Providers = (props: ProviderProps) => {
  const router = useRouter();

  return <HeroUIProvider navigate={router.push}>{props.children}</HeroUIProvider>;
};
