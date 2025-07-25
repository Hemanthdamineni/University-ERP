File Purposes

├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Handles login logic and scraping
│   │   └── captchaController.js       # Handles Captcha fetching
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── captchaRoutes.js
│   ├── services/
│   │   └── playwrightService.js    # Headless browser logic (Playwright)
│   ├── utils/
│   │   └── sessionStore.js         # In-memory or Redis session handling (optional)
│   ├── app.js                      # Express app entry
│   └── server.js                   # Server startup