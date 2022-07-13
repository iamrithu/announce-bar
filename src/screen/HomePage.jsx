import { Page } from "@shopify/polaris";
import { Table } from "./components/Table.jsx";
import { useState } from "react";

import styled from "styled-components";
import { Icon } from "@shopify/polaris";

import { InfoMinor } from "@shopify/polaris-icons";

const Container = styled.div`
  width: 90%;
  height: 400px;
  z-index: 100;
  border-radius: 10px;
  position: absolute;
  top: 10%;
  left: 5%;
`;

export function HomePage() {
  const [showInstruction, setInstruction] = useState(false);

  const open = () => {
    if (showInstruction === false) {
      return setInstruction(true);
    }

    setInstruction(false);
  };
  return (
    <Page fullWidth>
      <div style={{ display: "flex" }}>
        <h2
          style={{ marginRight: "10px", fontSize: "17px", fontWeight: "bold" }}
        >
          Announcement Bar
        </h2>
        <div onClick={open} style={{ cursor: "pointer" }}>
          <Icon source={InfoMinor} color="base" />
        </div>
      </div>

      {showInstruction ? (
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            <h1>INSTUCTION</h1>
          </div>
          <div>
            <ol>
              <li>Add a Condition and select "Based on order price"</li>
              <li>Enter a minimum order price</li>
              <li>Once you complete it, click "Done"</li>
              <li>
                You can create a bar by clicking the "Create New Bar" button
                below
              </li>
            </ol>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                background: "white",
                color: "red",
                border: "1px solid red",
                padding: "10px",
                outline: "none",
                margin: "10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={open}
            >
              Close
            </button>
          </div>
        </Container>
      ) : (
        <Table />
      )}
    </Page>
  );
}
