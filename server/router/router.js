import { Shopify, ApiVersion } from "@shopify/shopify-api";
import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/router", (req, res) => {
  const data = prisma.shops({});
  res.send(data);
});

export default router;
