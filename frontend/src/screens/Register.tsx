import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { registerErrorType, registerType } from '../../interfaces/registerType';
import { useMutation } from '@apollo/client';
import { ADD_USER, GET_USERS } from '../../graphql/query/gqlQueries';
import { toast } from 'react-toastify';

const Register:React.FC = () => {

    const [registerData, setRegisterData] = useState<registerType>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: ""
    });

    const [registerError, setRegisterError] = useState<registerErrorType>({
        firstNameErr: "",
        lastNameErr: "",
        emailErr: "",
        passwordErr: "",
        phoneErr: ""
    });

    const [isValid, setIsValid] = useState<boolean>(false);

    const validate = (name: string, value: string) => {

        const NameRegex = /^[A-Z|a-z]+$/;
        const emailRegex = /^([\w]+)(\.[\w]+)?@([\w]+)\.([\w]{2,})$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const phoneRegex = /^\d{10}$/;

        switch (name) {
            case "firstName":
                if(value === "") {
                    setRegisterError((prev)=> ({...prev, firstNameErr: "Empty first name field"}));
                } else if(value.length <= 2) {
                    setRegisterError((prev)=> ({...prev, firstNameErr: "First should be greater than 2 characters"}));
                }
                else if (!NameRegex.test(value)) {
                    setRegisterError((prev)=> ({...prev, firstNameErr: "Enter a valid first name"}));
                } else {
                    setRegisterError((prev)=> ({...prev, firstNameErr: ""}));
                }
                break;
            case "lastName":
                if(value === "") {
                    setRegisterError((prev)=> ({...prev, lastNameErr: "Empty last name field"}));
                } else if(value.length <= 2) {
                    setRegisterError((prev)=> ({...prev, lastNameErr: "Last name should be greater than 2 characters"}));
                } else if(!NameRegex.test(value)) {
                    setRegisterError((prev)=> ({...prev, lastNameErr: "Enter a valid last name"}));
                } else {
                    setRegisterError((prev)=> ({...prev, lastNameErr: ""}));
                }
                break;
            case "email":
                if(value === "") {
                    setRegisterError((prev)=> ({...prev, emailErr: "Empty email field"}));
                } else if(!emailRegex.test(value)) {
                    setRegisterError((prev)=> ({...prev, emailErr: "Enter a valid email address"}));
                } else {
                    setRegisterError((prev)=> ({...prev, emailErr: ""}));
                }
                break;
            case "password":
                if(value === "") {
                    setRegisterError((prev)=> ({...prev, passwordErr: "Empty password field"}));
                } else if(!passwordRegex.test(value)) {
                    setRegisterError((prev)=> ({...prev, passwordErr: "Passwords must contain at least one capital character, one lowercase character, one digit, one special character and of 8 character long"}));
                } else {
                    setRegisterError((prev)=> ({...prev, passwordErr: ""}));
                }
                break;
            case "phone":
                if(value === "") {
                    setRegisterError((prev)=> ({...prev, phoneErr: "Empty Phone field"}));
                } else if(!phoneRegex.test(value)) {
                    setRegisterError((prev)=> ({...prev, phoneErr: "Enter a valid phone number"}));
                } else {
                    setRegisterError((prev)=> ({...prev, phoneErr: ""}));
                }
                break;
            default:
                break;
        };
    };
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;

        setRegisterData((prev)=> ({
            ...prev,
            [name]: value
        }));
        validate(name, value);
    };

    const [createNewUser] = useMutation(ADD_USER,{
        refetchQueries: [{query: GET_USERS}],
        awaitRefetchQueries: true
    });

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsRegistering(true);
        const newUser = {
            ...registerData,
            role: "user"
        };

        try {
            await createNewUser({
                variables: {
                    user: newUser
                }
            }).then(() => {
                setRegisterData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    phone: "",
                    role: ""
                })
                toast.success("User created successfully");
            })
        } catch(err) {
            console.error(`You got an error while creating/adding new user: ${err}`);
            toast.error('User already exists');
        } finally {
            setIsRegistering(false);
        }

    };

    useEffect(() => {
        const valid = !!(registerData.firstName&& registerData.lastName&& registerData.email&& registerData.password&&
            registerData.phone&& registerError.firstNameErr === ""&& registerError.lastNameErr === ""&& registerError.emailErr === ""&&
            registerError.passwordErr === ""&& registerError.phoneErr === ""
        );
        setIsValid(valid);
    },[registerData, registerError]);

  return (
    <div className='container-fluid'>
        <div className="row">
        <h2 className='text-center fw-lighter display-4'>Register </h2>
            <form onSubmit={handleSubmit} className='col-lg-4 m-auto border rounded-3 p-4 shadow'>

                {/* first name field */}
                <div className="form-group">
                    <label className='form-label' htmlFor="fname">FirstName</label>
                    <input onChange={handleChange} value={registerData.firstName} className='form-control' type="text" name="firstName" id="fname" />
                    {
                        registerError.firstNameErr&&
                        <span className='text-danger'>{registerError.firstNameErr}</span>
                    }
                </div>

                {/* last name field */}
                <div className="form-group">
                    <label className='form-label' htmlFor="lname">Last Name</label>
                    <input onChange={handleChange} value={registerData.lastName} className='form-control' type="text" name="lastName" id="lname" />
                    {
                        registerError.lastNameErr&&
                        <span className='text-danger'>{registerError.lastNameErr}</span>
                    }
                </div>

                {/* email field */}
                <div className='form-group'>
                    <label className='form-label' htmlFor="mail">Email</label>
                    <input onChange={handleChange} className='form-control' value={registerData.email} type="email" name="email" id="mail" />
                    {
                        registerError.emailErr&&
                        <span className='text-danger'>{registerError.emailErr}</span>
                    }
                </div>

                {/* password field */}
                <div className="form-group">
                    <label className='form-label' htmlFor="pass">Password</label>
                    <input onChange={handleChange} className='form-control' value={registerData.password} type="password" name="password" id="pass" />
                    {
                        registerError.passwordErr&&
                        <span className='text-danger'>{registerError.passwordErr}</span>
                    }
                </div>

                {/* phone number field */}
                <div className="form-group">
                    <label htmlFor="phon" className="form-label">Phone</label>
                    <input onChange={handleChange} type="text" name="phone" value={registerData.phone} id="phon" className="form-control" />
                    {
                        registerError.phoneErr&&
                        <span className='text-danger'>{registerError.phoneErr}</span>
                    }
                </div>

                {/* login button */}
                <div className='d-flex justify-content-center mt-2'>
                    <button disabled={!isValid||isRegistering} className='btn btn-primary' type="submit">{isRegistering? "Loading...": "Register"}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register;