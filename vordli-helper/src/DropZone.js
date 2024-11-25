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
            <h3>{ props.title }</h3>
            <div
                ref={drop}
                style={{
                    border: `1px dashed ${isOver ? 'green' : 'black'}`,
                    padding: '10px',
                }}>
                Drop here

                { props.getter.map((value) => (
                    <div key={value} className={ props.innerClass }>
                        <DragItem value={value} key={value} origin={ props.origin} />
                        <button onClick={() => props.handleRemoveItem(value, props.setter)}> Remove </button>, 
                    </div>

                )) }
                {/* <DragItem value="Item 5" /> */}
            </div>
        </div>


    );
};

export default DropZone;
