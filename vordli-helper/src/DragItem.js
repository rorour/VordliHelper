//DragItem.js adapted from https://www.geeksforgeeks.org/implement-drag-and-drop-using-react-component/
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ name, mykey, origin }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { name, mykey, origin },
        // end: (item, monitor) => {
        //     const dropResult = monitor.getDropResult();
        //     if (item && dropResult) {
        //       alert(`You dropped ${item} ${selectedTreeNodes} into ${dropResult}!`);
        //     }
        //   },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        console.log("isDragging", isDragging, name, mykey);
    }, [isDragging, name]);

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                margin: '5px',
                backgroundColor: 'lightblue',
            }}>
            {name}
        </div>
    );
};

export default DragItem;
