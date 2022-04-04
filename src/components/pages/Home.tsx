import { useSelector } from 'react-redux';

import Main from '../component/home/Main';
import Landing from '../component/home/landing';

// global state
import { GlobalState } from '../../store/store';

export default function Home() {
    const products = useSelector((state: GlobalState) => state.products.products);

    return (
        <div>
            <Landing />
            <Main products={products} />
        </div>
    );
}
