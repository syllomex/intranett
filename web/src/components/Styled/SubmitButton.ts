import styled from "styled-components";

export const SubmitButton = styled.button.attrs((props) => ({
  type: props.type || "submit",
  className: props.className + " button submit" || "button submit",
}))`
  
`;
