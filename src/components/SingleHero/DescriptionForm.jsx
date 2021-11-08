import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import classes from "./DescriptionForm.module.css";

const removeExtraWhitespace = (str) => {
  str = str.trim();
  let words = str.split(/\s+/);
  console.log(words);
  str = words.join(" ");
  console.log(str);
  return str;
};

// TODO:
const validateDescription = (text) => {
  // trim string and remove extra whitespace btw words, then check length
  text = removeExtraWhitespace(text);
  return text.length >= 10;
};
const validateName = (name) => {
  name = removeExtraWhitespace(name);
  return name.length > 0;
};

export default function DescriptionForm(props) {
  // check if description already exists - if so, pre-fill the form to edit it.
  let { id } = useParams();
  const userDescriptions = useSelector(
    (state) => state.userDescriptions.descriptions
  );
  const existingUserDesc = userDescriptions.find((d) => d.heroId === +id);
  console.log(existingUserDesc);

  const [name, setName] = useState(existingUserDesc?.desc.author || "");
  const [nameIsValid, setNameIsValid] = useState(null);
  const [description, setDescription] = useState(
    existingUserDesc?.desc.text || ""
  );
  const [descriptionIsValid, setDescriptionIsValid] = useState(null);
  // show invalid input fields after 1st click on submit
  const [showInvalid, setShowInvalid] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [descErrorMsg, setDescErrorMsg] = useState("");

  const handleInputChange = (e) => {
    console.log("e.target: ", e.target);
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  useEffect(() => {
    setNameIsValid(validateName(name));
    if (!nameIsValid) setNameErrorMsg("Name is required");
    else setNameErrorMsg("");
    setDescriptionIsValid(validateDescription(description));
    if (!descriptionIsValid) {
      setDescErrorMsg("Description must be at least 10 characters long.");
    } else {
      setDescErrorMsg("");
    }
  }, [name, nameIsValid, description, descriptionIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInvalid(true);
    if (!descriptionIsValid || !nameIsValid) return;
    props.onSubmit(
      removeExtraWhitespace(description),
      removeExtraWhitespace(name)
    );
  };
  const handleCancel = (e) => {
    e.preventDefault();
    props.onCancel();
  };

  return (
    <form className={classes.descForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        id="name"
        placeholder="Your name"
        autoComplete="off"
        className={showInvalid && !nameIsValid ? `${classes.invalid} ` : ""}
      />
      {showInvalid ? (
        <ErrorMsg>{nameErrorMsg}</ErrorMsg>
      ) : (
        <ErrorMsg> </ErrorMsg> /* for formatting */
      )}

      <textarea
        rows={4}
        name="description"
        value={description}
        onChange={handleInputChange}
        id="description"
        placeholder="Description"
        className={
          showInvalid && !descriptionIsValid ? `${classes.invalid} ` : ""
        }
      />
      {showInvalid ? (
        <ErrorMsg>{descErrorMsg}</ErrorMsg>
      ) : (
        <ErrorMsg> </ErrorMsg> /* for formatting */
      )}
      <div className={classes.btnContainer}>
        <Button variant="highlighted" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="highlighted">
          Submit
        </Button>
      </div>
    </form>
  );
}

const ErrorMsg = (props) => {
  return <div className={classes.errorMsg}>{props.children}</div>;
};
