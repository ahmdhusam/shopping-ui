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
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, CartProduct } from '../../../store/cart';
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
    const { cartProducts, totalPrice } = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    const { increase, decrease, deleteSelected } = cartActions;

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof CartProduct>('category');
    const [selected, setSelected] = React.useState<readonly number[]>([]);

    const handleIncrease = (product: CartProduct, e: Event) => {
        e.stopPropagation();
        dispatch(increase(product));
    };

    const handleDecrease = (product: CartProduct, e: Event) => {
        e.stopPropagation();
        dispatch(decrease(product));
    };

    const handleDeleteSelected = () => {
        dispatch(deleteSelected(selected.slice()));
        setSelected([]);
    };

    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof CartProduct) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = cartProducts.map((n: CartProduct) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    React.useEffect(() => {
        const newArr = selected.filter((id: number) =>
            (cartProducts as CartProduct[]).some((item: CartProduct) => item.id === id)
        );
        setSelected(newArr);
    }, [cartProducts, setSelected]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onDeleteSelected={handleDeleteSelected}
                    totalPrice={totalPrice}
                />
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
                                        const isItemSelected = isSelected(product.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => handleClick(event, product.id)}
                                                role='checkbox'
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={product.id}
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
                                                    {product.title.length > 50
                                                        ? `${product.title.substr(0, 50)}...`
                                                        : product.title}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <CountVisibility
                                                        count={product.countOfProducts!}
                                                        onIncrease={handleIncrease.bind(null, product)}
                                                        onDecrease={handleDecrease.bind(null, product)}
                                                    />
                                                </TableCell>
                                                <TableCell align='right'>{product.category}</TableCell>
                                                <TableCell align='right'>{product.price.toFixed(2)}</TableCell>
                                                <TableCell align='right'>{product.rate}</TableCell>
                                            </TableRow>
                                        );
                                    })
                            ) : (
                                <TableRow>
                                    <TableCell>Empty</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
