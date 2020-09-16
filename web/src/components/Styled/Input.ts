import styled from "styled-components";

export const Input = styled.input.attrs((props) => ({
  id: props.name,
  type: props.type || "text",
  className: props.className || "form-style",
}))``;
