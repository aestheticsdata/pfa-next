import { useRouter } from "next/router";
import SharedLoginForm from "@components/shared/sharedLoginForm/sharedLoginForm";
import Layout from "@components/shared/Layout";
import useSignupService from "@auth/useSignupService";

import type { LoginValues } from "@components/shared/sharedLoginForm/interfaces";

const SignUp = () => {
  const router = useRouter();
  const { signupService } = useSignupService();

  const onSubmit = async (user: LoginValues) => {
    // const result = await signupService(user);
  };

  return (
    <Layout isLogin>
      <div className="flex flex-col items-center w-96 space-y-8 mt-28 rounded bg-gradient-to-br from-teal-300 to-sky-500 py-3 font-smooch shadow-lg">
        <SharedLoginForm
          onSubmit={onSubmit}
          buttonTitle="Sign up"
          displayEmailField
          displayPasswordField
        />
      </div>
    </Layout>
  );
};

SignUp.auth = false;

export default SignUp;
