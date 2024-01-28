import { HttpResponse, delay, http } from 'msw';

export const handlers = [
  http.post('/profile', async () => {
    await delay(3000);
    return HttpResponse.json({ status: 200 });
  }),
];
