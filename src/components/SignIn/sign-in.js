import React, {useState} from 'react';
import classes from "./sign-in.module.css";
import {SnackbarMessages} from "../../constants/constants";
import {Alert} from "@mui/material";
import {useDispatch} from "react-redux";
import {checkAuthState, signInUser} from "../../services/service";
import {login, logout} from "../../redux/credentialsSlice";
import {PulseLoader} from "react-spinners";
import navbarClasses from "../Navbar/navbar.module.css";

const SignIn = () => {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false);
    const initialFormData = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true)
        const response = await signInUser(formData.email, formData.password);
        if (response?.success) {
            const authResponse = await checkAuthState();
            if (authResponse?.signedIn && authResponse?.success) {
                dispatch(login({
                    userName: authResponse?.userName,
                    isCaptain: authResponse?.isCaptain,
                    email: authResponse?.email,
                    id: authResponse?.id,
                }))
            } else if (!authResponse?.signedIn && authResponse?.success) {
                dispatch(logout())
            } else if (!authResponse?.success) {
                setErrorMessage(authResponse?.error)
            }
        } else {
            if (response?.error?.message === SnackbarMessages.invalid_credentials) {
                setErrorMessage(SnackbarMessages.invalid_email_password)
            } else {
                setErrorMessage(response?.error?.message)
            }
        }
        setLoading(false)
    }

    return (
        <>
            <form className={classes.formStyle}>
                <div>
                    <input
                        className={classes.inputDesign}
                        required={true}
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <div style={{height: '20px'}}></div>
                    <input
                        className={classes.inputDesign}
                        required={true}
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errorMessage &&
                        <Alert sx={{ padding: '0.5 1', marginTop: '20px', borderRadius: '15px', bgcolor: '#1C1C1E', color: 'lightgray'}}
                               variant="outlined" severity='error'>{errorMessage}</Alert>}
                </div>
                <div style={{height: '20px'}}></div>
                <div className={classes.morePageBox} onClick={() => handleSubmit()}>
                    {
                        loading ?
                            <PulseLoader color="red" speedMultiplier={0.7}/>
                            :
                            <span className={classes.drawerRoutesSpan}>Sign In</span>
                    }
                </div>
            </form>
            <div style={{height: '5px'}}></div>
            <div style={{padding: '0 20px'}}>
                <span className={navbarClasses.miniTitle}>{'To access your account; after entering your email and password, click the \'Sign In\' button.'}</span>
            </div>
            <div style={{height: '30px'}}></div>
        </>
    );
};

export default SignIn;
