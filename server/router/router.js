import { Shopify, ApiVersion } from "@shopify/shopify-api";
import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/announcementBar", (req, res) => {
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

export default router;
