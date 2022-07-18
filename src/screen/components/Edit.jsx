import {
  Card,
  Button,
  Stack,
  Layout,
  TextField,
  Select,
} from "@shopify/polaris";

import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";

import { useState, useCallback } from "react";

const Edit = ({ getTemplate, closeTemplate, value }) => {
  console.log(value);
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const options = [
    { label: "Fixed", value: "fixed" },
    { label: "Scrollable ", value: "absolute" },
  ];
  const closeButton = [
    { label: "NO", value: "NO" },
    { label: "YES", value: "YES" },
  ];
  const CurrencyPosition = [
    { label: "Place symbol before the amount", value: "before" },
    { label: "Place symbol after the amount", value: "after" },
  ];
  const Currency = [
    { label: "India Rupees", value: "INR" },
    { label: "United State Dollars", value: "$" },
    { label: "United Kingdom", value: "£" },
    { label: "Euro", value: "€" },
    { label: "Canada", value: "$" },
  ];
  const fontOPT = [
    {
      label: "Helvetica",
      value: "Helvetica",
    },
    {
      label: "Assistant",
      value: "Assistant",
    },
    {
      label: "Avenir Next",
      value: "Avenir Next",
    },
    {
      label: "Oswald",
      value: "Oswald",
    },
    {
      label: "Anonymous Pro",
      value: "Anonymous Pro",
    },
    {
      label: "Archivo",
      value: "Archivo",
    },
    {
      label: "Questrial",
      value: "Questrial",
    },
    {
      label: "Americana",
      value: "Americana",
    },
    {
      label: "Quattrocento Sans",
      value: "Quattrocento Sans",
    },
    {
      label: "Futura",
      value: "Futura",
    },
    {
      label: "Electra",
      value: "Electra",
    },
  ];

  const [name, set_name] = useState();
  const [close_button, setCloseButton] = useState("NO");
  const [content, set_content] = useState("");
  const [background_color, set_background_color] = useState("");
  const [font_color, set_font_color] = useState("");
  const [special_font_color, set_special_font_color] = useState("#1A0D12");
  const [font_family, set_font_family] = useState("");
  const [font_size, set_font_size] = useState("");
  const [selected, setSelected] = useState("fixed");
  const [currency, setCurrency] = useState("INR");
  const [shipingGoal, setShipingGoal] = useState("");
  const [currencyPosition, setCurrencyPosition] = useState("before");
  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const fontSelectChange = useCallback((value) => set_font_family(value), []);
  const currencyChange = useCallback((value) => setCurrency(value), []);
  const currencyPositionChange = useCallback(
    (value) => setCurrencyPosition(value),
    []
  );

  async function update() {
    alert("hi");
    // var template = {
    //   name: name,
    //   shipBar: content,
    //   background: background_color,
    //   position: selected,
    //   fontColor: font_color,
    //   specialTextColor: special_font_color,
    //   fontFamily: font_family,
    //   fontSize: font_size,
    //   shipingGoal:
    //     currencyPosition === "after"
    //       ? shipingGoal + currency
    //       : currency + shipingGoal,
    //   closeButton: close_button,
    // };

    // var post = await fetch("/announcementBar", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(template),
    // });
    // closeTemplate();
    // getTemplate();
  }

  return (
    <Layout>
      <Layout.Section oneHalf>
        <Card title="Content Configuration :" sectioned>
          <TextField
            label="Shipbar Name :"
            value={value.name}
            onChange={set_name}
            autoComplete="off"
          />

          <TextField
            label="Initial Message :"
            type="text"
            value={value.content}
            onChange={set_content}
            autoComplete="off"
          />
          <TextField
            label="Free Shiping Goal :"
            type="number"
            value={value.shipingGoal}
            onChange={setShipingGoal}
            autoComplete="off"
          />
          <Select
            label="Currency :"
            options={Currency}
            onChange={currencyChange}
            value={currency}
          />
          <TextField
            label="Currency Symbol :"
            value={currency}
            autoComplete="off"
          />
          <Select
            label="Currency :"
            options={CurrencyPosition}
            onChange={currencyPositionChange}
            value={currencyPosition}
          />
        </Card>
      </Layout.Section>
      <Layout.Section oneHalf>
        <Card title="Design Configuration :" sectioned>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "50px",
              width: "95%",
            }}
          >
            <lable
              style={{
                fontSize: "15px",
                fontWeight: "200",
                marginRight: "5%",
              }}
            >
              Background Color :
            </lable>
            <input
              value={value.background}
              type="color"
              onChange={(e) => set_background_color(e.target.value)}
              autoComplete="off"
              style={{ width: "200px", height: "40px", marginLeft: "8px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "50px",
              width: "95%",
            }}
          >
            <lable
              style={{
                fontSize: "15px",
                fontWeight: "200",
                marginRight: "6.8%",
              }}
            >
              Text Color :
            </lable>
            <input
              value={value.fontColor}
              type="color"
              onChange={(e) => set_font_color(e.target.value)}
              autoComplete="off"
              style={{ width: "200px", height: "40px", marginLeft: "53px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "50px",
              width: "95%",
            }}
          >
            <lable
              style={{
                fontSize: "15px",
                fontWeight: "200",
                marginRight: "6.8%",
              }}
            >
              Special Text Color :
            </lable>
            <input
              value={value.specialTextColor}
              type="color"
              onChange={(e) => set_special_font_color(e.target.value)}
              autoComplete="off"
              style={{ width: "200px", height: "40px" }}
            />
          </div>
          <Select
            label="Font Family :"
            options={fontOPT}
            onChange={fontSelectChange}
            value={value.fontFamily}
          />

          <TextField
            label=" Choose Font-Size :"
            type="number"
            value={font_size}
            onChange={value.fontSize}
            autoComplete="off"
          />
          <Select
            label="Choose a Display Position :"
            options={options}
            onChange={value.position}
            value={selected}
          />
          <Select
            label="Include Close Button :"
            options={closeButton}
            onChange={setCloseButton}
            value={value.closeButton}
          />
        </Card>
      </Layout.Section>
      <Layout.Section fullWidth>
        <Stack distribution="trailing">
          <Button onClick={closeTemplate}>Cancel</Button>
          <Button primary onClick={update}>
            Edit Template
          </Button>
        </Stack>
      </Layout.Section>
    </Layout>
  );
};

export default Edit;
