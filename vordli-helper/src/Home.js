import { useEffect, useState } from 'react';
import { GreenLetterInput, GrayLetterInput, LetterStack } from './LetterInput';
import Modal from './Modal'
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
    return ( 
        <div>
            <QueryBuilder />
        </div>
     );
}
 
const QueryBuilder = () => {
    const yellowTest = {0: ["a", "b"], 2: ["c"], 3: ["d", "e", "f", "g"], 4: ["h"]}
    const [yellowLetters, setYellowLetters] = useState(yellowTest); // dict position: list of str
    const [grayLetters, setGrayLetters] = useState([]); // list of strings
    const [numLettersInSolution, setnumLettersInSolution] = useState(5);
    const [greenLetters, setGreenLetters] = useState({}); // dict position: str value
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

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

    const handleChange = (event) => {
        setnumLettersInSolution(event.target.value);
      };

    return (
        <div className="QueryBuilder">  
            <div className="NumLettersPicker">                
                <button className="MainButton" onClick={() => setIsSettingsModalOpen(true)}>
                    <i className="bi bi-gear-fill"></i>
                </button>
                <button className="MainButton" onClick={() => setIsHelpModalOpen(true)}>
                    <i className="bi bi-patch-question-fill"></i>
                </button>
                <Modal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)}>
                    <div>
                        <label htmlFor="numLettersInSolution">Number of Letters/Сколько Букв:</label>
                        <select id="numLettersInSolution" value={numLettersInSolution} onChange={handleChange}>
                            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
                            <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                    </div>
                </Modal>
                <Modal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)}>
                    <div>my help contents</div>
                    <button onClick={() => setIsHelpModalOpen(false)}>Close</button>
                </Modal>
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
                    <LetterStack key={index} props={{arr: yellowLetters[index], ...getLetterZoneProps(letterFields.YELLOW_LETTERS, index)}}></LetterStack>
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