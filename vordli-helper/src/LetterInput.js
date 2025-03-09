import { useEffect, useState } from "react";

export const GreenLetterInput = ({ props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.getter[props.index] ?? '');

  useEffect(() => {
    if (!isEditing) {
      setText(props.getter[props.index] ?? '');
    }
  }, [props.getter, props.index, isEditing]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    props.setter(props.index, text);
  };

  return (
    <div className={"LetterInput " + props.innerClass}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          autoFocus
          onChange={handleInputChange}
          onBlur={handleBlur}
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


export const YellowLetterInput = ({props}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  
  return (
    <div className="YellowLetterInput">
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
            className="EditingYellowLetter"
            maxLength="1"
            />
        ) : (
            <div
            onClick={() => {
              setIsEditing(true);
              setText("");
            }}
            className="NotEditingYellowLetter"
            >
            +
            </div>
        )}
    </div>
  );
};

export const GrayLetterInput = ({props}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.getter[props.index] ?? '');

  useEffect(() => {
    console.log("called use effect");
    if (!isEditing) {
      console.log("setting text");
      setText(props.getter ?? '');
    }
  }, [props.getter, isEditing]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    props.setter(text);
  };

  return (
    <div className={"LetterInput " + props.innerClass}>
        {isEditing ? (
            <input
            type="text"
            value={text}
            autoFocus
            onChange={handleInputChange}
            onBlur={handleBlur}
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

export const LetterStack = ({props}) => {
  return (
      <div className="LetterStack">
          <YellowLetterInput props={props}></YellowLetterInput>
          {
              (Array.isArray(props.arr) ? props.arr : []).map((value) => (
                  <YellowLetterDisplay key={value} props={{value: value}}></YellowLetterDisplay>
              ))
          }
      </div>
  );
}

export const YellowLetterDisplay = ({props}) => {
  return (
    <div className="YellowLetter">{props.value}</div>
  );
};
