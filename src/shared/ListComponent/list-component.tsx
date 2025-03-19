import React from 'react';
import classes from './list-component.module.css';
import { Divider, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Box from '@mui/material/Box';

interface ListComponentProps {
    data?: any;
    customStyle?: any;
    loadingLineNumber?: number;
}

const ListComponent: React.FC<ListComponentProps> = ({ data, customStyle, loadingLineNumber }) => {
    const { loadingData } = useSelector((state: any) => state.databaseData);
    return (
        <div className={classes.tableDiv} style={customStyle}>
            <List component="nav" aria-label="mailbox folders" style={{ width: '100%' }}>
                {loadingData &&
                    Array.from({ length: loadingLineNumber || 5 }, (_: any, i: number) => (
                            <Box key={i}>
                                <SkeletonTheme baseColor="#202020" highlightColor="#444" key={i}>
                                    <Skeleton className={classes.tableDiv} style={customStyle}/>
                                </SkeletonTheme>
                            </Box>

                        ))
                }
                {!loadingData && data?.map((x: any, y: number) => (
                    <div key={y}>
                        <ListItem
                            style={{
                                backgroundColor: 'transparent',
                                justifyContent: 'space-between',
                                display: 'flex',
                                textAlign: 'end',
                            }}
                        >
                            <p className={classes.listItemSpanStyle}>{x[0]}</p>
                            <p className={classes.listItemSpanStyle}>{x[1]}</p>
                        </ListItem>
                        {data?.length !== y + 1 && <Divider sx={{ bgcolor: '#646464' }} variant="middle" color="red" />}
                    </div>
                ))}
            </List>
        </div>
    );
};

export default ListComponent;
