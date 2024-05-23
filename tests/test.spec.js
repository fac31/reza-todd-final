const {test, expect} = require('@playwright/test');
test('Home Page test', async ({page}) => {
    await page.goto('/');
    await expect(page.getByRole('heading')).toContainText('Hello World!!!');

})
;