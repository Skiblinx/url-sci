import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithGooglePopup,
  // createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import crossedEye from '../../assets/icons/crossed-eye.svg';
import eye from '../../assets/icons/eye.svg';
import googleLogo from '../../assets/icons/google-logo.svg';
import appleLogo from '../../assets/icons/apple-logo.svg';

import { ToastContainer } from 'react-toastify';
import { inform, notify, warn } from '../../App';
import { Button, Input, Footer, Loader } from '../../components';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../utils/firebase/config'


interface FormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  timestamp: () => {};
}

const defaultFormFields: FormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  timestamp: serverTimestamp,

};

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const redirectToLogin = () => {
    setTimeout(() => {
      navigateTo('/login');
    }, 2500);
  };




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const auth = getAuth()
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredentials.user

      if (user) {
        await updateProfile(auth.currentUser!, {
          displayName: name
        })
        notify("Successful, you're being redirected to the Login page")
        redirectToLogin()
      }

      const { password: _, ...formFieldsCopy } = formFields; // Create a copy without the 'password' field

      // formFieldsCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formFieldsCopy);


    } catch (err) {
      console.error('Error signing up', err);
      warn(`Error signing up, ${err}`);
      setLoading(false);
      console.log(err);
    }
  }


  return (
    <>
      <section className="h-screen mt-[110px] bg-white">
        <ToastContainer />
        <div className="flex h-full md:min-h-full w-full flex-col items-center justify-start md:flex-row md:justify-center">
          <div className="order-1 flex h-fit w-full items-center justify-center md:order-2 md:h-full md:w-[45%]">
            <div className="my-auto h-full w-[90%] rounded-xl py-10">
              <div className="">
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto w-[90%] max-w-[600px]"
                >
                  <div>
                    <h1 className="mb-4 text-sm text-neutral-500 text-center">
                      Sign up with:
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
                  <div className="mb-6 flex flex-col">
                    <div className="">
                      <Input
                        py="12px"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex flex-col">
                    <div className="">
                      <Input
                        py="12px"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="mb-6 flex w-full flex-col">
                      <div className="flex rounded-lg bg-white border border-primary h-fit pr-2">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={handleChange}
                          minLength={8}
                          required
                          style={{
                            border: 'none',
                            outline: 'none',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                          }}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
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
                    <div className="mb-8 flex w-full flex-col">
                      <div className="flex rounded-lg bg-white border border-primary h-fit pr-2">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Retype your password"
                          value={confirmPassword}
                          onChange={handleChange}
                          minLength={8}
                          required
                          style={{
                            border: 'none',
                            outline: 'none',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                          }}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
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
                  </div>
                  <Button disabled={loading} type="submit" buttonWidth={`full`}>
                    {loading ? <Loader /> : 'Sign up with Email'}
                  </Button>
                </form>
                <div className="mx-4 max-w-[600px] md:mx-8">
                  <div className="flex justify-center text-neutral-500 my-4">
                    Already have an account?{' '}
                    <Link className="pl-1.5 underline text-primary" to="/login">
                      {' '}
                      Log in
                    </Link>
                  </div>
                  <div className="text-neutral-400 text-center text-xs">
                    By signing in with an account, you agree to Sciccor&apos;s{' '}
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

export default SignUp;
