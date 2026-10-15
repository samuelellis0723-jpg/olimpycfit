import { test, expect } from '@playwright/test';

const password = 'Demo123!';

test('API: sesión, rol y aislamiento entre fichas', async ({ request }) => {
  const anonymous = await request.get('/api/clients');
  expect(anonymous.status()).toBe(401);
  const login = await request.post('/api/auth/login', { data: { email: 'client@demo.local', password } });
  expect(login.ok()).toBeTruthy();
  const me = await request.get('/api/auth/me');
  expect((await me.json()).user.role).toBe('CLIENT');
  expect((await request.get('/api/clients/client-ana')).ok()).toBeTruthy();
  expect([403, 404]).toContain((await request.get('/api/clients/client-luis')).status());
  expect([403, 404]).toContain((await request.patch('/api/clients/client-ana', { data: { name: 'Alteración no autorizada' } })).status());
  await request.post('/api/auth/logout');
  expect((await request.get('/api/auth/me')).status()).toBe(401);
});

test('API: entrenador obtiene sólo fichas asignadas y rechaza credenciales inválidas', async ({ request }) => {
  expect((await request.post('/api/auth/login', { data: { email: 'trainer@demo.local', password: 'incorrecta' } })).status()).toBe(401);
  expect((await request.post('/api/auth/login', { data: { email: 'trainer@demo.local', password } })).ok()).toBeTruthy();
  const response = await request.get('/api/clients');
  expect(response.ok()).toBeTruthy();
  const { clients } = await response.json();
  expect(clients.length).toBeGreaterThanOrEqual(3);
  expect(clients.every((client: { trainerId: string }) => client.trainerId === 'trainer-demo')).toBeTruthy();
});
