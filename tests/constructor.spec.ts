import { test, expect } from '@playwright/test';
import ingredientsMock from './hars/ingredients.json';
import userMock from './hars/user.json';
import orderMock from './hars/order.json';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    // Перехватываем запрос на ингредиенты и подставляем моковые данные
    await page.route('**/api/ingredients**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true, data: ingredientsMock })
      });
    });
    // Открываем главную страницу и ждём загрузки
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Добавление булки и начинки в конструктор', async ({ page }) => {
    // Находим все кнопки "Добавить"
    const addButtons = page.locator('button:has-text("Добавить")');

    // Клик по первой кнопке — добавляем булку
    await addButtons.first().click();
    // Клик по второй кнопке — добавляем начинку
    await addButtons.nth(1).click();

    // Проверяем, что булка отображается сверху и снизу конструктора
    await expect(
      page.locator(
        '.constructor-element_pos_top, .constructor-element_pos_bottom'
      )
    ).toHaveCount(2);

    // Проверяем, что начинка появилась в середине конструктора
    await expect(
      page.locator(
        '.constructor-element:not(.constructor-element_pos_top):not(.constructor-element_pos_bottom)'
      )
    ).toHaveCount(1);
  });

  test('Открытие и закрытие модального окна ингредиента по крестику', async ({
    page
  }) => {
    // Клик по первому ингредиенту в списке (ссылка с href на /ingredients/)
    const ingredientLink = page.locator('a[href*="/ingredients/"]').first();
    await ingredientLink.click();
    await page.waitForTimeout(1000); // ждём анимацию открытия

    // Проверяем, что модальное окно открылось
    await expect(page.locator('#modals > div').first()).toBeVisible();
    await expect(page.locator('#modals h3').nth(1)).toContainText(
      'Краторная булка N-200i'
    );

    // Закрываем модалку по клику на кнопку-крестик
    await page.locator('#modals button').first().click();
    // Проверяем, что модалка закрылась
    await expect(page.locator('#modals > div').first()).not.toBeVisible();
  });

  test('Закрытие модального окна ингредиента по оверлею', async ({ page }) => {
    // Клик по первому ингредиенту для открытия модалки
    const ingredientLink = page.locator('a[href*="/ingredients/"]').first();
    await ingredientLink.click();
    await page.waitForTimeout(1000); // ждём анимацию открытия

    // Проверяем, что модалка открылась (первый div в #modals)
    await expect(page.locator('#modals > div').first()).toBeVisible();

    // Закрываем модалку кликом по оверлею (второй div в #modals)
    // dispatchEvent используется, потому что модалка перекрывает оверлей
    await page.locator('#modals > div').nth(1).dispatchEvent('click');

    // Проверяем, что модалка закрылась
    await expect(page.locator('#modals > div').first()).not.toBeVisible();
  });

  test('Создание заказа', async ({ page }) => {
    // имитируем авторизированного пользователя
    await page.evaluate(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
      document.cookie = 'accessToken=mock-access-token';
    });

    // Перехват запроса данных пользователя
    await page.route('**/api/auth/user**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(userMock)
      });
    });

    // Перехват запроса создания заказа
    await page.route('**/api/orders**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(orderMock)
      });
    });

    // Обновляем страницу, чтобы применить авторизацию
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Собираем бургер. Добавляем булку и начинку
    const addButtons = page.locator('button:has-text("Добавить")');
    await addButtons.first().click();
    await addButtons.nth(1).click();

    // Нажимаем оформить заказ
    const orderButton = page.locator('button:has-text("Оформить заказ")');
    await orderButton.click();
    await page.waitForTimeout(1000);

    // Проверяем открытое модальное окно с номером заказа
    await expect(page.locator('#modals > div').first()).toBeVisible();
    // Проверяем, что номер заказа правильный
    await expect(page.locator('#modals h2')).toContainText('12345');

    // Закрываем модалку по крестику
    await page.locator('#modals button').first().click();
    await expect(page.locator('#modals > div').first()).not.toBeVisible();

    // Проверяем, что конструктор очистился
    await expect(
      page.locator(
        '.constructor-element_pos_top, .constructor-element_pos_bottom'
      )
    ).toHaveCount(0);

    await page.evaluate(() => {
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  });
});
