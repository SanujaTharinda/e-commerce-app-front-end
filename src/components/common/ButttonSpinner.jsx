import { Button, Spinner  } from 'react-bootstrap';


const ButtonSpinner = ({message}) => {
    return ( 
        <>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                {message}
            </Button>
        </>
     );
}
 
export default ButtonSpinner;