import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accesibilidad automática en acceso y pantallas del entrenador', async ({ page }, info) => {
  test.setTimeout(120_000);
  const routes = ['/login', '/trainer', '/trainer/clients', '/trainer/clients/client-ana', '/trainer/clients/client-ana?tab=measurements', '/trainer/clients/client-ana?tab=assessments', '/trainer/clients/client-ana?tab=plans', '/trainer/clients/client-ana?tab=progress', '/assistant'];
  for (const route of routes) {
    if (route === '/trainer') await page.request.post('/api/auth/login', { data: { email: 'trainer@demo.local', password: 'Demo123!' } });
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.loading')).toHaveCount(0);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    await info.attach(`axe-${route.replace(/\W/g, '-')}`, { body: JSON.stringify(result.violations, null, 2), contentType: 'application/json' });
    expect.soft(result.violations, `Axe ${route}`).toEqual([]);
    expect.soft(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `Ancho ${route}`).toBe(true);
  }
  await page.goto('/trainer');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.loading')).toHaveCount(0);
  await page.screenshot({ path: `test-results/dashboard-${info.project.name}.png`, fullPage: true });
});

test('Cliente: teclado, SVG, movimiento reducido y pantallas accesibles', async ({ page }, info) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.request.post('/api/auth/login', { data: { email: 'client@demo.local', password: 'Demo123!' } });
  for (const route of ['/client', '/client/profile', '/client/history', '/assistant']) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.loading')).toHaveCount(0);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect.soft(result.violations, `Axe ${route}`).toEqual([]);
  }
  await page.goto('/client/routine');
  await page.getByRole('button', { name: 'SEMANA 01', exact: true }).click();
  const technique = page.getByRole('button', { name: 'Ver técnica ↗', exact: true }).first();
  await technique.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.muscle-map')).toBeVisible();
  await expect(page.locator('.body-views svg')).toHaveCount(2);
  await expect(page.locator('.muscle-controls button')).toHaveCount(10);
  const regions = page.locator('.body-views [role="button"]');
  await regions.first().focus();
  await page.keyboard.press('Tab');
  await expect(regions.nth(1)).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(regions.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.muscle-inspection')).toContainText('Pecho');
  const abdomen = page.locator('.muscle-controls').getByRole('button', { name: /^Abdomen/ });
  await abdomen.focus();
  await page.keyboard.press('Space');
  await expect(abdomen).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.muscle-inspection')).toContainText('Abdomen');
  expect(await page.locator('.body-outline > path').first().evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  await info.attach('axe-routine-muscles', { body: JSON.stringify(result.violations, null, 2), contentType: 'application/json' });
  expect(result.violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: `test-results/muscles-${info.project.name}.png`, fullPage: true });
  await page.locator('.muscle-map').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `test-results/muscles-viewport-${info.project.name}.png` });
});
