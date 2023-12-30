import { type Locator, type Page } from "@playwright/test";

type Headers = {
  Authorization: string;
};

export class CreateAccountPage {
  readonly page: Page;
  readonly btnCreateAccount: Locator;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;

  constructor(page: Page) {
    this.page = page;
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
    await this.page.goto("/account");
  }

  /**
   * Fill out the create form page via UI
   * @async
   * @method
   * @param {String} options.username string
   * @param {String} options.password string
   * @param {String} options.firstName string
   * @param {String} options.lastName string
   */
  async createAccountUI(options: {
    username: string;
    password: string;
  }) {
    // input fields
    await this.inputUsername.fill(options.username);
    await this.inputPassword.fill(options.password);
    await this.btnCreateAccount.click();
  }

  /**
   * Delete account with user token
   * @async
   * @method
   * @param {String} options.token string
   */
  async deleteAccountAPI(options: { token: string | null }) {
    if (options.token) {
      const headers: Headers = {
        Authorization: `Bearer ${options.token}`,
      };
      await this.page.request.delete(
        `${process.env.PLAYWRIGHT_APIBASE}/api/v1/account/delete`,
        { headers: headers }
      );
    } else {
      return;
    }
  }
}
