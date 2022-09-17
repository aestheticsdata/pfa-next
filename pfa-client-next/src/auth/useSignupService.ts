import useRequestHelper from "@helpers/useRequestHelper";

interface NewUser {
  email: string;
  password: string;
}

const useSignupService = () => {
  const { request } = useRequestHelper();

  const signupService = async (user: NewUser) => {
    const { email, password } = user;
    try {
      const res = await request('/users/add', {
        method: 'POST',
        data: {
          name: email.split('@')[0],
          email,
          password,
          registerDate: new Date(),
          baseCurrency: "EUR",
          language: "fr",
        }
      });
      // yield put(registerSuccess(res))
    } catch (err) {
      // yield put(registerFail(err.response.data.error));
    }
  }
  return {
    signupService,
  }
}

export default useSignupService;
