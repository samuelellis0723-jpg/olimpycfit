import { test, expect } from '@playwright/test';

async function login(page: import('@playwright/test').Page, email: string) {
  await page.goto('/login');
  await page.getByLabel('Correo electrónico', { exact: true }).fill(email);
  await page.getByLabel('Contraseña', { exact: true }).fill('Demo123!');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
}

test('Acceso visible del entrenador y recarga de sesión', async ({ page }) => {
  await page.goto('/trainer');
  await expect(page).toHaveURL(/\/login/);
  await login(page, 'trainer@demo.local');
  await expect(page).toHaveURL(/\/trainer$/);
  await expect(page.locator('main')).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL(/\/trainer$/);
  await expect(page.locator('main')).toBeVisible();
  await page.screenshot({ path: `test-results/base-trainer-${test.info().project.name}.png`, fullPage: true });
});

test('Acceso visible del cliente y bloqueo de ruta entrenador', async ({ page }) => {
  await login(page, 'client@demo.local');
  await expect(page).toHaveURL(/\/client$/);
  await page.goto('/trainer/clients');
  await expect(page).toHaveURL(/\/client$/);
  await expect(page.locator('main')).toBeVisible();
  await page.screenshot({ path: `test-results/base-client-${test.info().project.name}.png`, fullPage: true });
});
