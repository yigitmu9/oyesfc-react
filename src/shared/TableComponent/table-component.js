import React from 'react';
import classes from './table-component.module.css'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const TableComponent = ({columns, rows, customStyles}) => {

    return (
        <div className={classes.tableStyle} style={customStyles}>
            <TableContainer style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                <Table stickyHeader sx={{minWidth: 650}} aria-label="sticky table"
                       style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                    <TableHead style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                        <TableRow style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                            {columns.map((column, index) => (
                                <TableCell key={index} align={index !== 0 ? 'right' : 'left'}
                                           style={{
                                               backgroundColor: "rgb(36, 36, 36)",
                                               color: "lightgray"
                                           }}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}
                            >
                                {row?.map((x, y) => (
                                    <TableCell key={y}
                                               align={y !== 0 ? 'right' : 'left'}
                                               component={y === 0 ? 'th' : 'td'}
                                               scope={y === 0 ? 'row' : undefined}
                                               style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                        {x}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableComponent;
