import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import crossedEye from '../../assets/icons/crossed-eye.svg';
import eye from '../../assets/icons/eye.svg';
import googleLogo from '../../assets/icons/google-logo.svg';
import appleLogo from '../../assets/icons/apple-logo.svg';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../utils/firebase/config'
import { ToastContainer } from 'react-toastify';
import { warn, notify } from '../../App';
import { Button, Input, Footer, Loader } from '../../components';
import { useAuth } from '../../contexts/UserContext/UserContext';

interface FormFields {
  email: string;
  password: string;
}

const defaultFormFields: FormFields = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);



  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { email, password } = formFields;
  const navigateTo = useNavigate();

  const navigateToDashboard = () => {
    setTimeout(() => {
      navigateTo('/dashboard');
    }, 2500);
    console.log("Logging in...");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth()

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredentials.user) {
        notify("Successful, you're being redirected");
        navigateToDashboard();
        setLoadingApple(false);
      }

    } catch (err: any) {
      warn(err.message)
    }


  }

  // const signInWithApple = async () => {
  //   setLoadingApple(true);
  //   try {
  //     // await signInWithGooglePopup();
  //     notify("Successful, you're being redirected");
  //     navigateToDashboard();
  //     setLoadingApple(false);
  //   } catch (error: any) {
  //     switch (error.code) {
  //       case 'auth/wrong-password':
  //         warn('Incorrect password, try again!');
  //         break;
  //       case 'auth/user-not-found':
  //         warn('User not found, check your email address!');
  //         break;
  //       case 'auth/network-request-failed':
  //         warn('Connection problem, check your network and try again!');
  //         break;
  //       case 'auth/internal-error':
  //         warn('An error has occurred, try again!');
  //         break;
  //       case 'auth/email-already-in-use':
  //         warn('This email is already in use!');
  //         break;
  //       default:
  //         warn(`An error has occurred, ${error}`);
  //         setLoadingApple(false);
  //     }
  //     console.log(error);
  //     setLoadingApple(false);
  //   }
  // };

  // const signInWithGoogle = async () => {
  //   setLoadingGoogle(true);
  //   try {
  //     await signInWithGooglePopup();
  //     notify("Successful, you're being redirected");
  //     navigateToDashboard();
  //     setLoadingGoogle(false);
  //   } catch (error: any) {
  //     switch (error.code) {
  //       case 'auth/wrong-password':
  //         warn('Incorrect password, try again!');
  //         break;
  //       case 'auth/user-not-found':
  //         warn('User not found, check your email address!');
  //         break;
  //       case 'auth/network-request-failed':
  //         warn('Connection problem, check your network and try again!');
  //         break;
  //       case 'auth/internal-error':
  //         warn('An error has occurred, try again!');
  //         break;
  //       case 'auth/email-already-in-use':
  //         warn('This email is already in use!');
  //         break;
  //       default:
  //         warn(`An error has occurred, ${error}`);
  //         setLoadingGoogle(false);
  //     }
  //     console.log(error);
  //     setLoadingGoogle(false);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    // setFormFields({ ...formFields, [name]: value });

    setFormFields(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const urlSearchParams = new URLSearchParams({
  //     grant_type: '',
  //     ...formFields,
  //     scope: '',
  //     client_id: '',
  //     client_secret: '',
  //   });

  //   try {
  //     const response = await fetch(
  //       'https://cutly.onrender.com/api/v1/users/login',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         body: urlSearchParams.toString(),
  //       }
  //     );

  //     if (!response.ok) {
  //       setLoading(false);
  //       console.log('Request failed', response);
  //       if (response.status === 403) {
  //         warn('Incorrect username and/or password, please try again!');
  //       }
  //       return;
  //     }

  //     const data = await response.json();
  //     const token = data.access_token;
  //     const user = {
  //       username: formFields.username,
  //       password: formFields.password,
  //       token: token,
  //     };
  //     console.log(user);
  //     localStorage.setItem('user', JSON.stringify(user));
  //     setUser(user);
  //     notify("Login success, you're being redirected");
  //     resetFormFields();
  //     navigateToDashboard();
  //     setLoading(false);
  //   } catch (error: any) {
  //     warn(`Error: ${error.message}`);
  //     setLoading(false);
  //     console.error('Error:', error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (user) navigateToDashboard();
  // }, []);

  // console.log(user);

  return (
    <>
      <section className="h-full bg-white">
        <ToastContainer />
        <div className="flex h-full md:min-h-full w-full flex-col items-center justify-start md:flex-row md:justify-center">
          <div className="order-1 flex h-fit w-full items-center justify-center md:order-2 md:h-full md:w-[45%]">
            <div className="my-auto h-full w-[90%] overflow-y-auto rounded-xl py-10">
              <div className="">
                <div className="mx-auto w-[90%] max-w-[600px]">
                  <div>
                    <h1 className="mb-4 text-sm text-neutral-500 text-center">
                      Log in with:
                    </h1>
                  </div>
                  <div className="my-4 flex justify-center">
                    <div className="mr-6">
                      <button
                        disabled={loadingGoogle}
                        onClick={() => { }}
                        className="flex items-center w-fit min-w-[6.8125rem] justify-center rounded bg-primary py-1.5 text-white transition duration-200 hover:scale-90 disabled:scale-100 disabled:cursor-not-allowed active:scale-100"
                      >
                        {loadingGoogle ? (
                          <Loader />
                        ) : (
                          <>
                            <img
                              src={`${googleLogo}`}
                              alt="google"
                              className="mr-1"
                            />
                            Google
                          </>
                        )}
                      </button>
                    </div>
                    <div>
                      <button
                        disabled={loadingApple}
                        onClick={() => { }}
                        className="flex items-center w-fit min-w-[6.8125rem] justify-center rounded bg-primary py-1.5 text-white transition duration-200 hover:scale-90 active:scale-100 disabled:scale-100 disabled:cursor-not-allowed"
                      >
                        {loadingApple ? (
                          <Loader />
                        ) : (
                          <>
                            <img src={`${appleLogo}`} alt="apple" className="mr-1" />{' '}
                            Apple
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-8">
                    <div className="h-[1px] w-full bg-neutral-400"></div>
                    <div className="mx-5 mb-1 mt-0.5 flex justify-center text-neutral-500">
                      Or
                    </div>
                    <div className="h-[1px] w-full bg-neutral-400"></div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col">
                      <div className="mb-4">
                        <Input
                          py="12px"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-8 flex w-full flex-col">
                      <div className="flex rounded-lg bg-white border border-primary h-fit pr-2">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={handleChange}
                          required
                          style={{
                            border: 'none',
                            outline: 'none',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                          }}
                        />
                        <span
                          onClick={() => setShowPassword(prevState => !prevState)}
                          className="flex cursor-pointer items-center justify-center"
                        >
                          <img
                            className="h-6"
                            src={showPassword ? `${crossedEye}` : `${eye}`}
                            alt="Show Password"
                          />
                        </span>
                      </div>
                    </div>
                    <div>
                      <Button
                        disabled={loading}
                        type="submit"
                        buttonWidth={`full`}
                      >
                        {loading ? <Loader /> : 'Log in'}
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="mx-4 max-w-[600px] md:mx-8">
                  <div className="flex justify-center text-neutral-500 text-sm my-4">
                    Don&apos;t have an account?{' '}
                    <Link
                      className="pl-1.5 underline text-primary"
                      to="/sign-up"
                    >
                      {' '}
                      Sign Up Instead
                    </Link>
                  </div>
                  <div className="text-neutral-400 text-center text-xs">
                    By signing in with an account, you agree to
                    <br />
                    Sciccor&apos;s{' '}
                    <span className="text-neutral-500">
                      Terms of Service, Privacy Policy
                    </span>{' '}
                    and{' '}
                    <span className="text-neutral-500">
                      Acceptable Use Policy.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Login;
