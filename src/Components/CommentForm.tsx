import React, { useState } from "react";

interface IForm {
  buttonstyle?: string;
  style?: string;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  onSubmit: (feedback: string) => void;
}

export default function CommentForm({
  style,
  id,
  name,
  buttonstyle,
  placeholder,
  onSubmit,
}: IForm) {
  const [comments, setComments] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(comments);
    }

    setComments("");
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
