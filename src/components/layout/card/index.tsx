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

export default function Card(props: Product) {
    const {
        title,
        image,
        description,
        price,
        rating: { rate }
    } = props;

    const parsedRate = Math.round(rate * 2) / 2;

    return (
        <MainCard sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
            <CardMedia sx={{ objectFit: 'fill' }} component='img' alt={title} height='400' image={image} />
            <CardContent sx={{ flexGrow: '3' }}>
                <Typography gutterBottom variant='h5' component='div'>
                    {title.substr(0, 25)}...
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
                    {description.substr(0, 200)}...
                </Typography>
            </CardContent>
            <CardActions sx={{ padding: '1rem', gap: '0.4rem' }}>
                <Typography variant='h6' component='span'>
                    ${price}
                </Typography>
                <Button size='small'>
                    <AddShoppingCartIcon /> <span>add to cart</span>
                </Button>
                <Button sx={{ gap: '2px' }} size='small'>
                    <InfoOutlinedIcon fontSize='small' /> <span>info</span>
                </Button>
            </CardActions>
        </MainCard>
    );
}
