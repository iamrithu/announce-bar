import { Page } from "@shopify/polaris";
import { Table } from "./components/Table.jsx";
import { useState } from "react";

import styled from "styled-components";

const [showInstruction, setInstruction] = useState(false);

const Container = styled.div`
  width: 90%;
  height: 400px;
  z-index: 100;
  border-radius: 10px;
  display:  ${(props) => (props.active ? "block" : "none")};,
  position: absolute;
  top: 10%;
  left: 5%;
`;

const open = () => {
  if (showInstruction === false) {
    return setInstruction(true);
  }

  setInstruction(false);
};

export function HomePage() {
  return (
    <Page fullWidth>
      <div style={{ display: "flex" }}>
        <h2>Announcement</h2>
        <button onClick={open}>click</button>
      </div>
      <Container active={showInstruction}>
        <div>
          <h2>Instruction</h2>
        </div>
        <div>
          <ol>
            <li>Add a Condition and select "Based on order price"</li>
            <li>Enter a minimum order price</li>
            <li>Once you complete it, click "Done"</li>
            <li>
              You can create a bar by clicking the "Create New Bar" button below
            </li>
          </ol>
        </div>
      </Container>
      <Table />
    </Page>
  );
}
