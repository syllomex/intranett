import styled from "styled-components";

export const Textarea = styled.textarea.attrs((props) => ({
  className: props.className || "form-style border-bottom-only",
  id: props.name,
}))``;
