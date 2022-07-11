import { Shopify, ApiVersion } from "@shopify/shopify-api";
import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";

const prisma = new PrismaClient();

router.get("/announcementBar", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);

  try {
    const data = await prisma.shipbars.findMany({
      where: { shop: test_session.shop },
    });
    res.status(200).send(data);
    console.log(test_session);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.post("/announcementBar", async (req, res) => {
  const test_session = await Shopify.Utils.loadCurrentSession(req, res, true);

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
    isActive: "true",
  };
  await prisma.shipbars.create({
    data: details,
  });
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

  await prisma.shipbars.update({
    where: { uuid: req.params.id },
    data: {
      isActive: "true",
    },
  });
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
      await prisma.shipbars.update({
        where: { uuid: data[0].uuid },
        data: { isActive: "false" },
      });
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

    res.send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
