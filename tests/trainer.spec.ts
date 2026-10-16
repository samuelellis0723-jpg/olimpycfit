import { test, expect, type Page } from '@playwright/test';

async function trainer(page: Page) {
  await page.request.post('/api/auth/login', { data: { email: 'trainer@demo.local', password: 'Demo123!' } });
  await page.goto('/trainer/clients/client-luis');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

test('Entrenador guarda medición con procedencia y evaluación realizada', async ({ page }, info) => {
  const note = `Recorrido E2E ${info.project.name} ${Date.now()}`;
  await trainer(page);
  await page.getByRole('tab', { name: 'Mediciones', exact: true }).click();
  await page.getByRole('combobox', { name: 'Medición', exact: true }).selectOption('foot_length');
  await page.getByLabel('Valor medido', { exact: true }).fill('25.5');
  await page.getByLabel(/^Protocolo y método de medición/).fill('Regla, talón al dedo más largo');
  await page.getByLabel('Observaciones', { exact: true }).fill(note);
  await page.getByRole('button', { name: 'Guardar medición', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Medición guardada');
  await page.reload();
  await expect(page.getByRole('cell', { name: new RegExp(note) })).toBeVisible();
  await page.getByRole('tab', { name: 'Evaluaciones', exact: true }).click();
  await page.getByRole('combobox', { name: 'Prueba o evaluación', exact: true }).selectOption('plank');
  await page.getByRole('combobox', { name: 'Estado', exact: true }).selectOption('completed');
  await page.getByLabel(/^Resultado numérico/).fill('60');
  await page.getByLabel('Protocolo aplicado y versión', { exact: true }).fill('Plancha frontal con apoyo de antebrazos');
  await page.getByRole('button', { name: 'Guardar evaluación', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Evaluación guardada');
  const response = await page.request.get('/api/clients/client-luis/assessments');
  expect((await response.json()).assessments.some((a: { key: string; value: number }) => a.key === 'plank' && a.value === 60)).toBeTruthy();
});

test('Entrenador crea seis semanas y publica después de revisar', async ({ page }, info) => {
  await trainer(page);
  await page.getByRole('tab', { name: 'Plan de 6 semanas', exact: true }).click();
  await page.getByRole('button', { name: '+ Crear mesociclo de 6 semanas', exact: true }).click();
  const title = `Ciclo verificado ${info.project.name} ${Date.now()}`;
  await page.getByLabel('Nombre del plan', { exact: true }).fill(title);
  await page.getByLabel('FITT · Frecuencia', { exact: true }).fill('Una sesión por semana para esta prueba sintética');
  await page.getByLabel('FITT · Intensidad', { exact: true }).fill('Esfuerzo moderado revisado por entrenador');
  await page.getByLabel('FITT · Tiempo', { exact: true }).fill('30 minutos');
  await page.getByLabel('FITT · Tipo', { exact: true }).fill('Práctica de fuerza');
  await page.getByLabel('Horario semanal: gimnasio, deporte, descanso y actividad diaria', { exact: true }).fill('Lunes gimnasio; martes y jueves caminata; descanso los demás días.');
  await page.getByRole('button', { name: '+ Agregar ejercicio', exact: true }).click();
  await page.getByRole('combobox', { name: 'Ejercicio', exact: true }).selectOption({ index: 1 });
  await page.getByLabel('Justificación vinculada al objetivo', { exact: true }).fill('Práctica del movimiento para el objetivo sintético registrado.');
  await page.getByRole('button', { name: 'Copiar sesiones a las otras 5 semanas', exact: true }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.getByRole('button', { name: 'Guardar borrador', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Borrador guardado');
  const card = page.locator('section.card').filter({ has: page.getByRole('heading', { name: title, exact: true }) });
  await expect(card).toContainText('REQUIERE REVISIÓN');
  await expect(card.locator('.plan-weeks > details')).toHaveCount(6);
  await card.getByRole('button', { name: 'Aprobar y publicar al cliente', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Plan aprobado');
  await expect(card).toContainText('APROBADO');
});

test('Informe muestra datos reales y conserva el ancho móvil', async ({ page }, info) => {
  await trainer(page);
  await page.goto('/trainer/clients/client-ana?tab=progress');
  await expect(page.getByRole('heading', { name: 'Progreso con contexto', exact: true })).toBeVisible();
  await expect(page.locator('.stats.compact .stat').first().locator('strong')).not.toHaveText('0');
  await expect(page.getByRole('heading', { name: 'Entre el inicio y el presente', exact: true })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflow).toBe(false);
  await page.screenshot({ path: `test-results/trainer-report-${info.project.name}.png`, fullPage: true });
});
