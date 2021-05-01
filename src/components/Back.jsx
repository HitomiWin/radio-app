import { useHistory } from 'react-router-dom';
import { CaretLeft } from 'react-bootstrap-icons';

function Back() {
    const history = useHistory();
    const handleHistory = () => {
        history.goBack();
    }
    return (
        <CaretLeft size={25} color={gray} onClick={handleHistory} />
    )
}

export default Back
