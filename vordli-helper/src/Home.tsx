import 'bootstrap-icons/font/bootstrap-icons.css';
import { GreenLetterInput, GrayLetterInput, LetterStack } from './LetterInput';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import github_logo from './img/github_logo.png'
import Modal from './Modal'

const Home = () => {
    return ( 
        <div>
            <QueryBuilder />
        </div>
     );
}

const VideoPlayer: React.FC = () => {
    return (
      <video className="Video" controls>
        <source src="./tutorial-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };  
 
const QueryBuilder = () => {
    const [grayLetters, setGrayLetters] = useState("");
    const [greenLetters, setGreenLetters] = useState<{ [key: number]: string }>({});
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
    const [numLettersInSolution, setnumLettersInSolution] = useState(5);
    const [solutions, setSolutions] = useState<string | null>(null);
    const [yellowLetters, setYellowLetters] = useState<{ [key: number]: string[] }>({});
    const ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"

    const letterFields = {
        YELLOW_LETTERS: "yellowLetters",
        GRAY_LETTERS: "grayLetters",
        GREEN_LETTERS: "greenLetters",
    } as const;
    
    type LetterField = (typeof letterFields)[keyof typeof letterFields];
    
    interface LetterZoneProps {
        getter?: any;
        setter?: Function;
        innerClass?: string;
        index?: number;
        delete?: Function;
    }
    
    const getLetterZoneProps = (zone: LetterField, index?: number): LetterZoneProps => {
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
            index,
            };
        case letterFields.YELLOW_LETTERS:
            return {
            setter: setYellowLetter,
            delete: deleteYellowLetter,
            index,
            };
        default:
            return {};
        }
    };  

    const isValidLetter = (letter: string) => {
        return ALPHABET.includes(letter);
    };

    const setGreenLetter = (index: number, value: string) => {
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

    const setYellowLetter = (index: number, value: string) => {
        value = value.toUpperCase()
        if (value === "" || ! isValidLetter(value)) {
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

    const deleteYellowLetter = (index: number, value: string) => {
        setYellowLetters(prevItems => {
            if (!Array.isArray(prevItems[index])) {
                return prevItems;
            }
            const newItems = {...prevItems};
            const newStackItems = [...newItems[index]];
            const i = newStackItems.indexOf(value);
            if (i !== -1) {
                newStackItems.splice(i, 1);
            }
            newItems[index] = newStackItems;
            return newItems;
        });
        
    };

    const updateGrayLetters = (values: string) => {
        const newItems = [
            ...new Set((values ?? "").split('').map(value => value.toUpperCase()))
        ].filter(value => ALPHABET.includes(value)).join("");
        setGrayLetters(newItems);
    };

    const handleChangeNumLetters = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setnumLettersInSolution(Number(event.target.value));
    };

    useEffect(() => {
        // rerender LetterInputs when numLettersInSolution updates
        setGreenLetters(Object.fromEntries([...Array(numLettersInSolution).keys()].map(i => [i, ""])));
        setYellowLetters(Object.fromEntries([...Array(numLettersInSolution).keys()].map(i => [i, []])));
    }, [numLettersInSolution]);
    
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                    throw new Error(String(response.status));
                }
                return response.json();
            })
            .then((json) => {
                let s = JSON.stringify(json)
                if (s === "[]") {
                    setSolutions(null);
                } else {
                    setSolutions(s);
                }
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
                    <VideoPlayer></VideoPlayer>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Link to='https://github.com/rorour/VordliHelper/'>
                            <img style={{height:"30px"}} src={github_logo} alt="GitHub" />
                        </Link>
                    </div>
                </Modal>
                <Modal isOpen={isSolutionModalOpen} onClose={() => setIsSolutionModalOpen(false)}>
                    <div className="SolutionScrollbox">
                    {solutions && solutions !== "null" && solutions !== "" && (
                    <table>
                        <tbody>
                            {JSON.parse(solutions).map((solution: Record<string, any>, index: number) => (
                                <tr key={index}>
                                    <td><b>{solution.word}</b></td>
                                    <td>{solution.translation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                    {(solutions === "") && 
                    (<div>Loading...</div>)
                    }
                    {solutions === null && (<div>No matching words found. <br></br>Соответствующих слов не найдено.</div>)}

                    </div>
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
                        props={{ arr: yellowLetters[Number(index)], ...getLetterZoneProps(letterFields.YELLOW_LETTERS, Number(index)) }}
                    />
                ))}
            </div>
            <div className="GrayLetters">
                <GrayLetterInput props={getLetterZoneProps(letterFields.GRAY_LETTERS)}></GrayLetterInput>
            </div>
            <button className="SearchButton" onClick={handleSubmit}>SUBMIT</button> 
        </div>
    );
}

export default Home;