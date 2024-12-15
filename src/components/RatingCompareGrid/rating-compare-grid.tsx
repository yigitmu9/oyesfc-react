import React, {useState} from 'react';
import Box from "@mui/material/Box";
import BackButton from "../../shared/BackButton/back-button";
import {useNavigate} from "react-router-dom";
import ButtonComponent from "../../shared/ButtonComponent/button-component";
import RatingsGrid from "../RatingsGrid/ratings-grid";
import ComparisonGrid from "../ComparisonGrid/comparison-grid";

const RatingCompareGrid = () => {

    const navigate = useNavigate()
    const [page, setPage] = useState<number>(0);

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

    const returnStatType = (page?: number) => {
        const statTypes = ['Facilities', 'Players'];
        if (page === 1 || page === 3) {
            return statTypes[0]
        } else if (page === 2 || page === 4) {
            return statTypes[1]
        }
        return ''
    }


    if (page === 1 || page === 2) {
        const type = returnStatType(page)
        return (
            <RatingsGrid category={type} handlePreviousPage={handlePrevious}/>
        )
    }

    if (page === 3 || page === 4) {
        const type = returnStatType(page)
        return (
            <ComparisonGrid category={type} handlePreviousPage={handlePrevious}/>
        )
    }

    return (
        <div style={{minHeight: '70vh'}}>
            <BackButton handleBackButton={handleBack} generalTitle={'Ratings'}/>
            <Box sx={{display: {xs: 'flex', md: 'none'}, height: '30px'}}></Box>
            <ButtonComponent onClick={() => setPage(1)}
                             name={'Rate facilities'}
                             size={'large'}
                             textColor={'#007AFF'}
                             backgroundColor={'#1C1C1E'}/>
            <div style={{height: '20px'}}></div>
            <ButtonComponent onClick={() => setPage(2)}
                             name={'Rate players'}
                             size={'large'}
                             textColor={'#007AFF'}
                             backgroundColor={'#1C1C1E'}/>
            <div style={{height: '20px'}}></div>
            <ButtonComponent onClick={() => setPage(3)}
                             name={'Sort facilities'}
                             size={'large'}
                             textColor={'#007AFF'}
                             backgroundColor={'#1C1C1E'}/>
            <div style={{height: '20px'}}></div>
            <ButtonComponent onClick={() => setPage(4)}
                             name={'Sort players'}
                             size={'large'}
                             textColor={'#007AFF'}
                             backgroundColor={'#1C1C1E'}/>
        </div>
    );
};

export default RatingCompareGrid;
