import * as React from 'react';
import MainCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Card() {
    return (
        <MainCard sx={{ maxWidth: 345 }}>
            <CardMedia
                component='img'
                alt='green iguana'
                height='140'
                image='/static/images/cards/contemplative-reptile.jpg'
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    Lizard
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>
                    <AddShoppingCartIcon /> add to cart
                </Button>
                <Button size='small'>See More</Button>
            </CardActions>
        </MainCard>
    );
}
