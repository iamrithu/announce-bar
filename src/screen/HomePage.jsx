import { Page, Image } from "@shopify/polaris";
import { Table } from "./components/Table.jsx";
import { useState } from "react";

import styled from "styled-components";
import { Icon } from "@shopify/polaris";

import { InfoMinor } from "@shopify/polaris-icons";

import home from "../assets/home.jpg";
import active from "../assets/active.jpg";
import actived from "../assets/actived.jpg";
import create from "../assets/create.jpg";
import template from "../assets/template.jpg";
import store from "../assets/store.jpg";

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
              justifyContent: "flex-start",
              alignItems: "center",
              fontSize: "14px",
              fontWeight: "bolder",
              textDecoration: "underline",
            }}
          >
            <h1>
              INSTUCTION
              <a href="https://www.loom.com/share/b3f99a0f77ee4a278e4901c78b2cf4c7">
                Video Tutorial
              </a>
            </h1>
          </div>
          <div>
            <ol>
              <li>
                You can create a new bar by clicking the "Create New Bar".
                <br />
                <br />
                <Image
                  source={home}
                  alt="Nice work on building a Shopify app"
                  width={600}
                />
                <br />
                <br />
              </li>
              <li>
                Choose a template from basic templates.
                <br />
                <br />
                <Image
                  source={template}
                  alt="Nice work on building a Shopify app"
                  width={600}
                />
                <br />
                <br />
              </li>

              <li>Add 'Content' and 'Design' configuration details.</li>
              <li>
                Once you complete it, click "Create Template" for creating new
                template or click "Cancel" for abort the function.
                <br />
                <br />
                <Image
                  source={create}
                  alt="Nice work on building a Shopify app"
                  width={600}
                />
                <br />
                <br />
              </li>

              <li>
                If a new template is created , it will be on pause state.So
                click "Paused" button to activate the template or click
                "Actived" button to paused the template.
                <br />
                <br />
                <Image
                  source={active}
                  alt="Nice work on building a Shopify app"
                  width={600}
                />
                <br />
                <br />
                <p>after</p>
                <br />
                <br />
                <Image
                  source={actived}
                  alt="Nice work on building a Shopify app"
                  width={600}
                />
                <br />
                <br />
              </li>
            </ol>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "bolder",
                textDecoration: "underline",
              }}
            >
              <h3>Don't see the bar ?</h3>
            </div>
            <ol>
              <li>
                Refresh the website, the bar should display properly.
                <br />
                <br />
                <Image
                  source={store}
                  alt="Nice work on building a Shopify app"
                  width={600}
                />
                <br />
                <br />
              </li>
              <li>
                If it still does not work, kindly contact us at demo@gmail.com.
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
