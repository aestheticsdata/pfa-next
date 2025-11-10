"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@auth/store/authStore";

export default function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pfaToken = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);

  // S'assurer qu'on est côté client avant de vérifier le token
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Seulement rediriger si le token n'existe pas et qu'on est monté côté client
    if (isMounted && !pfaToken) {
      router.push("/login");
    }
  }, [pfaToken, router, isMounted]);

  // Pendant l'hydratation, toujours afficher les enfants pour éviter le mismatch
  // La vérification se fera dans le useEffect
  if (!isMounted) {
    return <>{children}</>;
  }

  // Si pas de token après le montage, ne rien afficher (la redirection est en cours)
  if (!pfaToken) {
    return null;
  }

  return <>{children}</>;
}

