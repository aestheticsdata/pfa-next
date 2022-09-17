import useRequestHelper from "@helpers/useRequestHelper";
import Swal from "sweetalert2";
import type { AxiosError } from "axios";
import { useRouter } from "next/router";

const useResetPasswordService = () => {
  const { request } = useRequestHelper();
  const router = useRouter();

  const resetPasswordService = async (email: string) => {
    try {
      await request("/users/resetpassword", {
        method: "POST",
        data: {
          email,
          subject: "PFA - changement de mot de passe",
        }
      });
      // @ts-ignore
      Swal.fire({
        title: "Succès",
        text: "un nouveau mot de passe vous a été envoyé",
        type: "success",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        didClose: () => {
          router.push("/login");
        },
      })
    } catch (err: unknown) {
      // @ts-ignore
      await Swal.fire({
        title: "le mot de passe n'a pas pu être ré-initialisé",
        text: (err as AxiosError).response?.data.error ?? "",
        type: "error",
        icon: "warning",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  return {
    resetPasswordService,
  }
};

export default useResetPasswordService;
