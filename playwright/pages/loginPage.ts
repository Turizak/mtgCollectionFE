import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly btnLogin: Locator;
  readonly btnCreateAccount: Locator;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnLogin = page.getByText("Login");
    this.btnCreateAccount = page.getByText("Create Account");
    this.inputUsername = page.locator("#username");
    this.inputPassword = page.locator("#password");
  }

  /**
   * Navigate to the form page
   * @async
   * @method
   */
  async goto() {
    await this.page.goto("/login");
  }

  /**
   * Fill out the login form page via UI
   * @async
   * @method
   * @param {String} options.username string
   * @param {String} options.password string
   */
  async loginUI(options: { username: string; password: string }) {
    // input fields
    await this.inputUsername.fill(options.username);
    await this.inputPassword.fill(options.password);
    await this.btnLogin.click();
  }
}
