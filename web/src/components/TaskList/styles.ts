import styled from "styled-components";
import { CheckCircle, CancelRounded } from "@material-ui/icons";

export const TaskTable = styled.table`
  border: 0;
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    margin: 0;
    padding: 0.6rem 4rem;
    text-align: center;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 6px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 6px;
  }
`;

export const TaskTableHead = styled.thead`
  tr {
    background-color: #999;

    th {
      color: #fefefe;
      font-weight: 400;
    }
  }
`;

export const TaskTableDivision = styled.tr`
  background-color: #999 !important;
  cursor: default !important;

  td {
    color: #fefefe !important;
    font-weight: 400 !important;
  }
`;

export const TaskTableBody = styled.tbody`
  tr > td:first-child {
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #ddd;
  }

  tr {
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const CheckCircleIcon = styled(CheckCircle)`
  fill: var(--primary) !important;
`;

export const CancelIcon = styled(CancelRounded)`
  margin-right: 0.6rem;
  fill: var(--danger) !important;
`;
