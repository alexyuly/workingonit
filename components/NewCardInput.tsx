import type { ChangeEventHandler, FormEventHandler, KeyboardEventHandler } from "react"

import { useState } from "react";

interface Props {
  onSubmitNewCard: (text: string) => unknown;
}

const NewCardInput = ({
  onSubmitNewCard,
}: Props) => {
  const [value, setValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmitNewCard(value);
    setValue("");
  };

  return (
    <form
      className="border border-sky-700 m-4 rounded shadow text-white"
      onSubmit={handleSubmit}
    >
      <input
        className="bg-sky-700 p-4 rounded w-full"
        onChange={handleChange}
        placeholder="What would you like to do?"
        type="text"
        value={value}
      />
    </form>
  )
}

export default NewCardInput
