import React, { useState } from "react";
import axios from "axios";

interface IForm {
  buttonstyle?: string;
  style?: string;
  type?: string;
  id?: string;
  name?: string;
  register?: any;
  placeholder?: string;
}

export default function CommentForm({
  style,
  type,
  id,
  name,
  buttonstyle,
  placeholder,
}: IForm) {
  const [comments, setComments] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      comments: comments,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/recipes/ai-recipes",
        payload
      );
      console.log("Data sent successfully:", response.data);
      setComments("");
    } catch (error) {
      console.error("There was an error sending the data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comments"></label>
      <textarea
        className={style}
        id={id}
        name={name}
        placeholder={placeholder}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <br />
      <button type="submit" className={buttonstyle}>
        Send
      </button>
    </form>
  );
}
