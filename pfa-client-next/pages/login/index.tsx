import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@src/components/shared/Layout";
import SharedLoginForm from "@src/components/shared/sharedLoginForm/sharedLoginForm";
import { loginService } from "@auth/loginService";
import type { LoginValues } from "@src/components/shared/sharedLoginForm/interfaces";
import { useAuthStore } from "@auth/store/authStore";

const Login = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  const onSubmit = async (values: LoginValues) => {
    console.log("on submit, values", values);
    const result = await loginService(values.email, values.password);
    console.log("result", result);
    await authStore.setToken(result.token);
    router.push("/");
  };

  return (
    <Layout>
      <div className="flex w-96 flex-col items-center space-y-8 rounded bg-gradient-to-br from-teal-300 to-sky-500 py-3 font-smooch shadow-lg">
        <SharedLoginForm
          onSubmit={onSubmit}
          buttonTitle="login"
          // buttonTitle={intl.formatMessage({ ...messages.buttonLabel })}
          displayEmailField
          displayPasswordField
        />
        <div className="text-formsGlobalColor hover:text-generalWarningBackground hover:underline">
          <Link href="/forgotPassword">
            {/*<FormattedMessage*/}
            {/*  {...messages.forgotPassword}*/}
            {/*/>*/}
            forgot password ?
          </Link>
        </div>
      </div>
    </Layout>
  );
};

Login.auth = false;

export default Login;

/*

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import messages from './messages';
import {
  login,
  clearLoginFailed,
} from './actions';

import SharedLoginForm from '../shared/sharedLoginForm/SharedLoginForm';
import StyledLogin from './StyledLogin';
import StyledSharedLoginContainer from '../shared/sharedLoginContainer/StyledSharedLoginContainer';


const Login = ({ history }) => {
  const dispatch = useDispatch();
  const onSubmit = (values, { setSubmitting }) => {

    dispatch(login(values.email, values.password));
    setSubmitting(false);
  };
  const token = useSelector( state => state.loginReducer.token);
  const loginErrorMessage = useSelector(state => state.loginReducer.errorMessage);

  const intl = useIntl();

  useEffect(() => {
    if (localStorage.getItem('pfa-token')) {
      history.push('/');
    }
  }, [token]);

  useEffect(() => {
    if (loginErrorMessage !== '') {
      Swal.fire({
        title: intl.formatMessage({ ...messages.loginError }),
        text: loginErrorMessage,
        type: 'error',
        confirmButtonText: 'close',
        willClose: () => {
          dispatch(clearLoginFailed());
        }
      })
    }
  }, [loginErrorMessage]);


  return (
    <>
      {
        token ?
          null
          :
          <StyledLogin>
            <StyledSharedLoginContainer>
              <SharedLoginForm
                onSubmit={onSubmit}
                buttonTitle={intl.formatMessage({ ...messages.buttonLabel })}
                displayEmailField
                displayPasswordField
              />
              <div className="pwd-forgot">
                <NavLink to="/forgotpassword">
                  <FormattedMessage
                    {...messages.forgotPassword}
                  />
                </NavLink>
              </div>
            </StyledSharedLoginContainer>
          </StyledLogin>
      }
    </>
  );
}

export default Login;


 */
