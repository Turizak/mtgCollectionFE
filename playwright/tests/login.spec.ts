import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

type FormOptions = {
  username: string;
  password: string;
};

test.describe("Login Page Tests", () => {
  test("Successful login with valid username and password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    const formData: FormOptions = {
      username: process.env.PLAYWRIGHT_USER as string,
      password: process.env.PLAYWRIGHT_PASS as string,
    };

    await test.step("Navigate to the page", async () => {
      await loginPage.goto();
    });

    await test.step("Fill out form and submit", async () => {
      await loginPage.loginUI(formData);
    });

    await test.step("Assertion", async () => {
      await page.waitForURL("/");
      expect(page.url()).toContain("/");
    });
  });

  test("Unsuccesful login with invalid username and password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    const formData: FormOptions = {
      username: "fakeuser",
      password: "fakepassword",
    };

    await test.step("Navigate to the page", async () => {
      await loginPage.goto();
    });

    await test.step("Fill out form and submit", async () => {
      await loginPage.loginUI(formData);
    });

    await test.step("Assertion", async () => {
      await Promise.all([
        page.waitForResponse(
          (resp) =>
            resp.url().includes("/api/v1/login") && resp.status() === 400
        ),
      ]);
    });
  });
});
