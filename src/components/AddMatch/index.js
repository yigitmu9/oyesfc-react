import React, {useEffect, useRef, useState} from 'react';
import classes from "./add-match.module.css";
import {dataBase} from "../../firebase";
import {ref, set} from "firebase/database";
import {TeamMembers} from "../../constants/constants";

const AddMatchComponent = ({onClose, openMessage, messageData, databaseData}) => {

    let facilities = [];
    Object.values(databaseData)?.forEach((x) => {
        if (!facilities.includes(x.place)) {
            facilities.push(x.place)
        }
    } )

    const [isRakipbul, setIsRakipbul] = useState(false);
    let rivalNames = [];
    Object.values(databaseData)?.forEach((x) => {
        if (!rivalNames.includes(x.rival.name) && x.rakipbul === isRakipbul) {
            rivalNames.push(x.rival.name)
        }
    } )

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
        if (type === "checkbox" && isRakipbul !== checked) {
            setIsRakipbul(checked);
        }
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
        setDayTime();
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
    };

    const setDayTime = () => {
        const [datePart, timePart] = formData.day.split('T');

        const [year, month, day] = datePart.split('-');
        const dateFormat = `${day}-${month}-${year}`;

        const [hour, minute] = timePart.split(':');
        const timeFormat = `${hour}:${minute}`;

        const nextHour = new Date(`${year}-${month}-${day}T${hour}:${minute}`);
        nextHour.setHours(nextHour.getHours() + 1);
        const [nextHourStr, nextMinuteStr] = [nextHour.getHours(), nextHour.getMinutes()].map(num => num.toString().padStart(2, '0'));
        const nextTimeFormat = `${nextHourStr}:${nextMinuteStr}`;

        formData.day = dateFormat;
        formData.time = `${timeFormat}-${nextTimeFormat}`;
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
                                Select a Rival:
                                <select className={classes.select}
                                        onChange={handleRivalInputChange}
                                        required={true}
                                        name="name"
                                        value={formData.rival.name}>
                                    <option value={'New Rival'}>New Rival</option>
                                    {rivalNames.map(x => (
                                        <option value={x}>{x}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>
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
                            <label style={{background: "#1f1f1f", width: "100%", minWidth: "100%"}}>
                                Day & Time:
                                <input
                                    style={{width: "100%", minWidth: "100%"}}
                                    className={classes.dayTimeDesign}
                                    required={true}
                                    type="datetime-local"
                                    name="day"
                                    value={formData.day}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br/>
                            <label style={{background: "#1f1f1f"}}>
                                Select a Facility:
                                <select className={classes.select}
                                        onChange={handleInputChange}
                                        required={true}
                                        name="place"
                                        value={formData.place}>
                                    <option value={'New Facility'}>New Facility</option>
                                    {facilities.map(x => (
                                        <option value={x}>{x}</option>
                                    ))}
                                </select>
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
                                Select O Yes FC Member:
                                <select className={classes.select}
                                        onChange={(e) =>
                                            setNewSquadMember(e.target.value !== 'None' ? e.target.value : '')}
                                        value={newSquadMember}>
                                    <option></option>
                                    {Object.values(TeamMembers).map(x => (
                                        <option placeholder='yes' value={x.name}>{x.name}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>
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
                        <button className={classes.buttonStyle} style={{ marginRight: "1rem"}} type="submit">Submit</button>
                        <button className={classes.buttonStyle} onClick={handleClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddMatchComponent;
