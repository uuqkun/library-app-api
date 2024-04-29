import supertest from "supertest";
import { app, server } from "../src/index";
import { deleteMember, getMember } from "./test-util";

const data = {
  Name: "Uqie rach",
  Address: "Permata saxophone blok i no.4",
  Email: "uqie.rach@gmail.com",
  Phone: "08123456789",
};

const memberID: string = "MEM011";

afterEach(() => server.close());

describe("GET /api/members", () => {
  test("GET /api/members", async () => {
    const results = await supertest(app).get("/api/members");

    expect(results.status).toBe(200);
    expect(results.body.data.length).toBeGreaterThan(0);
  });
});

describe("GET /api/members/:MemberID", () => {
  test("Should retrieve member's data by id", async () => {
    const results = await supertest(app).get("/api/members/MEM001");

    expect(results.status).toBe(200);
    expect(results.body.data.MemberID).toBeDefined();
  });

  test("Should return error 404: user not found", async () => {
    const results = await supertest(app).get("/api/members/MEM100");

    expect(results.status).toBe(404);
    expect(results.body.errors).toBeDefined();
  });
});

describe("POST /api/members/", () => {
  const data = {
    Name: "Uqie rach",
    Address: "Permata saxophone blok i no.4",
    Email: "uqie.rach@gmail.com",
    Phone: "08123456789",
  };

  afterEach(async () => {
    await deleteMember(data.Email);
  });

  test("Should return status 201: member registered successfully", async () => {
    const results = await supertest(app).post("/api/members").send(data);

    expect(results.body.message).toBe("Member registered successfully!");
    expect(results.status).toBe(201);

    const member = await getMember(data.Email);

    expect(member.Email).toBe(data.Email);
  });

  test("Should return status 409: cannot use credentials", async () => {
    // Create member
    let results = await supertest(app).post("/api/members").send(data);

    expect(results.status).toBe(201);
    expect(results.body.message).toBeDefined();

    // Try to create member with the same email
    results = await supertest(app).post("/api/members").send(data);

    expect(results.body.errors).toBe("Cannot use this credential");
    expect(results.status).toBe(409);
  });

  test("Should return status 400 All fields required", async () => {
    // Create member
    const results = await supertest(app).post("/api/members").send({
      Name: "Uqie rach",
      Address: "Permata saxophone blok i no.4",
      Email: "uqie.rach@gmail.com",
    });

    expect(results.body.errors).toBeDefined();
    expect(results.status).toBe(400);
  });
});

describe("PATCH /api/members/:MemberID", () => {
  afterEach(async () => {
    await deleteMember(data.Email);
  });

  test("Should return 201: Member updated successfully!", async () => {
    let results = await supertest(app).post("/api/members").send(data);

    expect(results.body.message).toBe("Member registered successfully!");
    expect(results.status).toBe(201);

    results = await supertest(app).patch(`/api/members/${memberID}`).send({
      Name: "Uqie rachmadie",
    });

    expect(results.status).toBe(201);
    expect(results.body.message).toBe("Member updated successfully!");
  });

  test("Should return 404: Member not found", async () => {
    const results = await supertest(app)
      .patch(`/api/members/${memberID}`)
      .send({
        Name: "Uqie rachmadie",
      });

    expect(results.body.errors).toBe("Member not found");
    expect(results.status).toBe(404);
  });

  test("Should return 409: Input duplicate email", async () => {
    let results = await supertest(app).post("/api/members").send(data);

    expect(results.body.message).toBe("Member registered successfully!");
    expect(results.status).toBe(201);

    results = await supertest(app).patch(`/api/members/${memberID}`).send({
      Email: "james.bond@example.com",
    });

    expect(results.body.errors).toBe("Cannot use this credential");
    expect(results.status).toBe(409);
  });
});

describe("DELETE /api/members/:MemberID", () => {
  beforeEach(async () => {
    await supertest(app).post("/api/members").send(data);
  });

  afterEach(async () => await deleteMember(data.Email));

  test("should return 201: Member deleted successfully", async () => {
    const results = await supertest(app).delete(`/api/members/${memberID}`);

    expect(results.status).toBe(201);
    expect(results.body.message).toBe("Member deleted successfully!");
  });

  test("should return 404: Member not found", async () => {
    const results = await supertest(app).delete(`/api/members/MEM100`);

    expect(results.status).toBe(404);
    expect(results.body.errors).toBe("Member not found");
    server.close();
  });
});
