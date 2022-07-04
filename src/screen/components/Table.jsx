import { Card, DataTable, Page, Button, Stack, Layout } from "@shopify/polaris";
import { useState, useEffect } from "react";

import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";

import Templates from "./Templates";

import styled from "styled-components";

const ActiveButton = styled.button`
  padding: 9px 20px;
  border: ${(props) =>
    props.active ? "1px solid #3EB372" : "0.5px solid black"};
  border-radius: 4px;
  background: white;
  color: ${(props) => (props.active ? "#3EB372" : "black")};
`;

export const Table = () => {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const [actived, setActive] = useState();

  const [templates, set_templates] = useState([]);
  const [openState, setOpenState] = useState(false);
  const [choosedTemplate, setChoosedTemplate] = useState("");

  async function getTemplate() {
    const count = await fetch(`/announcementBar`).then((res) => res.json());
    set_templates(count);
  }
  async function scriptRun() {
    await fetch("/script_tag").then((res) => res.status);
  }

  async function deleted(e) {
    var data = await fetch(`/delete/${e}`, {
      method: "Delete",
    }).then((res) => getTemplate());
  }

  async function activate(e) {
    if (choosedTemplate === e.uuid) {
      setChoosedTemplate("");
      setActive();
      await fetch("/updateAll").then((res) => res.status);
    } else {
      setChoosedTemplate(e.uuid);
      setActive(e.uuid);
      await fetch(`/update/${e.uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: true }),
      });
    }
  }

  const add = () => {
    if (openState === false) {
      setOpenState(true);
    } else {
      setOpenState(false);
    }
  };
  const close = () => {
    setOpenState(false);
  };

  useEffect(() => {
    getTemplate();
    scriptRun();
  }, []);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Stack distribution="trailing">
            {" "}
            <Button primary onClick={add}>
              {openState ? "Close" : "Add"}
            </Button>{" "}
          </Stack>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={["number", "text", "text", "text", "text"]}
              headings={["Item.No", "Name", "Content", "Preview", "Action"]}
              rows={templates.map((info, index) => {
                return [
                  index + 1,
                  info.name,
                  info.content,
                  <Stack>
                    <div
                      style={{
                        height: "30px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: info.background,
                        color: info.fontColor,
                        fontSize: info.fontSize,
                        fontFamily: info.fontFamily,
                        borderRadius: "4px",
                      }}
                    >
                      <h2 style={{ width: "100%", margin: "20px 50px" }}>
                        content
                      </h2>
                    </div>
                    ,
                  </Stack>,
                  <Stack>
                    <ActiveButton
                      active={info.uuid === actived}
                      onClick={() => activate(info)}
                    >
                      {info.uuid === actived ? "Actived " : "Paused"}
                    </ActiveButton>
                    {/* <Button>Edit</Button> */}
                    <Button onClick={() => deleted(info.uuid)}>Delete</Button>
                  </Stack>,
                ];
              })}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          {openState ? (
            <Templates getTemplate={getTemplate} closeTemplate={close} />
          ) : null}
        </Layout.Section>
      </Layout>
    </Page>
  );
};
