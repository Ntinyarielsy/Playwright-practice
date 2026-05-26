import { test, expect } from '@playwright/test';

const API_BASE = 'https://conduit-api.bondaracademy.com/api';
const UI_BASE = 'https://conduit.bondaracademy.com';


test('GET productsList - asserts status 200 and response body shape', async ({ request }) => {
    const response = await request.get(`${API_BASE}/articles?limit=10&offset=0`);
    expect(response.status()).toBe(200);

});

test('Hybrid: favorite first article via API, verify in UI profile', async ({ page, request }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    if (!email || !password) {
        throw new Error('Missing TEST_USER_EMAIL / TEST_USER_PASSWORD — set them in .env');
    }
    const credentials = { email, password };

    // --- API: log in to get auth token ---
    const loginResp = await request.post(`${API_BASE}/users/login`, {
        data: { user: credentials },
    });
    const { user } = await loginResp.json();
    const token: string = user.token;
    const username: string = user.username;

    // --- API: fetch the first article ---
    const articlesResp = await request.get(`${API_BASE}/articles?limit=10&offset=0`);
    expect(articlesResp.status()).toBe(200);
    const { articles } = await articlesResp.json();
    expect(articles.length).toBeGreaterThan(0);
    const firstArticle = articles[0];

    // --- API: favorite that article ---
    const favoriteResp = await request.post(
        `${API_BASE}/articles/${firstArticle.slug}/favorite`,
        { headers: { Authorization: `Token ${token}` } },
    );
    expect(favoriteResp.status()).toBe(200);
    const favoriteBody = await favoriteResp.json();
    expect(favoriteBody.article.favorited).toBe(true);

    // --- UI: log in, open profile, switch to "Favorited Articles" ---
    await page.goto(`${UI_BASE}/login`);
    await page.getByRole('textbox', { name: 'Email' }).fill(credentials.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.locator('.nav-link', { hasText: username }).click();
    await page.getByRole('link', { name: 'Favorited Posts' }).click();

    // --- UI: assert the favorited article shows up ---
    await expect(page.getByRole('heading', { name: firstArticle.title })).toBeVisible();
});