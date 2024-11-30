// DropZone.js adapted from https://www.geeksforgeeks.org/implement-drag-and-drop-using-react-component/
import { useDrop } from 'react-dnd';
import DragItem from './DragItem';

const DropZone = ({ props }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => props.onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div className={ props.outerClass }>
            <div className={ "DropArea " + (isOver && "DropAreaIsOver") } ref={drop}>
                { props.title && <h3>{ props.title }</h3>}
                { props.getter.map((value) => (
                    <div key={value}>
                        <div className={ "Letter " + props.innerClass }>
                            <DragItem value={value} key={value} origin={ props.origin} />
                        </div>
                        {/* { props.allowDelete && <button onClick={() => props.handleRemoveItem(value, props.setter)}> X </button> } */}
                    </div>

                )) }
            </div>
        </div>


    );
};

export default DropZone;
