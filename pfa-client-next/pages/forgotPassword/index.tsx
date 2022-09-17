import Layout from "@src/components/shared/Layout";
import SharedLoginForm from "@src/components/shared/sharedLoginForm/sharedLoginForm";
import useResetPasswordService from "@auth/useResetPasswordService";

import type { LoginValues } from "@components/shared/sharedLoginForm/interfaces";

const ForgotPassword = () => {
  const { resetPasswordService } = useResetPasswordService();
  const onSubmit = async (values: LoginValues) => {
    await resetPasswordService(values.email!);
  }

  return (
    <Layout isLogin>
      <div className="flex flex-col items-center w-96 space-y-8 mt-28 rounded bg-gradient-to-br from-teal-300 to-sky-500 py-3 font-smooch shadow-lg">
        <SharedLoginForm
          onSubmit={onSubmit}
          buttonTitle="ré-initialiser le password"
          displayEmailField
        />
      </div>
    </Layout>
  );
};

export default ForgotPassword;
