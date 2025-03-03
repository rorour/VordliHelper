import { useState } from "react";

export const GreenLetterInput = ({props}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.getter[props.index] ?? '');

  return (
    <div className={"LetterInput " + props.innerClass}>
        {isEditing ? (
            <input
            type="text"
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
                setIsEditing(false);
                props.setter(props.index, text);
            }}
            className="EditingGreenLetter"
            maxLength="1"
            />
        ) : (
            <div
            onClick={() => setIsEditing(true)}
            className="NotEditingGreenLetter"
            >
            {text}
            </div>
        )}
    </div>
  );
};

export const GrayLetterInput = ({props}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.getter[props.index] ?? '');

  return (
    <div className={"LetterInput " + props.innerClass}>
        {isEditing ? (
            <input
            type="text"
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
                setIsEditing(false);
                props.setter(text);
            }}
            className="EditingGrayLetters"
            maxLength="33"
            />
        ) : (
            <div
            onClick={() => setIsEditing(true)}
            className="NotEditingGrayLetters"
            >
            {text}
            </div>
        )}
    </div>
  );
};

export const YellowLetterDisplay = ({props}) => {
  return (
    <div className="YellowLetter">{props.value}</div>
  );
};
