import { Db, MongoClient } from "mongodb";

const client: MongoClient = new MongoClient(
  "mongodb://localhost:27017/library"
);
const db: Db = client.db();

const members = "members";

const connect = async () => await client.connect();
const disconnect = async () => await client.close();

// TEST UTILS
export const deleteMember = async (Email: string) => {
  await connect();

  const result = await db.collection(members).deleteOne({ Email: Email });

  await disconnect();

  return result;
};

export const getMember = async (Email: string) => {
  await connect();

  const result = await db.collection(members).findOne({ Email: Email });

  await disconnect();

  return result;
};

export const insertMember = async (member: any) => {
  await connect();

  const result = await db.collection(members).insertOne(member);

  await disconnect();

  return result;
}
