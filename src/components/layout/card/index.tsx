import MainCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Product } from '../../../store/products';
import { Rating } from '@mui/material';
import { Box } from '@mui/system';
import { cartActions } from '../../../store/cart';
import { useDispatch } from 'react-redux';
import { parsePrice } from '../../../lib/parsePrice';
import { modalActions } from '../../../store/modal';

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+'
};

interface CardProps {
    product: Product;
    isNotDefault?: boolean;
}

export default function Card(props: CardProps) {
    const { product, isNotDefault = false } = props;
    const {
        title,
        image,
        description,
        price,
        rating: { rate }
    } = product;
    const dispatch = useDispatch();
    const { addToCart } = cartActions;
    const { openModal } = modalActions;

    const parsedRate = Math.round(rate * 2) / 2;

    return (
        <MainCard sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
            {!isNotDefault && (
                <CardMedia sx={{ objectFit: 'fill' }} component='img' alt={title} height='400' image={image} />
            )}
            <CardContent sx={{ flexGrow: '3' }}>
                <Typography gutterBottom variant='h5' component='div'>
                    {!isNotDefault ? `${title.substr(0, 25)} ...` : title}
                </Typography>
                <Typography variant='overline' component='div'>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <Rating name='text-feedback' defaultValue={parsedRate} precision={0.5} />
                        <Box sx={{ ml: 2 }}>{labels[parsedRate]}</Box>
                    </Box>
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {!isNotDefault ? `${description.substr(0, 200)} ...` : description}
                </Typography>
            </CardContent>
            <CardActions sx={{ padding: '1rem', gap: '0.4rem', justifyContent: 'space-between' }}>
                <Typography variant='h6' component='span'>
                    {parsePrice(price)}
                </Typography>
                <Button
                    size='small'
                    startIcon={<AddShoppingCartIcon />}
                    onClick={dispatch.bind(null, addToCart(product))}>
                    add to cart
                </Button>
                {!isNotDefault && (
                    <Button
                        size='small'
                        startIcon={<InfoOutlinedIcon fontSize='small' />}
                        onClick={dispatch.bind(null, openModal(product))}>
                        info
                    </Button>
                )}
            </CardActions>
        </MainCard>
    );
}
