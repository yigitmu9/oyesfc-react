import React from 'react';
import classes from './list-component.module.css';
import { Divider, List, ListItem } from '@mui/material';

interface ListComponentProps {
    data?: any;
    customStyle?: any;
}

const ListComponent: React.FC<ListComponentProps> = ({ data, customStyle }) => {
    return (
        <div className={classes.tableDiv} style={customStyle}>
            <List component="nav" aria-label="mailbox folders" style={{ width: '100%' }}>
                {data?.map((x: any, y: number) => (
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
