import React, {useState} from 'react';
import classes from "../AccountGrid/account-grid.module.css";
import {useDispatch, useSelector} from "react-redux";
import BackButton from "../../shared/BackButton/back-button";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import navbarClasses from "../Navbar/navbar.module.css";
import NotificationSettingsGrid from "../NotificationSettingsGrid/notification-settings-grid";
import {OYesFcEras} from "../../constants/constants";
import sharedClasses from "../../shared/Styles/shared-styles.module.css";
import {Alert} from "@mui/material";
import addMatchClasses from "../AddMatch/add-match.module.css";
import signInClasses from "../SignIn/sign-in.module.css";
import {changeEra} from "../../redux/eraSlice";
import AddNews from "../AddNews/add-news";

const SettingsGrid = () => {

    const dispatch = useDispatch();
    const { selectedEra } = useSelector((state: any) => state.era);
    const { isCaptain } = useSelector((state: any) => state.credentials);
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(0);
    const [formData, setFormData] = useState(selectedEra);

    const handleInputChange = (event?: any) => {
        const {name} = event.target;
        setFormData(name);
        localStorage.setItem('era', name)
        dispatch(changeEra({selectedEra: name}))
    };

    const handleBack = (data?: boolean) => {
        if (data) {
            navigate('/oyesfc-react/account')
        }
    }

    const handlePrevious = (data?: boolean) => {
        if (data) {
            setPage(0)
        }
    }

    if (page === 1) {
        return (
            <NotificationSettingsGrid handlePreviousPage={handlePrevious}/>
        )
    }

    if (page === 2) {
        return (
            <div style={{minHeight: '70vh'}}>
                <BackButton handleBackButton={handlePrevious} generalTitle={'Select Era'}/>
                <Box sx={{display: {xs: 'flex', md: 'none'}, height: '30px'}}></Box>
                {
                    <>
                        <div className={sharedClasses.emptyHeightSpace}></div>
                        <form className={signInClasses.formStyle}>
                            <div>
                                {
                                    Object.values(OYesFcEras)?.map((x, y) => (
                                        <div key={y}>
                                            <div className={signInClasses.inputDesign}>
                                                <label className={addMatchClasses.customCheckbox}>
                                                    {x}
                                                    <input
                                                        type="checkbox"
                                                        name={x}
                                                        checked={formData === x || false}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className={addMatchClasses.checkmark}></span>
                                                </label>
                                            </div>
                                            <div style={{height: '20px'}}></div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Alert sx={{
                                padding: '0.5 1',
                                borderRadius: '15px',
                                bgcolor: '#1C1C1E',
                                color: 'lightgray'
                            }}
                                   variant="outlined"
                                   severity='info'>{'Your selected era is: ' + formData}</Alert>
                        </form>
                    </>
                }
            </div>
        )
    }

    if (page === 3) {
        return (
            <AddNews handlePreviousPage={handlePrevious}/>
        )
    }

    return (
        <div style={{minHeight: '70vh'}}>
            <BackButton handleBackButton={handleBack} generalTitle={'Settings'}/>
            <Box sx={{display: {xs: 'flex', md: 'none'}, height: '30px'}}></Box>
            <div className={classes.morePageBox} onClick={() => setPage(1)}>
                <span className={navbarClasses.drawerRoutesSpan}>Notifications</span>
            </div>
            <div style={{height: '20px'}}></div>
            <div className={classes.morePageBox} onClick={() => setPage(2)}>
                <span className={navbarClasses.drawerRoutesSpan}>Select Era</span>
            </div>
            {
                isCaptain &&
                <>
                    <div style={{height: '20px'}}></div>
                    <div className={classes.morePageBox} onClick={() => setPage(3)}>
                        <span className={navbarClasses.drawerRoutesSpan}>Add News</span>
                    </div>
                </>
            }

        </div>
    );
};

export default SettingsGrid;
