import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// MUI components
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

// global state
import { menuActions } from '../../../store/menu';

export default function Menu() {
    const { isOpen } = useSelector((state: any) => state.menu);
    const dispatch = useDispatch();
    const { openMenu, closeMenu } = menuActions;

    const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? 'rgb(46, 125, 50)' : 'inherit',
        textDecoration: 'none'
    });

    return (
        <SwipeableDrawer
            anchor={'left'}
            open={isOpen}
            onClose={dispatch.bind(null, closeMenu())}
            onOpen={dispatch.bind(null, openMenu())}>
            <Typography variant='h5' p={1} m={0} pl={2} gutterBottom component='h5'>
                MENU
            </Typography>
            <Divider />
            <Box sx={{ width: 250 }} role='presentation'>
                <List>
                    {['Home', 'Cart'].map(text => (
                        <Fragment key={text}>
                            <NavLink to={'/' + text.toLowerCase()} style={navLinkStyle}>
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
