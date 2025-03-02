import { useState } from "react";

const EditableInput = ({props}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.getter[props.index] ?? '');

  return (
    <div className={"EditableInput " + props.innerClass}>
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

export default EditableInput;
