import { useEffect, useState } from 'react';
import Modal from './Modal'
import { GreenLetterInput, GrayLetterInput, LetterStack } from './LetterInput';

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
    const yellowTest = {0: ["a", "b"], 2: ["c"], 3: ["d", "e", "f", "g"], 4: ["h"]}
    const [yellowLetters, setYellowLetters] = useState(yellowTest); // dict position: list of str
    const [grayLetters, setGrayLetters] = useState([]); // list of strings
    const [numLettersInSolution, setnumLettersInSolution] = useState(5);
    const [greenLetters, setGreenLetters] = useState({}); // dict position: str value

    useEffect(() => {
        console.log(grayLetters);
    }, [grayLetters]);

    const letterFields = {
        AVAILABLE_ALPHABET: "availableAlphabet",
        YELLOW_LETTERS: "yellowLetters",
        GRAY_LETTERS: "grayLetters",
        GREEN_LETTERS: "greenLetters",
    };

    const getLetterZoneProps = (zone, index) => {
        switch (zone) {
            case letterFields.GRAY_LETTERS:
                return {
                    getter: grayLetters,
                    setter: updateGrayLetters,
                };
            case letterFields.GREEN_LETTERS:
                return {
                    innerClass: "GreenLetter",
                    getter: greenLetters,
                    setter: setGreenLetter,
                    index: index,
                };
            case letterFields.YELLOW_LETTERS:
                return {
                    setter: setYellowLetter,
                    index: index,
                    // allowDelete: true,
                    // getter: yellowLetters,
                    // innerClass: "YellowLetter",
                    // origin: letterFields.YELLOW_LETTERS,
                    // outerClass: "YellowLetters",
                    // setter: setYellowLetters,
                    // title: "yellow",
                };

        }
    };

    const setGreenLetter = (index, value) => {
        setGreenLetters(prevItems => {
            const newItems = {...prevItems};
            newItems[index] = value;
            return newItems;
        });
    };

    const setYellowLetter = (index, value) => {
        setYellowLetters(prevItems => {
            const newItems = {...prevItems};
            newItems[index] = [...(newItems[index] ?? []), value];
            return newItems;
        });
    };

    const updateGrayLetters = (values) => {
        setGrayLetters([...values]);
    };

    return (
        <div className="QueryBuilder">  
            <div className="NumLettersPicker">
                Characters in Solution: { numLettersInSolution }
            </div>
            <div className="GreenLetters">
                {Array(numLettersInSolution).fill(null).map((_, index) => (
                    <GreenLetterInput 
                        key={index} 
                        props={getLetterZoneProps(letterFields.GREEN_LETTERS, index)}
                    ></GreenLetterInput>
                ))}
            </div>
            <div className="YellowLetters">
                {Array(numLettersInSolution).fill(null).map((_, index) => (
                    <LetterStack props={{arr: yellowLetters[index], ...getLetterZoneProps(letterFields.YELLOW_LETTERS, index)}}></LetterStack>
                ))
                }
            </div>
            <div className="GrayLetters">
                <GrayLetterInput props={getLetterZoneProps(letterFields.GRAY_LETTERS)}></GrayLetterInput>
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