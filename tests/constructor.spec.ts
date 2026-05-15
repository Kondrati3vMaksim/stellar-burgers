import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    // Перехватываем все запросы к API через HAR-файл с записанными реальными ответами
    await page.routeFromHAR('tests/hars/api.har', { notFound: 'fallback' });
    // Открываем главную страницу и ждём загрузки
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Добавление булки и начинки в конструктор', async ({ page }) => {
    // Находим все кнопки "Добавить"
    const addButtons = page.locator('button:has-text("Добавить")');

    // Клик по первой кнопке — добавляем булку
    await addButtons.first().click();

    // Ждём появления булки в конструкторе
    await page.waitForSelector('.constructor-element_pos_top');

    // Клик по кнопке "Добавить" у начинки (ищем по тексту рядом с кнопкой)
    // Нажимаем на вторую кнопку Добавить (после булок идут начинки)
    await addButtons.nth(2).click();

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
    // Проверяем, что в модалке название именно того ингредиента, по которому кликнули
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
    // Добавляем мок для запроса пользователя, потому что в HAR нет успешного ответа auth/user
    await page.route('**/api/auth/user**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          success: true,
          user: { email: 'maxim@mail.ru', name: 'максим' }
        })
      });
    });

    // Обновляем страницу, чтобы применить авторизацию из HAR
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Собираем бургер: добавляем булку и начинку
    const addButtons = page.locator('button:has-text("Добавить")');
    await addButtons.first().click();
    await addButtons.nth(1).click();

    // Нажимаем оформить заказ
    const orderButton = page.locator('button:has-text("Оформить заказ")');
    await orderButton.click();
    await page.waitForTimeout(1000);

    // Проверяем, что открылось модальное окно с номером заказа
    await expect(page.locator('#modals > div').first()).toBeVisible();
    // Проверяем, что номер заказа отображается (любое число)
    await expect(page.locator('#modals h2')).not.toBeEmpty();

    // Закрываем модалку по крестику
    await page.locator('#modals button').first().click();
    await expect(page.locator('#modals > div').first()).not.toBeVisible();

    // Проверяем, что конструктор очистился
    await expect(
      page.locator(
        '.constructor-element_pos_top, .constructor-element_pos_bottom'
      )
    ).toHaveCount(0);
  });
});
