import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';
import Modal from './Modal'
import OrderedDropZone from './OrderedDropZone';

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
    const [numLettersInSolution, setnumLettersInSolution] = useState(5);
    const [greenLetters, setGreenLetters] = useState({});

    const letterFields = {
        AVAILABLE_ALPHABET: "availableAlphabet",
        YELLOW_LETTERS: "yellowLetters",
        GRAY_LETTERS: "grayLetters",
        GREEN_LETTERS: "greenLetters",
    };

    const setGreenLetter = (index, value) => {
        setGreenLetters(prevItems => {
            prevItems[index] = value;
            return prevItems;
        })
    };

    const handleGreenDrop = (item, index) => {
        removeOriginLetter(item);
        setGreenLetter(index, item.value);
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
                        title: "gray",
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
                    title: "yellow",
                };
            case letterFields.GREEN_LETTERS:
                return {
                    innerClass: "GreenLetter",
                    numLettersInSolution: numLettersInSolution,
                    originPrefix: letterFields.GREEN_LETTERS,
                    onDrop: handleGreenDrop,
                    getter: greenLetters,
                };
        }

    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="QueryBuilder">  
                <div className="NumLettersPicker">
                    Characters in Solution: { numLettersInSolution }
                </div>
                <div className="MovedLetters">
                    <div>
                        <OrderedDropZone props={ getLetterZoneProps(letterFields.GREEN_LETTERS) } />
                        <DropZone props={ getLetterZoneProps(letterFields.YELLOW_LETTERS) } />
                        <DropZone props={ getLetterZoneProps(letterFields.GRAY_LETTERS) } />
                    </div>
                </div>
                <button onClick={SubmitQuery}>Go</button>
     
                <DropZone props={ getLetterZoneProps(letterFields.AVAILABLE_ALPHABET) } />
            </div>
        </DndProvider>
    );
}

const SubmitQuery = () => {
    fetch('https://852i63sqe6.execute-api.us-east-1.amazonaws.com/simpleDbFetch')
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error(error));
    console.log('hihi');
}

const Solutions = () => {
    return ( 
        <div>Solutions here</div>
     );
} 
 
export default Home;