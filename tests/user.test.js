const db = require("./db");
const { createUser, updateUserMail } = require("../controller/user");

beforeAll(async () => await db.connect());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

describe("test user controller", () => {
  it("create a new user", async () => {
    const user = await createUser("jeremy", "dubar.jeremy@gmail.com");
    await expect(user.name).toEqual("jeremy");
    await expect(user.email).toEqual("dubar.jeremy@gmail.com");
  });

  it("update user's mail with success", async () => {
    const user = await createUser("jeremy", "dubar.jeremy@gmail.com");
    const userUpdated = await updateUserMail(user.email, "newEmail@gmail.com");

    await expect(user.email).not.toEqual(userUpdated.email);
  });

  it("create user with error (user already exist in the Db)", async () => {
    await createUser("jeremy", "dubar.jeremy@gmail.com");
    await expect(createUser("jeremy", "dubar.jeremy@gmail.com")).rejects.toThrow();
    await expect(createUser("jeremy", "dubar.jeremy@gmail.com")).rejects.toThrow();
  });

  it("update user's mail with error (currentEmail that does not exists)", async () => {
    await expect(updateUserMail("email@gmail.com", "newEmail@gmail.com")).rejects.toThrow();
  });

  it("update user's mail with error (mail already exist in the Db)", async () => {
    const jeremy = await createUser("jeremy", "dubar.jeremy@gmail.com");
    const garance = await createUser("garance", "garance.tartas@gmail.com");

    await expect(updateUserMail(jeremy.email, garance.email)).rejects.toThrow();
  });
});
