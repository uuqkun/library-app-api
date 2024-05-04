import express from "express";
import MemberController from "../controllers/MemberController";

const memberRoutes = express.Router();

// routes
memberRoutes.get("/members", MemberController.getMembers);
memberRoutes.get("/members/:memberId", MemberController.getMemberById);
memberRoutes.post("/members", MemberController.createMember);
memberRoutes.patch("/members/:memberID", MemberController.updateMember);
memberRoutes.delete("/members/:memberID", MemberController.deleteMember);

export default memberRoutes;
