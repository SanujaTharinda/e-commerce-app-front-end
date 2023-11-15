import { ListGroup } from 'react-bootstrap';

const CommonListGroup = ({list, defaultSelected, selected, onSelect}) => {
    return ( 
      <>
        <ListGroup horizontal>
            <ListGroup.Item key = {`#${defaultSelected}`} active={selected === defaultSelected} onClick={() => onSelect(defaultSelected)} action>{defaultSelected}</ListGroup.Item>
            {list.map(l => <ListGroup.Item key = {`#${l}`} active={selected === l} onClick={() => onSelect(l)} action>{l}</ListGroup.Item>)}
        </ListGroup>
      </>
     );
}
 
export default CommonListGroup;