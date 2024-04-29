import express, { NextFunction, Request, Response } from "express";
import { MemberService } from "../../database/MemberService";
import {
  CreateMember,
  DeleteMember,
  GetAllMembers,
  GetMemberById,
  UpdateMember,
} from "../../../usecases/members";

const memberRoutes = express.Router();
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/library";
const memberRepository = new MemberService(mongoURI);

// routes
memberRoutes.get("/members", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await memberRepository.connect();
    const getAllMembers = new GetAllMembers(memberRepository);
    const members = await getAllMembers.execute();
    await memberRepository.disconnect();

    res.json({ data: members });
  } catch (error) {
    next(error);
  }
});

memberRoutes.get(
  "/members/:memberId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await memberRepository.connect();
      const memberId = req.params.memberId;
      const getMemberById = new GetMemberById(memberRepository);
      const members = await getMemberById.execute(memberId);
      await memberRepository.disconnect();

      res.json({ data: members });
    } catch (error) {
      next(error);
    }
  }
);

memberRoutes.post(
  "/members",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await memberRepository.connect();

      // RETRIEVE MEMBER DATA
      const body = req.body;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const createMember = new CreateMember(memberRepository);

      // EXECUTE QUERIES
      await createMember.execute(body);

      // CLOSE CONNECTION
      await memberRepository.disconnect();

      res.status(201).json({ message: "Member registered successfully!" });
    } catch (error) {
      next(error);
    }
  }
);

memberRoutes.patch(
  "/members/:memberID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await memberRepository.connect();

      // RETRIEVE MEMBER DATA
      const body = req.body;
      const memberID = req.params.memberID;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const updateMember = new UpdateMember(memberRepository);

      // EXECUTE QUERIES
      await updateMember.execute(memberID, body);

      // CLOSE CONNECTION
      await memberRepository.disconnect();

      res.status(201).json({ message: "Member updated successfully!" });
    } catch (error) {
      next(error);
    }
  }
);

memberRoutes.delete(
  "/members/:memberID",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ESTABLISH CONNECTION
      await memberRepository.connect();

      // RETRIEVE MEMBER ID
      const memberID = req.params.memberID;

      // INSTANTIATE NEW CREATE MEMBER USECASE
      const deleteMember = new DeleteMember(memberRepository);

      // EXECUTE QUERIES
      await deleteMember.execute(memberID);

      // CLOSE CONNECTION
      await memberRepository.disconnect();

      res.status(201).json({ message: "Member deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
);

export default memberRoutes;
