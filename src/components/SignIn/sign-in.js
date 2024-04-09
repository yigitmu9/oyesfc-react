import React, {useEffect, useRef, useState} from 'react';
import classes from "./sign-in.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddMatchComponent from "../AddMatch/add-match";
import Message from "../Message/message";
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from "../../firebase"
import AddIcon from "@mui/icons-material/Add";
import LoadingPage from "../../pages/loading-page";
import SelectEditMatchModal from "../SelectEditMatchModal/select-edit-match-modal";
import EditIcon from '@mui/icons-material/Edit';

const SignIn = ({onClose, openMessage, messageData, databaseData, reloadData}) => {

    const popupRef = useRef(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [credentials, setCredentials] = useState(null)
    const [signedIn, setSignedIn] = useState(false)
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
                checkAuthState()
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

    const openAddMatchPopup = () => {
        document.body.style.overflow = 'hidden';
        setPopupOpen(true);
    };

    const openEditMatchPopup = () => {
        document.body.style.overflow = 'hidden';
        setEditPopupOpen(true);
    };

    const checkAuthState = async () => {
        await onAuthStateChanged(auth, user => {
            if (user && !signedIn) {
                setSignedIn(true)
                setCredentials(user)
            } else if (!user && signedIn) {
                setSignedIn(false)
            }
        })
    }

    useEffect(() => {
        const checkAuthState = async () => {
            await onAuthStateChanged(auth, user => {
                if (user && !signedIn) {
                    setSignedIn(true)
                    setCredentials(user)
                } else if (!user && signedIn) {
                    setSignedIn(false)
                }
            })
        }
        checkAuthState().then(r => r)
    });

    const logOut = async () => {
        setLoading(true)
        await signOut(auth)
            .then(() => {
                if (signedIn) {
                    setSignedIn(false)
                    setCredentials(null)
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
                {!isPopupOpen && !isMessagePopupOpen && <div className={classes.generalStyle} ref={popupRef}>
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
            {!isPopupOpen && !isMessagePopupOpen && !isEditPopupOpen && <div className={classes.generalStyle} ref={popupRef}>
                <div className={classes.signedInStyle}>
                    <div className={classes.iconDivStyle}>
                        <AccountCircleIcon sx={{width: "200px", height: "200px"}}
                                           className={classes.iconStyle}></AccountCircleIcon>
                    </div>
                    <h1 className={classes.titleStyle}>Welcome</h1>
                    <h1 className={classes.usernameStyle}>{credentials?.email}</h1>
                    <div className={classes.addMatchButtonDiv}>
                        <div className={classes.addMatchDiv} onClick={openAddMatchPopup}>
                            <AddIcon className={classes.addIconStyle}></AddIcon>
                            <span className={classes.addMatchSpan}>Add Match</span>
                        </div>
                    </div>
                    <div className={classes.addMatchButtonDiv}>
                        <div className={classes.addMatchDiv} onClick={openEditMatchPopup}>
                            <EditIcon className={classes.addIconStyle}></EditIcon>
                            <span className={classes.addMatchSpan}>Edit Match</span>
                        </div>
                    </div>
                    <div className={classes.buttonDivStyle}>
                        <button className={classes.buttonStyle} style={{marginRight: "1rem"}} onClick={logOut}>Log
                            Out
                        </button>
                        <button className={classes.buttonStyle} onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>}
            {isPopupOpen && <AddMatchComponent openMessage={() => setMessagePopupOpen(true)}
                                               onClose={() => setPopupOpen(false)}
                                               messageData={(messageData) => handleXClick(messageData)}
                                               databaseData={databaseData}/>}
            {isMessagePopupOpen && <Message messageData={messageData2} onClose={() => setMessagePopupOpen(false)} reloadData={handleReload}/>}
            {isEditPopupOpen && <SelectEditMatchModal databaseData={databaseData} onClose={() => setEditPopupOpen(false)} reloadData={handleReload}/>}
        </div>
    );
};

export default SignIn;
