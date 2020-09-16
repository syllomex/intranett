import styled from "styled-components";

export const CancelButton = styled.button.attrs((props) => ({
  type: props.type || "button",
  className: props.className + " button cancel" || "button cancel",
}))``;
