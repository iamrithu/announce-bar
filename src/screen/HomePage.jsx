import { Page } from "@shopify/polaris";
import { Table } from "./components/Table.jsx";

export function HomePage() {
  return (
    <Page fullWidth>
      <div style={{ display: "flex" }}>
        <h2>Announcement</h2>
        <button>click</button>
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "200px",
          background: "grey",
          zIndex: "100",
        }}
      >
        hello
      </div>
      <Table />
    </Page>
  );
}
