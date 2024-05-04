import { NextFunction, Request, Response } from "express";
import { MemberService } from "../services/MemberService";
import {
  CreateMember,
  DeleteMember,
  GetAllMembers,
  GetMemberById,
  UpdateMember,
} from "../usecases/members";

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/library";
const memberRepository = new MemberService(mongoURI);

const getMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await memberRepository.connect();
    const usecase = new GetAllMembers(memberRepository);
    const members = await usecase.execute();
    await memberRepository.disconnect();

    res.json({ data: members });
  } catch (error) {
    next(error);
  }
};

const getMemberById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await memberRepository.connect();
    const memberId = req.params.memberId;
    const usecase = new GetMemberById(memberRepository);
    const members = await usecase.execute(memberId);
    await memberRepository.disconnect();

    res.json({ data: members });
  } catch (error) {
    next(error);
  }
};

const createMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ESTABLISH CONNECTION
    await memberRepository.connect();

    // RETRIEVE MEMBER DATA
    const body = req.body;

    // INSTANTIATE NEW CREATE MEMBER USECASE
    const usecase = new CreateMember(memberRepository);

    // EXECUTE QUERIES
    await usecase.execute(body);

    // CLOSE CONNECTION
    await memberRepository.disconnect();

    res.status(201).json({ message: "Member registered successfully!" });
  } catch (error) {
    next(error);
  }
};

const updateMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ESTABLISH CONNECTION
    await memberRepository.connect();

    // RETRIEVE MEMBER DATA
    const body = req.body;
    const memberID = req.params.memberID;

    // INSTANTIATE NEW CREATE MEMBER USECASE
    const usecase = new UpdateMember(memberRepository);

    // EXECUTE QUERIES
    await usecase.execute(memberID, body);

    // CLOSE CONNECTION
    await memberRepository.disconnect();

    res.status(201).json({ message: "Member updated successfully!" });
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ESTABLISH CONNECTION
    await memberRepository.connect();

    // RETRIEVE MEMBER ID
    const memberID = req.params.memberID;

    // INSTANTIATE NEW CREATE MEMBER USECASE
    const usecase = new DeleteMember(memberRepository);

    // EXECUTE QUERIES
    await usecase.execute(memberID);

    // CLOSE CONNECTION
    await memberRepository.disconnect();

    res.status(201).json({ message: "Member deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export default { getMembers, getMemberById, createMember, updateMember, deleteMember };
