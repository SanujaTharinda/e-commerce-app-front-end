
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout} from '../store/auth';
import { toastAction } from './../store/toastAction';

const Logout = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        window.location = '/';
        dispatch(toastAction({ message: "Logout Successfull...", type: 'info' }))
    });

    return null;
}
 
export default Logout;