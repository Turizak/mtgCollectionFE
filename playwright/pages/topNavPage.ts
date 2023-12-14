import { type Locator, type Page, type Request } from "@playwright/test";

export class TopNavPage {
  readonly page: Page;
  readonly btnAdd: Locator;
  readonly btnCollection: Locator;
  readonly btnLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnAdd = page.locator(".btn-add-card");
    this.btnCollection = page.locator(".btn-goto-collection");
    this.btnLogout = page.locator(".btn-logout");
  }

  /**
   * Navigate to card search
   * @async
   * @method
   */
  async navigateToCardSearch() {
    // input fields
    await this.btnAdd.click();
  }

  /**
   * Navigate to card collection
   * @async
   * @method
   */
  async navigateToCollection() {
    // input fields
    await this.btnCollection.click();
  }

    /**
   * Logout of application
   * @async
   * @method
   */
    async logout() {
      // input fields
      await this.btnLogout.click();
    }
}
