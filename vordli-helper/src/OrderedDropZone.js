// DropZone.js adapted from https://www.geeksforgeeks.org/implement-drag-and-drop-using-react-component/
import { useDrop } from 'react-dnd';
import DragItem from './DragItem';

const OrderedDropZone = ({ props }) => {
    const SingleLetterProps = (index) => {
        return {
            onDrop: (item) => props.onDrop(item, index),
            value: props.getter[index],
            origin: props.originPrefix + index,
            innerClass: props.innerClass,
        }
    }

    return ( 
        <div className="OrderedDropZone">
            {Array(props.numLettersInSolution).fill(null).map((_, index) => (
                <div key={index}>
                    <SingleLetterDropZone props={ SingleLetterProps(index) } />
                </div>
            ))}
        </div>
     );
}
 
const SingleLetterDropZone = ( { props }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => props.onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (  
        <div className={ "DropArea GreenLetters " + (isOver && "DropAreaIsOver") } ref={drop}>
            {
                props.value &&
                <div className={ "Letter " + props.innerClass }>
                    <DragItem value={props.value} key={props.value} origin={props.origin}/>
                </div>
            }
        </div>
    );
};

export default OrderedDropZone;
