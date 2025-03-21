import { useEffect, useState } from "react";

export const GreenLetterInput = ({ props }: {props: any}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.getter[props.index] ?? '');

  useEffect(() => {
    if (!isEditing) {
      setText(props.getter[props.index] ?? '');
    }
  }, [props.getter, props.index, isEditing]);

  const handleInputChange = (e: React.ChangeEvent) => {
    setText((e.target as HTMLInputElement).value);
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
          maxLength={1}
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


export const YellowLetterInput = ({ props }: {props: any}) => {
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
            maxLength={1}
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

export const GrayLetterInput = ({ props }: {props: any}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.getter[props.index] ?? '');

  useEffect(() => {
    if (!isEditing) {
      setText(props.getter ?? '');
    }
  }, [props.getter, isEditing]);

  const handleInputChange = (e: React.ChangeEvent) => {
    setText((e.target as HTMLInputElement).value);
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
            maxLength={33}
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

export const LetterStack = ({ props }: {props: any}) => {
  return (
      <div className="LetterStack">
          <YellowLetterInput props={props}></YellowLetterInput>
          {
              (Array.isArray(props.arr) ? props.arr : []).map((value: string) => (
                  <YellowLetterDisplay key={value} props={{value: value, ...props}}></YellowLetterDisplay>
              ))
          }
      </div>
  );
}

export const YellowLetterDisplay = ({ props }: {props: any}) => {
  const handleDelete = () => {
    props.delete(props.index, props.value)
  };

  return (
    <div className="YellowLetter">
      <div className="YellowLetterDelete" onClick={handleDelete}><i className="bi bi-x-circle"></i></div>
      {props.value}
    </div>
  );
};
