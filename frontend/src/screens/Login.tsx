import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { loginType } from '../../interfaces/loginType';
import { loginErrorType } from '../../interfaces/loginErrorType';
import { useMutation } from '@apollo/client';
import { CHECK_USER } from '../../graphql/query/gqlQueries';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login:React.FC = () => {

    const [loginInfo, setLoginInfo] = useState<loginType>({
        email: "",
        password: ""
    });
    
    const [loginError, setLoginError] = useState<loginErrorType>({
        emailErr: "",
        passwordErr: ""
    });

    const [isValid, setIsValid] = useState<boolean>(false);
    const [isLoging, setIsLoging] = useState<boolean>(false);

    const navigate = useNavigate();

    const validate = (name: string, value:string) => {
        const emailRegex = /^([\w]+)(\.[\w]+)?@([\w]+)\.([\w]{2,})$/;

        switch (name) {
            case "email":
                if(value === "") {
                    setLoginError((prev)=>({...prev, emailErr: "Empty email field"}));
                } else if(!emailRegex.test(value)) {
                    setLoginError((prev)=>({...prev, emailErr: "Enter a valid email"}));
                } else {
                    setLoginError((prev)=> ({...prev, emailErr: ""}));
                }
                break;
            
            case "password":
                if(value === "") {
                    setLoginError((prev)=> ({...prev, passwordErr: "Empty password field"}));
                } else {
                    setLoginError((prev)=> ({...prev, passwordErr: ""}));
                }
                break;
            default:
                break;
        };
    };

    const handleChange = (e:ChangeEvent) => {
        const {name, value} = e.target as HTMLInputElement;

        setLoginInfo((prev)=> ({
            ...prev,
            [name]: value
        }));
        validate(name, value);
    };

    const [authenticateUser] = useMutation(CHECK_USER);
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoging(true);
        try {
            await authenticateUser({
                variables: {
                    mail: loginInfo.email,
                    pass: loginInfo.password
                }
            }).then(() => {
                toast.success("User Logged in successfully");
                localStorage.setItem("user", loginInfo.email);
                navigate("/users");
            }).catch(err => {
                toast.error(`Login Error: ${err}`);
            })
        } catch(err) {
            console.error(`You got an error while logging in: ${err}`);
        } finally {
            setIsLoging(false);
        }
    };

    useEffect(()=> {
        const valid = !!(loginInfo.email&& loginInfo.password&& loginError.emailErr === ""&& loginError.passwordErr === "");
        setIsValid(valid);
    },[loginInfo, loginError]);


  return (
    <div className='container-fluid'>
        <div className='row'>
            <h2 className='text-center fw-lighter display-4'>Login</h2>
            <form onSubmit={handleSubmit} className='col-lg-4 col-md-5 m-auto border rounded-3 p-4 shadow'>
                
                {/* email field */}
                <div className="form-group">
                    <label className='form-label' htmlFor="mail">Email</label>
                    <input onChange={handleChange} value={loginInfo.email} className='form-control' type="email" name="email" id="mail" />
                    {
                        loginError.emailErr&&
                        <span className='text-danger'>{loginError.emailErr}</span>
                    }
                </div>

                {/* password field */}
                <div className="form-group">
                    <label className='form-label' htmlFor="pass">Password</label>
                    <input onChange={handleChange} value={loginInfo.password} className='form-control' type="password" name="password" id="pass" />
                    {
                        loginError.passwordErr&&
                        <span className='text-danger'>{loginError.passwordErr}</span>
                    }
                </div>

                {/* login button */}
                <div className='d-flex justify-content-center mt-2'>
                    <button disabled={!isValid||isLoging} className='btn btn-primary' type="submit">{isLoging?"Loading...":"Login"}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;