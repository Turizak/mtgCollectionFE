import { type Locator, type Page, type Request } from "@playwright/test";

export class AddCardPage {
  readonly page: Page;
  readonly inputCardSearch: Locator;
  readonly btnSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputCardSearch = page.locator("#card");
    this.btnSearch = page.locator(".btn-search");
  }

  /**
   * Navigate to the page
   * @async
   * @method
   */
  async goto() {
    await this.page.goto("/search");
  }
}
