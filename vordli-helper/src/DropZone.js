// DropZone.js adapted from https://www.geeksforgeeks.org/implement-drag-and-drop-using-react-component/
import { useEffect } from 'react'
import { useDrop } from 'react-dnd';
import DragItem from './DragItem';
import React from 'react';

const DropZone = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

useEffect(() => {
    console.log(isOver);
}, [isOver]);

    return (
        <div
            ref={drop}
            style={{
                border: `1px dashed ${isOver ? 'green' : 'black'}`,
                padding: '10px',
            }}>
            Drop here
            {/* <DragItem name="Item 5" /> */}
        </div>
    );
};

export default DropZone;
