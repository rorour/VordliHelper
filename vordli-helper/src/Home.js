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
    const fullAlphabet = ["a", "b", "c", "d", "e"]
    const [availableAlphabet, setAvailableAlphabet] = useState(fullAlphabet);
    const [yellowLetters, setYellowLetters] = useState([]);
    const [grayLetters, setGrayLetters] = useState([]);

    const letterFields = {
        AVAILABLE_ALPHABET: "availableAlphabet",
        YELLOW_LETTERS: "yellowLetters",
        GRAY_LETTERS: "grayLetters",
    };

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
                    allowDelete: false,
                    getter: availableAlphabet,
                    handleRemoveItem: handleRemoveItem,
                    innerClass: "AlphabetLetter",
                    onDrop: (item) => handleDrop(item, setAvailableAlphabet),
                    origin: letterFields.AVAILABLE_ALPHABET,
                    outerClass: "AvailableAlphabet",
                    setter: setAvailableAlphabet,
                    title: false,
                };
                case letterFields.GRAY_LETTERS:
                    return {
                        allowDelete: true,
                        getter: grayLetters,
                        handleRemoveItem: handleRemoveItem,
                        innerClass: "GrayLetter",
                        onDrop: (item) => handleDrop(item, setGrayLetters),
                        origin: letterFields.GRAY_LETTERS,
                        outerClass: "GrayLetters",
                        setter: setGrayLetters,
                        title: "gray letters abc",
                    };
            case letterFields.YELLOW_LETTERS:
                return {
                    allowDelete: true,
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
                <div className="MovedLetters">
                    <div>
                        green letters here
                    </div>
                    <div>
                        <DropZone props={ getLetterZoneProps(letterFields.YELLOW_LETTERS) } />
                        <DropZone props={ getLetterZoneProps(letterFields.GRAY_LETTERS) } />
                    </div>
                </div>      
     
                <DropZone props={ getLetterZoneProps(letterFields.AVAILABLE_ALPHABET) } />
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