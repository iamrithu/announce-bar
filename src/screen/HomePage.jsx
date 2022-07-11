import { Page } from "@shopify/polaris";
import { Table } from "./components/Table.jsx";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 400px;
  z-index: 100;
  border-radius: 10px;
`;

export function HomePage() {
  return (
    <Page fullWidth>
      <div style={{ display: "flex" }}>
        <h2>Announcement</h2>
        <button>click</button>
      </div>
      <Container>hello</Container>
      <Table />
    </Page>
  );
}
