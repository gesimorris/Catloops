import { test, expect } from '@playwright/test'

// Testing user registration, login, and membership application

test('user can register', async ({ page }) => {
  await page.goto('http://localhost:5173/register')

  await page.fill('input[placeholder="First Name"]', 'John')
  await page.fill('input[placeholder="Last Name"]', 'Doe')
  await page.fill('input[placeholder="Email"]', 'JohnDoe@test.com')
  await page.fill('input[placeholder="Password"]', 'skiing123')
  await page.selectOption('select', 'student')

  await page.click('button:has-text("Create Account")')

  await expect(page).toHaveURL('http://localhost:5173/login')
})

test('user can login', async ({ page }) => {
  await page.goto('http://localhost:5173/login')

  await page.fill('input[placeholder="Email"]', 'JohnDoe@test.com')
  await page.fill('input[placeholder="Password"]', 'skiing123')

  await page.click('button:has-text("Login")')

  await expect(page).toHaveURL('http://localhost:5173/dashboard')
})

test('user can apply for membership', async ({ page }) => {
  await page.goto('http://localhost:5173/login')

  await page.fill('input[placeholder="Email"]', 'JohnDoe@test.com')
  await page.fill('input[placeholder="Password"]', 'skiing123')
  await page.click('button:has-text("Login")')

  await expect(page).toHaveURL('http://localhost:5173/dashboard')

  await page.selectOption('select', 'student')
  await page.click('button:has-text("Apply for Membership")')

  await expect(page.locator('text=pending')).toBeVisible()
})