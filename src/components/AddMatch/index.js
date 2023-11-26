import React, {useEffect, useRef, useState} from 'react';
import classes from "./add-match.module.css";
import {dataBase} from "../../firebase";
import {ref, set} from "firebase/database";

const AddMatchComponent = ({onClose, openMessage, messageData}) => {

    const popupRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [popupRef, onClose]);

    const initialFormData = {
        day: '',
        oyesfc: {
            goal: 0,
            squad: {},
        },
        place: '',
        rakipbul: false,
        rival: {
            goal: 0,
            name: '',
        },
        time: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [newSquadMember, setNewSquadMember] = useState('');

    const handleInputChange = (event) => {
        const {name, value, type, checked} = event.target;
        const inputValue = type === "checkbox" ? checked : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleInput2Change = (event) => {
        const {name, value, type} = event.target;
        const inputValue = type === "number" ? parseInt(value) : value;
        setFormData((prevData) => ({
            ...prevData,
            oyesfc: {
                ...prevData.oyesfc,
                [name]: inputValue,
            }
        }));
    };

    const handleSquadInputChange = (member, event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            oyesfc: {
                ...prevData.oyesfc,
                squad: {
                    ...prevData.oyesfc.squad,
                    [member]: {
                        goal: parseInt(value),
                    },
                },
            },
        }));
    };

    const handleRivalInputChange = (event) => {
        const {name, value, type} = event.target;
        const inputValue = type === "number" ? parseInt(value) : value;
        setFormData((prevData) => ({
            ...prevData,
            rival: {
                ...prevData.rival,
                [name]: inputValue,
            }
        }));
    };

    const handleAddSquadMember = () => {
        if (newSquadMember.trim() !== '') {
            setFormData((prevData) => ({
                ...prevData,
                oyesfc: {
                    ...prevData.oyesfc,
                    squad: {
                        ...prevData.oyesfc.squad,
                        [newSquadMember]: {
                            goal: 0,
                        },
                    },
                },
            }));
            setNewSquadMember('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        document.body.style.overflow = 'visible';
        onClose()
        const messageResponse = {
            isValid: false,
            message: 'Add new match is not available!'
        }
        messageData(messageResponse)
        openMessage(true)

        /*
        try {
            await set(ref(dataBase, formData.day), formData);
            setFormData(initialFormData);
            setNewSquadMember('');
            document.body.style.overflow = 'visible';
            onClose()
            const messageResponse = {
                isValid: true,
                message: 'Match successfully added.'
            }
            messageData(messageResponse)
            openMessage(true)
        } catch (error) {
            document.body.style.overflow = 'visible';
            onClose()
            const messageResponse = {
                isValid: false,
                message: 'An error occurred!'
            }
            messageData(messageResponse)
            openMessage(true)
        }
         */
    };

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    return (
        <div className={classes.overlay}>
            <div className={classes.generalStyle} ref={popupRef}>
                <form onSubmit={handleSubmit} style={{background: "#1f1f1f"}}>
                    <div className={classes.formAlign}>
                        <div className={classes.infoAlign}>
                            <label style={{background: "#1f1f1f"}}>
                                Rival Name:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="name"
                                    value={formData.rival.name}
                                    onChange={handleRivalInputChange}
                                />
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}} className={classes.customCheckbox}>
                                Rakipbul
                                <input
                                    type="checkbox"
                                    name="rakipbul"
                                    checked={formData.rakipbul}
                                    onChange={handleInputChange}
                                />
                                <span className={classes.checkmark}></span>
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}}>
                                Day:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="day"
                                    value={formData.day}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}}>
                                Time:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}}>
                                Place:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="place"
                                    value={formData.place}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}}>
                                O Yes FC Goal:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="number"
                                    name="goal"
                                    value={formData.oyesfc.goal}
                                    onChange={handleInput2Change}
                                />
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}}>
                                Rival Goal:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="number"
                                    name="goal"
                                    value={formData.rival.goal}
                                    onChange={handleRivalInputChange}
                                />
                            </label>
                            <br/>
                        </div>
                        <div className={classes.playersAlign}>
                            {Object.keys(formData.oyesfc.squad).map((member) => (
                                <div key={member} style={{background: "#1f1f1f"}}>
                                    <label style={{background: "#1f1f1f"}}>
                                        {member} Goal:
                                        <input
                                            className={classes.inputDesign}
                                            type="number"
                                            name={`oyesfc.squad.${member}.goal`}
                                            value={formData.oyesfc.squad[member].goal}
                                            onChange={(e) => handleSquadInputChange(member, e)}
                                        />
                                    </label>
                                    <br/>
                                </div>
                            ))}
                            <label style={{background: "#1f1f1f"}}>
                                Add Squad Member:
                                <input
                                    className={classes.inputDesign}
                                    type="text"
                                    value={newSquadMember}
                                    onChange={(e) => setNewSquadMember(e.target.value)}
                                />
                                <button className={classes.buttonStyle} type="button" onClick={handleAddSquadMember}>
                                    Add
                                </button>
                            </label>
                            <br/>
                        </div>
                    </div>
                    <div className={classes.buttonDivStyle}>
                        <button className={classes.buttonSubmitStyle} type="submit">Submit</button>
                        <button className={classes.buttonStyle} onClick={handleClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddMatchComponent;
