import React from 'react';
import classes from './table-component.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface TableComponentProps {
    columns?: any;
    rows?: any;
    customStyles?: any;
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, rows, customStyles }) => {
    return (
        <div className={classes.tableStyle} style={customStyles}>
            <TableContainer
                style={{
                    backgroundColor: 'transparent',
                    color: 'lightgray',
                }}
            >
                <Table
                    stickyHeader
                    sx={{ minWidth: 650 }}
                    aria-label="sticky table"
                    style={{
                        backgroundColor: 'transparent',
                        color: 'lightgray',
                    }}
                >
                    <TableHead
                        style={{
                            backgroundColor: 'transparent',
                            color: 'lightgray',
                        }}
                    >
                        <TableRow
                            style={{
                                backgroundColor: 'transparent',
                                color: 'lightgray',
                            }}
                        >
                            {columns?.map((column: any, index: number) => (
                                <TableCell
                                    key={index}
                                    align={index !== 0 ? 'right' : 'left'}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'lightgray',
                                    }}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row: any, index: number) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'lightgray',
                                }}
                            >
                                {row?.map((x: any, y: number) => (
                                    <TableCell
                                        key={y}
                                        align={y !== 0 ? 'right' : 'left'}
                                        component={y === 0 ? 'th' : 'td'}
                                        scope={y === 0 ? 'row' : undefined}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'lightgray',
                                        }}
                                    >
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
