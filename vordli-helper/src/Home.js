import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';

const Home = () => {
    return ( 
        <div>
            <QueryBuilder />
        </div>
     );
}

const QueryBuilder = () => {
    const letterFields = Object.freeze({
        availableAlphabet: Symbol("availableAlphabet"),
        yellowLetters: Symbol("yellowLetters"),
        grayLetters: Symbol("grayLetters"),
    })
    const fullAlphabet = ["a", "b", "c", "d", "e"]
    const [availableAlphabet, setAvailableAlphabet] = useState(fullAlphabet);
    const [yellowLetters, setYellowLetters] = useState([]);
    const [grayLetters, setGrayLetters] = useState([]);

    const [droppedItems, setDroppedItems] = useState([]); //delete



    useEffect(() => {
        console.log(yellowLetters)
     }, [yellowLetters])

    const handleDrop = (item) => {
        // todo all drops should remove from other arrays
        // todo delete me
    };

    const removeOriginLetter = (item) => {
        console.log("removing", item);
        let getter = null;
        let setter = null;
        switch (item.origin) {
            case letterFields.availableAlphabet:
                getter = availableAlphabet;
                setter = setAvailableAlphabet;
        }
// wtf is happening, some kind of caching?
        const updatedItems = [...getter];
        console.log("before", updatedItems);
        console.log("index", updatedItems.indexOf(item.name));
        updatedItems.splice(updatedItems.indexOf(item.name), 1);
        console.log("after", updatedItems);
        setter(updatedItems);

    };

    const handleAlphabetDrop = (item) => {
        setAvailableAlphabet((prevItems) => [...prevItems, item]);
    };

    const handleYellowDrop = (item) => {
        console.log("item with origin dropped to yellow", item.origin)
        removeOriginLetter(item);
        setYellowLetters((prevItems) => [...prevItems, item.name]);
    };

    const handleGrayDrop = (item) => {
        setGrayLetters((prevItems) => [...prevItems, item]);
    };

    const handleRemoveItem = (index) => {
        // TODO remove item from respective array
        // const updatedItems = [...droppedItems];
        // updatedItems.splice(index, 1);
        // setDroppedItems(updatedItems);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="QueryBuilder">
                <div className="yellowLetters">
                    <h3>yellow letters</h3>
                    <DropZone onDrop={handleYellowDrop} />
                    { yellowLetters.map((item, index) => (
                        // todo this should probably  be a component.
                        //todo see if i can change name to value
                        <div key={index} className="YellowLetter">
                            { item }                         <button onClick={
                            () => handleRemoveItem(index)}>
                            Remove
                        </button>, 
                        </div>

                    )) }
                </div>
                <div className="availableAlphabet">
                    <h3>alphabet</h3>
                    { availableAlphabet.map((item, index) => (
                        <DragItem key={index} name={item} origin={ letterFields.availableAlphabet } />
                    )) }
                </div>
                <div style={{
                    border: '1px solid #ccc',
                    padding: '10px', borderRadius: '5px'
                }}>
                    <h2>Drag Items</h2>
                    <DragItem name="Item 1" />
                    <DragItem name="Item 2" />
                    <DragItem name="Item 3" />
                </div>
                <div style={{
                    border: '1px solid #ccc',
                    padding: '10px', borderRadius: '5px'
                }}>
                    <h2>Drop Zone</h2>
                    <DropZone onDrop={handleDrop} />
                    {droppedItems.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid #ccc',
                                padding: '10px',
                                borderRadius: '5px',
                                marginTop: '10px',
                                backgroundColor: 'lightblue',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <p>{item.name}</p>

                        </div>
                    ))}
                </div>
            </div>
        </DndProvider>
    );
}

const Solutions = () => {
    return ( 
        <div>Solutions here</div>
     );
} 
 
export default Home;