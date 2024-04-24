import React, {useEffect, useRef, useState} from 'react';
import classes from "./sign-in.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Message from "../Message/message";
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from "../../firebase"
import LoadingPage from "../../pages/loading-page";

const SignIn = ({onClose, openMessage, messageData, databaseData, reloadData, credentials, checkAuth}) => {

    const popupRef = useRef(null);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signedIn, setSignedIn] = useState(credentials?.signedIn)
    const [errorMessage, setErrorMessage] = useState(false)
    const [messageData2, setMessageData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    const handleXClick = (messageData) => {
        setMessageData(messageData);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                checkAuth(true)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(true)
            })
        setLoading(false);
    };

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    const logOut = async () => {
        setLoading(true)
        await signOut(auth)
            .then(() => {
                if (signedIn) {
                    checkAuth(true)
                }
            })
            .catch((error) => {
                console.log(error)
                const messageResponse = {
                    isValid: false,
                    message: 'An error occurred!'
                }
                messageData(messageResponse)
                openMessage(true)
            })
        setLoading(false)
    }

    const handleReload = (data) => {
        reloadData(data)
        handleClose()
    }

    if (loading) {
        return (
            <div className={classes.overlay}>
                <div className={classes.generalStyle} ref={popupRef}>
                    <LoadingPage/>
                </div>
            </div>
        )
    }

    if (!signedIn) {
        return (
            <div className={classes.overlay}>
                {<div className={classes.generalStyle} ref={popupRef}>
                    <form onSubmit={handleSubmit} style={{background: "#1f1f1f"}}>
                        <div className={classes.infoAlign}>
                            <div className={classes.iconDivStyle}>
                                <AccountCircleIcon sx={{width: "200px", height: "200px"}}
                                                   className={classes.iconStyle}></AccountCircleIcon>
                            </div>
                            <h1 className={classes.titleStyle}>Log In</h1>
                            <label style={{background: "#1f1f1f"}}>
                                Email:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}}>
                                Password:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </label>
                            {errorMessage && <span className={classes.errorMessage}>Invalid email or password!</span>}
                        </div>
                        <div className={classes.buttonDivStyle}>
                            <button className={classes.buttonStyle} style={{marginRight: "1rem"}} type="submit">Log In
                            </button>
                            <button className={classes.buttonStyle} onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </div>}
                {isMessagePopupOpen && <Message messageData={messageData2} onClose={() => setMessagePopupOpen(false)}/>}
            </div>
        )
    }

    return (
        <div className={classes.overlay}>
            {!isMessagePopupOpen && <div className={classes.generalStyle} ref={popupRef}>
                <div className={classes.signedInStyle}>
                    <div className={classes.iconDivStyle}>
                        <AccountCircleIcon sx={{width: "200px", height: "200px"}}
                                           className={classes.iconStyle}></AccountCircleIcon>
                    </div>
                    <h1 className={classes.titleStyle}>Welcome</h1>
                    <h1 className={classes.usernameStyle}>{credentials?.userName}</h1>
                    <div className={classes.buttonDivStyle}>
                        <button className={classes.buttonStyle} style={{marginRight: "1rem"}} onClick={logOut}>Log
                            Out
                        </button>
                        <button className={classes.buttonStyle} onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>}
            {isMessagePopupOpen && <Message messageData={messageData2} onClose={() => setMessagePopupOpen(false)} reloadData={handleReload}/>}
        </div>
    );
};

export default SignIn;
