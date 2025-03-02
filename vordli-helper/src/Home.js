import { useEffect, useState } from 'react';
import Modal from './Modal'
import EditableInput from './EditableInput';

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
    const [yellowLetters, setYellowLetters] = useState([]); // dict position: list of str
    const [grayLetters, setGrayLetters] = useState([]); // list of strings
    const [numLettersInSolution, setnumLettersInSolution] = useState(5);
    const [greenLetters, setGreenLetters] = useState({}); // dict position: str value

    useEffect(() => {
        console.log(greenLetters);
    }, [greenLetters]);

    const letterFields = {
        AVAILABLE_ALPHABET: "availableAlphabet",
        YELLOW_LETTERS: "yellowLetters",
        GRAY_LETTERS: "grayLetters",
        GREEN_LETTERS: "greenLetters",
    };

    const getLetterZoneProps = (zone, index) => {
        switch (zone) {
            case letterFields.AVAILABLE_ALPHABET:
                return {
                    allowDelete: false,
                    getter: availableAlphabet,
                    innerClass: "AlphabetLetter",
                    origin: letterFields.AVAILABLE_ALPHABET,
                    outerClass: "AvailableAlphabet",
                    setter: setAvailableAlphabet,
                    title: false,
                };
                case letterFields.GRAY_LETTERS:
                    return {
                        allowDelete: true,
                        getter: grayLetters,
                        innerClass: "GrayLetter",
                        origin: letterFields.GRAY_LETTERS,
                        outerClass: "GrayLetters",
                        setter: setGrayLetters,
                        title: "gray",
                    };
            case letterFields.YELLOW_LETTERS:
                return {
                    allowDelete: true,
                    getter: yellowLetters,
                    innerClass: "YellowLetter",
                    origin: letterFields.YELLOW_LETTERS,
                    outerClass: "YellowLetters",
                    setter: setYellowLetters,
                    title: "yellow",
                };
            case letterFields.GREEN_LETTERS:
                return {
                    innerClass: "GreenLetter",
                    // numLettersInSolution: numLettersInSolution,
                    // originPrefix: letterFields.GREEN_LETTERS,
                    getter: greenLetters,
                    setter: setGreenLetter,
                    index: index,
                };
        }

    };

    const setGreenLetter = (index, value) => {
        console.log('called')
        setGreenLetters(prevItems => {
            const newItems = {...prevItems};
            newItems[index] = value;
            return newItems;
        });
    };

    const myProps = (index) => {
        return {
            myattr: "somevalue",
            index: index,
        }
    }

    return (
        <div className="QueryBuilder">  
            <div className="NumLettersPicker">
                Characters in Solution: { numLettersInSolution }
            </div>
            <div className="GreenLetters">
                green letters
                {Array(numLettersInSolution).fill(null).map((_, index) => (
                    <EditableInput 
                        key={index} 
                        props={getLetterZoneProps(letterFields.GREEN_LETTERS, index)}
                    ></EditableInput>
                ))}
            </div>
            <div className="YellowLetters">
                {/* <EditableInput props={myProps}></EditableInput> */}
                yellow letters
            </div>
            <div className="GrayLetters">
                gray letters
            </div>
            <button onClick={SubmitQuery}>Go</button>
        </div>
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