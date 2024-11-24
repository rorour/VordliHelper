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
        let getter = null;
        let setter = null;
        switch (item.origin) {
            case letterFields.AVAILABLE_ALPHABET:
                getter = availableAlphabet;
                setter = setAvailableAlphabet;
        }
        setter(prevItems => {
            let updatedItems = [...prevItems]
            console.log('index of', item.name, updatedItems.indexOf(item.name));
            updatedItems.splice(updatedItems.indexOf(item.name), 1);
            return updatedItems;
        });
    };

    const handleAlphabetDrop = (item) => {
        setAvailableAlphabet((prevItems) => [...prevItems, item]);
    };

    const handleYellowDrop = (item) => {
        console.log("111", item);
        removeOriginLetter(item);
        setYellowLetters((prevItems) => [...prevItems, item.name]);
    };

    const handleGrayDrop = (item) => {
        setGrayLetters((prevItems) => [...prevItems, item]);
    };

    const handleRemoveItem = (index, setter) => {
        setter(prevItems => {
            let updatedItems = [...prevItems]
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    useEffect(() => {
        console.log("updated availableAlphabet", availableAlphabet)


    }, [availableAlphabet])

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="QueryBuilder">
                <div className="yellowLetters">
                    <h3>yellow letters</h3>
                    <DropZone onDrop={handleYellowDrop} />
                    { yellowLetters.map((value, index) => (
                        // todo this should probably  be a component.
                        <div key={index} className="YellowLetter">
                            { value }                         
                            <button onClick={() => 
                                handleRemoveItem(value, setYellowLetters)}
                            >
                            Remove
                        </button>, 
                        </div>

                    )) }
                </div>
                <div className="availableAlphabet">
                    <h3>alphabet</h3>
                    { availableAlphabet.map((item, index) => {
                        console.log("setting alphabet", item, index);
                        return (
                        <DragItem name={item} key={item} mykey={index} origin={ letterFields.AVAILABLE_ALPHABET } />
                    )}) }
                </div>
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