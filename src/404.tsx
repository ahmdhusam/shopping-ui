import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const goBack = setTimeout(() => {
            navigate('/home', { replace: true });
        }, 3 * 1000);

        return () => clearTimeout(goBack);
    }, []);
    return (
        <div>
            Not Found <Link to='/'>Go Back?</Link>
        </div>
    );
}
