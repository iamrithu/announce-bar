import { Card, DataTable, Page, Button, Stack, Layout } from "@shopify/polaris";
import { useState, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";
import Templates from "./Templates";
import Edit from "./Edit";
import styled from "styled-components";

const ActiveButton = styled.button`
  padding: 7px 20px;
  border: 0px;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  background: #ffffff;
  border: ${(props) =>
    props.active ? "1px solid #3EB372" : "1px solid #FA931C"};
  border: ${(props) => (props.delete ? "1px solid red" : " ")};
  color: ${(props) => (props.active ? " #3EB372" : "#FA931C")};
  color: ${(props) => (props.delete ? "red" : "")};
  &:hover {
    background: #efefef;
  }
`;

export const Table = () => {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [actived, setActive] = useState();
  const [templates, set_templates] = useState([]);
  const [openState, setOpenState] = useState(false);
  const [choosedTemplate, setChoosedTemplate] = useState("");
  const [editOption, setEdit] = useState(false);
  const [editData, setEditData] = useState();

  async function getTemplate() {
    const count = await fetch(`/announcementBar`).then((res) => res.json());
    count.map((e) => {
      if (e.isActive === "true") {
        setActive(e.uuid);
      }
    });
    set_templates(count);
  }

  async function deleted(e) {
    var data = await fetch(`/delete/${e}`, {
      method: "Delete",
    });
    getTemplate();
  }

  async function activate(e) {
    if (choosedTemplate === e.uuid) {
      setChoosedTemplate("");
      setActive();
      await fetch(`/updateAll`).then((res) => res.status);
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
  const edit = (info) => {
    setEdit(true);
    setEditData(info.uuid);
  };
  const close = () => {
    setOpenState(false);
    setEdit(false);
  };

  useEffect(async () => {
    getTemplate();
    await fetch(`/customers`).then((res) => res.json());
    await fetch(`/orders`).then((res) => res.json());
  }, []);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Stack distribution="trailing">
            {" "}
            <Button primary onClick={add}>
              {openState ? "Close" : "Create New Bar"}
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
                  info.content + " " + info.currencyContent,
                  <Stack>
                    <div
                      style={{
                        //
                        padding: "3px 40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: info.background,
                        color: info.fontColor,
                        fontSize: "14px",
                        borderRadius: "4px",
                      }}
                    >
                      content
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
                    <ActiveButton delete onClick={() => edit(info)}>
                      Edit
                    </ActiveButton>
                    <ActiveButton delete onClick={() => deleted(info.uuid)}>
                      Delete
                    </ActiveButton>
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
          {editOption ? (
            <Edit
              getTemplate={getTemplate}
              closeTemplate={close}
              value={editData}
            />
          ) : null}
        </Layout.Section>
      </Layout>
    </Page>
  );
};
