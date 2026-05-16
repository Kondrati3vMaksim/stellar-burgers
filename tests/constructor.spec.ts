import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    // Перехватываем запросы к API через HAR
    await page.routeFromHAR('tests/hars/api.har', { notFound: 'fallback' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Добавление булки и начинки в конструктор', async ({ page }) => {
    // Клик по первому ингредиенту (булка)
    await page
      .locator('[data-testid^="ingredient-"]')
      .first()
      .locator('button:has-text("Добавить")')
      .click();
    // Ждём появления булки в конструкторе
    await expect(
      page.locator(
        '.constructor-element_pos_top, .constructor-element_pos_bottom'
      )
    ).toHaveCount(2);
    // Клик по третьему ингредиенту (начинка)
    await page
      .locator('[data-testid^="ingredient-"]')
      .nth(2)
      .locator('button:has-text("Добавить")')
      .click();

    await expect(
      page.locator(
        '.constructor-element_pos_top, .constructor-element_pos_bottom'
      )
    ).toHaveCount(2);
    await expect(
      page.locator(
        '.constructor-element:not(.constructor-element_pos_top):not(.constructor-element_pos_bottom)'
      )
    ).toHaveCount(1);
  });

  test('Открытие и закрытие модального окна ингредиента по крестику', async ({
    page
  }) => {
    const ingredientLink = page.locator('a[href*="/ingredients/"]').first();
    await ingredientLink.click();

    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal"] h3').nth(1)).toContainText(
      'Краторная булка N-200i'
    );

    await page.locator('[data-testid="modal"] button').first().click();
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  });

  test('Закрытие модального окна ингредиента по оверлею', async ({ page }) => {
    const ingredientLink = page.locator('a[href*="/ingredients/"]').first();
    await ingredientLink.click();

    await expect(page.locator('[data-testid="modal"]')).toBeVisible();

    await page.mouse.click(10, 10);
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  });

  test('Создание заказа', async ({ page }) => {
    // Подставляем фейковые токены авторизации
    await page.evaluate(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
      document.cookie = 'accessToken=mock-access-token';
    });

    // Мок запроса пользователя
    await page.route('**/api/auth/user**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          success: true,
          user: { email: 'maxim@mail.ru', name: 'максим' }
        })
      });
    });

    // Мок создания заказа
    await page.route('**/api/orders**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          success: true,
          order: { number: 12345 }
        })
      });
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const addButtons = page.locator('[data-testid^="add-button-"]');
    await page
      .locator('[data-testid^="ingredient-"]')
      .first()
      .locator('button:has-text("Добавить")')
      .click();
    await page
      .locator('[data-testid^="ingredient-"]')
      .nth(2)
      .locator('button:has-text("Добавить")')
      .click();

    await page.locator('[data-testid="order-button"]').click();
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal"] h2')).toContainText(
      '12345'
    );

    await page.locator('[data-testid="modal"] button').first().click();
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();

    await expect(
      page.locator(
        '.constructor-element_pos_top, .constructor-element_pos_bottom'
      )
    ).toHaveCount(0);

    // Очищаем токены
    await page.evaluate(() => {
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  });
});
