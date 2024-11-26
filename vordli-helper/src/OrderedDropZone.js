// DropZone.js adapted from https://www.geeksforgeeks.org/implement-drag-and-drop-using-react-component/
import { useDrop } from 'react-dnd';
import DragItem from './DragItem';

const OrderedDropZone = ({ props }) => {

    const SingleLetterProps = (index) => {
        return {
            onDrop: (item) => {console.log("dropped item", item, "at index", index)},
            index: index,
            value: " a" + index + "z",
            origin: props.originPrefix + index,
        }
    }
    return ( 
        <div>
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
        <div className="GreenLetter">
            <div className={ "DropArea " + (isOver && "DropAreaIsOver") } ref={drop}>
                Drop item {props.index} here 
                <DragItem value={props.value} key={props.value} origin={props.origin}/>
            </div>
        </div>


    );
};

export default OrderedDropZone;
