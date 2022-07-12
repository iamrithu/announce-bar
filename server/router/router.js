import { Shopify, ApiVersion } from "@shopify/shopify-api";
import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";
import { Customer } from "@shopify/shopify-api/dist/rest-resources/2022-01/index.js";

const prisma = new PrismaClient();

router.get("/announcementBar", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);

  try {
    const data = await prisma.shipbars.findMany({
      where: { shop: test_session.shop },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.post("/announcementBar", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);

  var details = {
    uuid: uuid(),
    name: req.body.name,
    content: req.body.shipBar,
    background: req.body.background,
    position: req.body.position,
    fontColor: req.body.fontColor,
    fontFamily: req.body.fontFamily,
    fontSize: req.body.fontSize,
    shop: test_session.shop,
    isActive: "false",
  };
  let newData = await prisma.shipbars.create({
    data: details,
  });
  res.status(200).send(newData);
});

router.put("/update/:id", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res);
  const data = await prisma.shipbars.findMany({
    where: {
      shop: test_session.shop,
      isActive: "true",
    },
  });
  if (data.length != 0) {
    await prisma.shipbars.update({
      where: { uuid: data[0].uuid },
      data: { isActive: "false" },
    });
  }

  let newData = await prisma.shipbars.update({
    where: { uuid: req.params.id },
    data: {
      isActive: "true",
    },
  });
  res.status(200).send(newData);
});
router.get("/updateAll", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res);

  try {
    const data = await prisma.shipbars.findMany({
      where: {
        shop: test_session.shop,
        isActive: "true",
      },
    });
    if (data.length != 0) {
      let datas = await prisma.shipbars.update({
        where: { uuid: data[0].uuid },
        data: { isActive: "false" },
      });
      res.status(200).send(datas);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteUser = await prisma.shipbars.delete({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).send(deleteUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/get-script", async (req, res) => {
  // const test_session = await Shopify.Utils.loadCurrentSession(req, res);
  try {
    const data = await prisma.shipbars.findMany({
      where: {
        shop: String(req.query.shop),
        isActive: "true",
      },
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/customers", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(
    request,
    response
  );
  let customer = await Customer.all({
    session: test_session,
  });
  console.log(customer);
});

export default router;
