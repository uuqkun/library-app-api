import { ObjectId } from "mongodb";

export default interface Book {
  _id: ObjectId;
  ISBN: string;
  Title: string;
  Author: string;
  Category: string;
  PublishYear: number;
  Publisher: string;
  AvailableCopies: number;
}
