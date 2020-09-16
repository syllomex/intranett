import styled from "styled-components";

export const BorderlessInput = styled.input.attrs((props) => ({
  id: props.name,
  type: props.type || "text",
  className: props.className + " form-style border-bottom-only" || "form-style border-bottom-only",
}))``;
