import { test, expect } from '@playwright/test';

test('H2 R3: peso en libras válido, persistente y restaurado', async ({ page }, info) => {
  const login = await page.request.post('/api/auth/login', {
    data: { email: 'trainer@demo.local', password: 'Demo123!' },
  });
  expect(login.status()).toBe(200);
  const before = await page.request.get('/api/clients/client-ana');
  expect(before.status()).toBe(200);
  const originalWeight = (await before.json()).client.weightKg as number | null;
  let evidence: Record<string, unknown> = { project: info.project.name, originalWeight };

  try {
    await page.goto('/trainer/clients/client-ana?tab=profile');
    const weight = page.getByRole('spinbutton', { name: 'Valor del peso', exact: true });
    const unit = page.getByRole('combobox', { name: 'Unidad del peso', exact: true });
    await unit.selectOption('lb');
    const convertedValid = await weight.evaluate((element: HTMLInputElement) => element.checkValidity());
    expect(convertedValid).toBe(true);
    await weight.fill('120.5');
    const entered = await weight.evaluate((element: HTMLInputElement) => ({
      valid: element.checkValidity(), stepMismatch: element.validity.stepMismatch, value: element.value,
    }));
    expect(entered.valid).toBe(true);
    expect(entered.stepMismatch).toBe(false);
    const saving = page.waitForResponse(response =>
      response.url().endsWith('/api/clients/client-ana') && response.request().method() === 'PATCH',
    );
    await page.getByRole('button', { name: 'Guardar perfil', exact: true }).click();
    const saved = await saving;
    expect(saved.status()).toBe(200);
    const expectedKg = 120.5 * 0.45359237;
    const savedKg = (await saved.json()).client.weightKg as number;
    expect(savedKg).toBeCloseTo(expectedKg, 8);
    await page.reload();
    await expect(unit).toHaveValue('kg');
    expect(Number(await weight.inputValue())).toBeCloseTo(expectedKg, 8);
    expect(await weight.evaluate((element: HTMLInputElement) => element.checkValidity())).toBe(true);
    evidence = { ...evidence, convertedValid, entered, expectedKg, savedKg, reloaded: true };
  } finally {
    // Sólo restaurar el campo alterado por esta prueba; no sobrescribir el resto del perfil.
    const restored = await page.request.patch('/api/clients/client-ana', { data: { weightKg: originalWeight } });
    expect(restored.status()).toBe(200);
    expect((await restored.json()).client.weightKg).toBe(originalWeight);
    await info.attach('h2-r3-peso-restaurado', {
      body: JSON.stringify({ ...evidence, restored: true }, null, 2), contentType: 'application/json',
    });
  }
});
