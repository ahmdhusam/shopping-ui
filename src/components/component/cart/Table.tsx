import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolBar';
import { useSelector } from 'react-redux';
import { CartProduct } from '../../../store/cart';
import { Typography } from '@mui/material';
import CountVisibility from './CountVisibility';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable() {
    const cartProducts = useSelector((state: any) => state.cart.cartProducts);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof CartProduct>('category');
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof CartProduct) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = cartProducts.map((n: CartProduct) => n.title);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_: React.MouseEvent<unknown>, title: string) => {
        const selectedIndex = selected.indexOf(title);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, title);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const isSelected = (title: string) => selected.indexOf(title) !== -1;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={cartProducts.length}
                        />
                        <TableBody>
                            {!!cartProducts.length ? (
                                cartProducts
                                    .slice()
                                    .sort(getComparator(order, orderBy))
                                    .map((product: CartProduct, index: number) => {
                                        const isItemSelected = isSelected(product.title);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => handleClick(event, product.title)}
                                                role='checkbox'
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={product.title}
                                                selected={isItemSelected}>
                                                <TableCell padding='checkbox'>
                                                    <Checkbox
                                                        color='primary'
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell component='th' id={labelId} scope='row' padding='none'>
                                                    {product.title}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <CountVisibility
                                                        count={product.countOfProducts!}
                                                        onAdd={(e: Event, _: number) => {
                                                            e.stopPropagation();
                                                        }}
                                                        onRemove={(e: Event, _: number) => {
                                                            e.stopPropagation();
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align='right'>{product.category}</TableCell>
                                                <TableCell align='right'>{product.price.toFixed(2)}</TableCell>
                                                <TableCell align='right'>{product.rate}</TableCell>
                                            </TableRow>
                                        );
                                    })
                            ) : (
                                <Typography variant='h6' p={2} m={1} pl={3} gutterBottom component='h6'>
                                    Empty
                                </Typography>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
