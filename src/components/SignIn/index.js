import React, {useEffect, useRef, useState} from 'react';
import classes from "./sign-in.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddMatchComponent from "../AddMatch";
import Message from "../Message";
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from "../../firebase"

const SignInComponent = ({onClose, openMessage, messageData2}) => {

    const popupRef = useRef(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [messageData, setmessageData] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [credentials, setCredentials] = useState(null)
    const [signedIn, setSignedIn] = useState(false)
    let yes;

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    const handleXClick = (messageData) => {
        setmessageData(messageData);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [popupRef, onClose]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                checkAuthState()
            })
            .catch((error) => {
                console.log(error)
                onClose()
                const messageResponse = {
                    isValid: false,
                    message: 'An error occurred!'
                }
                messageData(messageResponse)
                openMessage(true)
            })
    };

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    const openAddMatchPopup = () => {
        setPopupOpen(true);
    };

    const checkAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setSignedIn(true)
                setCredentials(user)
                console.log(credentials)
            } else {
                setSignedIn(false)
            }
        })
    }

    const logOut = async () => {
        await signOut(auth)
            .then((x) => {
                setSignedIn(false)
                setCredentials(null)
                handleClose()
            })
            .catch((error) => {
                console.log(error)
                onClose()
                const messageResponse = {
                    isValid: false,
                    message: 'An error occurred!'
                }
                messageData(messageResponse)
                openMessage(true)
            })

    }

    return (
        <div className={classes.overlay}>
            { !isPopupOpen && !isMessagePopupOpen && <div className={classes.generalStyle} ref={popupRef}>
                { checkAuthState() && !signedIn ? <form onSubmit={handleSubmit} style={{background: "#1f1f1f"}}>
                    <div className={classes.infoAlign}>
                        <div className={classes.iconDivStyle}>
                            <AccountCircleIcon sx={{width: "200px", height: "200px"}}
                                               className={classes.iconStyle}></AccountCircleIcon>
                        </div>
                        <h1 className={classes.titleStyle}>Sign In</h1>
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
                    </div>
                    <div className={classes.buttonDivStyle}>
                        <button className={classes.buttonStyle} style={{marginRight: "1rem"}} type="submit">Sign In
                        </button>
                        <button className={classes.buttonStyle} onClick={handleClose}>Cancel</button>
                    </div>
                </form> :
                    <div className={classes.signedInStyle}>
                        <div className={classes.iconDivStyle}>
                            <AccountCircleIcon sx={{width: "200px", height: "200px"}}
                                               className={classes.iconStyle}></AccountCircleIcon>
                        </div>
                        <h1 className={classes.titleStyle}>Welcome</h1>
                        <h1 className={classes.usernameStyle}>{credentials?.email}</h1>
                        <div className={classes.buttonDivStyle}>
                            <button className={classes.buttonStyle} onClick={openAddMatchPopup}>Add Match</button>
                        </div>
                        <div className={classes.buttonDivStyle}>
                            <button className={classes.buttonStyle} style={{marginRight: "1rem"}} onClick={logOut}>Log
                                Out
                            </button>
                            <button className={classes.buttonStyle} onClick={handleClose}>Close</button>
                        </div>
                    </div>}
            </div>}
            {isPopupOpen && <AddMatchComponent openMessage={() => setMessagePopupOpen(true)}
                                               onClose={() => setPopupOpen(false)}
                                               messageData={(messageData) => handleXClick(messageData)}/>}
            {isMessagePopupOpen && <Message messageData={messageData} onClose={() => setMessagePopupOpen(false)} />}
        </div>
    );
};

export default SignInComponent;
