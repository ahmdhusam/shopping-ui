import { Fragment } from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../store/cart';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

export default function Cart() {
    const { isOpen } = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    const { openCart, closeCart } = cartActions;

    return (
        <SwipeableDrawer
            anchor={'left'}
            open={isOpen}
            onClose={dispatch.bind(null, closeCart())}
            onOpen={dispatch.bind(null, openCart())}>
            <Typography variant='h5' p={1} m={0} pl={2} gutterBottom component='h5'>
                MENU
            </Typography>
            <Divider />
            <Box sx={{ width: 250 }} role='presentation'>
                <List>
                    {['Home', 'Cart'].map(text => (
                        <Fragment>
                            <NavLink to={'/' + text.toLowerCase()} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button key={text}>
                                    <ListItemIcon>{text === 'Home' ? <HomeIcon /> : <ShoppingCartIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </NavLink>
                            <Divider />
                        </Fragment>
                    ))}
                </List>
            </Box>
        </SwipeableDrawer>
    );
}
