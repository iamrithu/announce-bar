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

const Templates = ({ getTemplate, closeTemplate }) => {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const options = [
    { label: "Choose", value: "" },
    { label: "Fixed", value: "fixed" },
    { label: "Scrollable ", value: "relative" },
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

  const [openTextField, setOpenTextField] = useState(false);
  const [name, set_name] = useState();
  const [close_button, setCloseButton] = useState("NO");
  const [content, set_content] = useState("");
  const [background_color, set_background_color] = useState("");
  const [font_color, set_font_color] = useState("");
  const [font_family, set_font_family] = useState("");
  const [font_size, set_font_size] = useState("");
  const [selected, setSelected] = useState("");
  const [currency, setCurrency] = useState("");
  const [shipingGoal, setShipingGoal] = useState("");
  const [currencyPosition, setCurrencyPosition] = useState("before");

  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const fontSelectChange = useCallback((value) => set_font_family(value), []);
  const currencyChange = useCallback((value) => setCurrency(value), []);
  const currencyPositionChange = useCallback(
    (value) => setCurrencyPosition(value),
    []
  );

  var templates = [
    {
      name: "Bold and Clear",
      background: "#1E1E20",
      fontSize: "16",
      fontColor: "#F2BF61",
      fontFamily: "Helvetica",
    },
    {
      name: "Shades of grey",
      background: "#4C4C4C",
      fontSize: "16",
      fontColor: "#C0C8E0",
      fontFamily: "Helvetica",
    },
    {
      name: "Bright and Elegant",
      background: "#F2F2F2",
      fontSize: "14",
      fontColor: "#355897",
      fontFamily: "Helvetica",
    },
    {
      name: "Harvest Gold",
      background: "#FFF0A5",
      fontSize: "14",
      fontColor: "#B67674",
      fontFamily: "Helvetica",
    },
    {
      name: "Good Mood",
      background: "#C6F7D8",
      fontSize: "14",
      fontColor: "#B9B16B",
      fontFamily: "Helvetica",
    },
    {
      name: "Trust Me",
      background: "#34B0F3",
      fontSize: "14",
      fontColor: "#E6DBF3",
      fontFamily: "Helvetica",
    },
    {
      name: "Fairy Tale",
      background: "#FAD8D2",
      fontSize: "14",
      fontColor: "#E28D56",
      fontFamily: "Helvetica",
    },
    {
      name: "Important Things",
      background: "#EB493E",
      fontSize: "14",
      fontColor: "#FCAC4B",
      fontFamily: "Helvetica",
    },
    {
      name: "Nature stuff",
      background: "#70ED96",
      fontSize: "14",
      fontColor: "#FFFFFF",
      fontFamily: "Helvetica",
    },
    {
      name: "New stuff",
      background: "#00A0AC",
      fontSize: "14",
      fontColor: "#FFFFFF",
      fontFamily: "Helvetica",
    },
  ];

  const choose_template = (info) => {
    set_background_color(info.background);
    set_font_color(info.fontColor);
    set_font_family(info.fontFamily);
    set_font_size(info.fontSize);
    setOpenTextField(true);
  };
  async function create() {
    if (currencyPosition === "after") {
      setShipingGoal(`${shipingGoal}${currency}`);
      alert(currency);
    } else {
      setShipingGoal(`${currency}${shipingGoal}`);
      alert(currency);
    }
    // var template = {
    //   name: name,
    //   shipBar: content,
    //   background: background_color,
    //   position: selected,
    //   fontColor: font_color,
    //   fontFamily: font_family,
    //   fontSize: font_size,
    //   shipingGoal: shipingGoal,
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
      <Layout.Section fullWidth>
        <Stack distribution="center">
          <h1>Basic Templates</h1>
        </Stack>
      </Layout.Section>
      <Layout.Section fullWidth>
        <Card>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "10px",
              padding: "10px 14px",
            }}
          >
            {templates.map((info, index) => {
              return (
                <div
                  key={index}
                  style={{
                    height: "40px",
                    width: "100%",
                    background: info.background,
                    fontSize: info.fontSize,
                    color: info.fontColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  onClick={() => choose_template(info)}
                >
                  {info.name}
                </div>
              );
            })}
          </div>
        </Card>
      </Layout.Section>
      {openTextField ? (
        <>
          <Layout.Section oneHalf>
            <Card title="Content Configuration" sectioned>
              <TextField
                label="Name"
                value={name}
                onChange={set_name}
                autoComplete="off"
              />

              <TextField
                label="Initial Message :"
                value={content}
                onChange={set_content}
                autoComplete="off"
              />
              <TextField
                label="Free Shiping Goal"
                value={shipingGoal}
                onChange={setShipingGoal}
                autoComplete="off"
              />
              <Select
                label="Currency:"
                options={Currency}
                onChange={currencyChange}
                value={currency}
              />
              <TextField
                label="Currency Symbol:"
                value={currency}
                autoComplete="off"
              />
              <Select
                label="Currency:"
                options={CurrencyPosition}
                onChange={currencyPositionChange}
                value={currencyPosition}
              />
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card title="Design Configuration" sectioned>
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
                  Background :
                </lable>
                <input
                  value={background_color}
                  type="color"
                  onChange={(e) => set_background_color(e.target.value)}
                  autoComplete="off"
                  style={{ width: "200px", height: "40px" }}
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
                  Font-Color :
                </lable>
                <input
                  value={font_color}
                  type="color"
                  onChange={(e) => set_font_color(e.target.value)}
                  autoComplete="off"
                  style={{ width: "200px", height: "40px" }}
                />
              </div>
              <Select
                label="Font-Family"
                options={fontOPT}
                onChange={fontSelectChange}
                value={font_family}
              />

              <TextField
                label=" Choose Font-Size"
                value={font_size}
                onChange={set_font_size}
                autoComplete="off"
              />
              <Select
                label="Choose a Display Position:"
                options={options}
                onChange={handleSelectChange}
                value={selected}
              />
              <Select
                label="Include Close Button:"
                options={closeButton}
                onChange={setCloseButton}
                value={close_button}
              />
            </Card>
          </Layout.Section>
          <Layout.Section fullWidth>
            <Stack distribution="trailing">
              <Button onClick={closeTemplate}>Cancel</Button>
              <Button primary onClick={create}>
                Create Template
              </Button>
            </Stack>
          </Layout.Section>
        </>
      ) : null}
    </Layout>
  );
};

export default Templates;
