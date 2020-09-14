import { FormEvent } from "react";

function handleFormSubmit(e: FormEvent<HTMLFormElement>): Object {
  e.preventDefault();

  const form = new FormData(e.currentTarget);

  let data = {};
  form.forEach((value, key) => {
    return (data = { ...data, [key]: value });
  });

  return data;
}

export { handleFormSubmit };
