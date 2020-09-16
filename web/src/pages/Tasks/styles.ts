import styled from "styled-components";
import { AddCircleOutline } from "@material-ui/icons";

export const Container = styled.div`
  min-height: 90vh;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 100vh;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #eee;
  border-radius: 7px 7px 0 0;
  border: 1px solid #999;

  width: 70%;

  padding: 1rem;
  margin-top: 4rem;

  > span {
    font-weight: 600;
    color: #222;
  }

  > div > a {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

export const TasksContainer = styled.div`
  margin-bottom: 4rem;

  border: 1px solid #999;
  border-radius: 0 0 7px 7px;

  width: 70%;
  overflow-x: auto;

  max-height: 70vh;
`;

export const NewTaskContainer = styled.form`
  display: flex;
  align-items: center;
  width: 70%;

  input {
    width: 100%;
    border-bottom: 1px solid #eee;

    padding: 1rem 0;
    font-size: 1.1rem;

    &:focus {
      border-color: var(--primary);
    }
  }

  > div {
    cursor: pointer;

    width: 2rem;
    height: 2rem;
    margin-left: 1rem;

    border-radius: 50%;
    background-color: #000;
  }
`;

export const AddIcon = styled(AddCircleOutline)`
  cursor: pointer;
  fill: #bbb !important;

  &:hover {
    fill: var(--primary) !important;
  }
`;
