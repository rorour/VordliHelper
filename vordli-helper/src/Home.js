import 'bootstrap-icons/font/bootstrap-icons.css';
import { GreenLetterInput, GrayLetterInput, LetterStack } from './LetterInput';
import { useEffect, useState } from 'react';
import Modal from './Modal'

const Home = () => {
    return ( 
        <div>
            <QueryBuilder />
        </div>
     );
}
 
const QueryBuilder = () => {
    const ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
    const [grayLetters, setGrayLetters] = useState("");
    const [greenLetters, setGreenLetters] = useState({}); // dict position: str value
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [numLettersInSolution, setnumLettersInSolution] = useState(5);
    const [yellowLetters, setYellowLetters] = useState({}); // dict position: list of str
    const [solutions, setSolutions] = useState("");

    const letterFields = {
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
            default:
                return {};
        }
    };

    const isValidLetter = (letter) => {
        return ALPHABET.includes(letter);
    };

    const setGreenLetter = (index, value) => {
        value = value.toUpperCase()
        if (! isValidLetter(value)) {
            return;
        }
        setGreenLetters(prevItems => {
            const newItems = {...prevItems};
            newItems[index] = value;
            return newItems;
        });
    };

    const setYellowLetter = (index, value) => {
        value = value.toUpperCase()
        if (! isValidLetter(value)) {
            return;
        }
        setYellowLetters(prevItems => {
            if (prevItems[index] && prevItems[index].includes(value)) {
                return prevItems;
            }
            const newItems = {...prevItems};
            newItems[index] = [...(newItems[index] ?? []), value];
            return newItems;
        });
    };

    const updateGrayLetters = (values) => {
        const newItems = [
            ...new Set((values ?? "").split('').map(value => value.toUpperCase()))
        ].filter(value => ALPHABET.includes(value)).join("");
        setGrayLetters(newItems);
    };

    const handleChangeNumLetters = (event) => {
        setnumLettersInSolution(Number(event.target.value));
    };

    useEffect(() => {
        // rerender LetterInputs when numLettersInSolution updates
        setGreenLetters(Object.fromEntries([...Array(numLettersInSolution).keys()].map(i => [i, ""])));
        setYellowLetters(Object.fromEntries([...Array(numLettersInSolution).keys()].map(i => [i, []])));
    }, [numLettersInSolution]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const grayNotEmpty = grayLetters.trim() !== "";
        const greenNotEmpty = Object.values(greenLetters).some(str => str.trim() !== "");
        const yellowNotEmpty = Object.values(yellowLetters).some(list => Array.isArray(list) && list.length > 0);
        if (grayNotEmpty || greenNotEmpty || yellowNotEmpty) {
            submitQuery();
            setSolutions("");
            setIsSolutionModalOpen(true);
        };
    };

    const submitQuery = () => {
        try {
            const payload = {
                greenLetters: greenLetters,
                grayLetters: grayLetters,
                yellowLetters: yellowLetters,
                numLettersInSolution: numLettersInSolution
            };
            fetch('https://dfvly776la.execute-api.us-east-1.amazonaws.com/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then((json) => {
                console.log("Response from Lambda:", json)
                setSolutions(JSON.stringify(json));
            })
            .catch(error => console.error("Error:", error));
    
        } catch (error) {
            console.error("Serialization error:", error);
        }
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
                        <select id="numLettersInSolution" value={numLettersInSolution} onChange={handleChangeNumLetters}>
                            {[3, 4, 5, 6, 7, 8, 9, 10, 11].map((v) => (
                            <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                    </div>
                </Modal>
                <Modal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)}>
                    <div>my help contents</div>
                    <button onClick={() => setIsHelpModalOpen(false)}>Close</button>
                </Modal>
                <Modal isOpen={isSolutionModalOpen} onClose={() => setIsSolutionModalOpen(false)}>
                    <div className="SolutionScrollbox">
                    {solutions && solutions !== "" ? (
                    <table>
                        <tbody>
                            {JSON.parse(solutions).map((solution, index) => (
                                <tr key={index}>
                                    <td><b>{solution.word}</b></td>
                                    <td>{solution.translation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ) : (
                        <p>...</p>
                    )}
                    </div>
                    <button onClick={() => setIsSolutionModalOpen(false)}>Close</button>
                </Modal>
            </div>
            <div className="GreenLetters">
                {Object.keys(greenLetters).map((index) => (
                    <GreenLetterInput 
                        key={index} 
                        props={getLetterZoneProps(letterFields.GREEN_LETTERS, Number(index))}
                    />
                ))}
            </div>
            <div className="YellowLetters">
                {Object.keys(yellowLetters).map((index) => (
                    <LetterStack 
                        key={index} 
                        props={{ arr: yellowLetters[index], ...getLetterZoneProps(letterFields.YELLOW_LETTERS, Number(index)) }}
                    />
                ))}
            </div>
            <div className="GrayLetters">
                <GrayLetterInput props={getLetterZoneProps(letterFields.GRAY_LETTERS)}></GrayLetterInput>
            </div>
            <button onClick={handleSubmit}>Search</button> 
        </div>
    );
}

export default Home;