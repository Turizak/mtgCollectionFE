import { type Page } from "@playwright/test";

export class CollectionPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the page
   * @async
   * @method
   */
  async goto() {
    await this.page.goto("/");
  }
}
