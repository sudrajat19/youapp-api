import express from "express";
import {
  createInterests,
  deleteInterest,
  getInterest,
  getInterestId,
  updateInterest,
} from "../controller/interestController.js";

const router = express.Router();

router.get("/showinterest", getInterest);
router.get("/showinterest/:id_users", getInterestId);
router.post("/create/interest", createInterests);
router.put("/update/interest/:id_interest", updateInterest);
router.delete("/delete/interest/:id_interest", deleteInterest);

export default router;
