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
    const letterFields = {
        AVAILABLE_ALPHABET: "availableAlphabet",
        YELLOW_LETTERS: "yellowLetters",
        GRAY_LETTERS: "grayLetters",
    };
    const fullAlphabet = ["a", "b", "c", "d", "e"]
    const [availableAlphabet, setAvailableAlphabet] = useState(fullAlphabet);
    const [yellowLetters, setYellowLetters] = useState([]);
    const [grayLetters, setGrayLetters] = useState([]);

    const removeOriginLetter = (item) => {
        getLetterZoneProps(item.origin).setter(prevItems => {
            let updatedItems = [...prevItems]
            updatedItems.splice(updatedItems.indexOf(item.value), 1);
            return updatedItems;
        });
    };

    const handleDrop = (item, setter) => {
        removeOriginLetter(item);
        setter((prevItems) => [...prevItems, item.value]);
    };

    const handleRemoveItem = (value, setter) => {
        setter(prevItems => {
            let updatedItems = [...prevItems]
            updatedItems.splice(updatedItems.indexOf(value), 1);
            return updatedItems;
        });
    };

    const getLetterZoneProps = (origin) => {
        switch (origin) {
            case letterFields.AVAILABLE_ALPHABET:
                return {
                    getter: availableAlphabet,
                    handleRemoveItem: handleRemoveItem,
                    innerClass: "AlphabetLetter",
                    onDrop: (item) => handleDrop(item, setAvailableAlphabet),
                    origin: letterFields.AVAILABLE_ALPHABET,
                    outerClass: "AvailableAlphabet",
                    setter: setAvailableAlphabet,
                    title: "avail letters abc",
                };
            case letterFields.YELLOW_LETTERS:
                return {
                    getter: yellowLetters,
                    handleRemoveItem: handleRemoveItem,
                    innerClass: "YellowLetter",
                    onDrop: (item) => handleDrop(item, setYellowLetters),
                    origin: letterFields.YELLOW_LETTERS,
                    outerClass: "YellowLetters",
                    setter: setYellowLetters,
                    title: "yellow letters abc",
                };
        }

    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="QueryBuilder">                    
                <DropZone props={ getLetterZoneProps(letterFields.YELLOW_LETTERS) } />
                <DropZone props={ getLetterZoneProps(letterFields.AVAILABLE_ALPHABET) } />
                {/* <div style={{
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
                    ))} */}
                {/* </div> */}
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