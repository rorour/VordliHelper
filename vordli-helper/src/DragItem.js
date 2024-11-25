//DragItem.js adapted from https://www.geeksforgeeks.org/implement-drag-and-drop-using-react-component/
import { useDrag } from 'react-dnd';
import './App.css';


const DragItem = ({ value, origin }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { value, origin },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{
            opacity: isDragging ? 0.5 : 1,
        }}>
            {value}
        </div>
    );
};

export default DragItem;
