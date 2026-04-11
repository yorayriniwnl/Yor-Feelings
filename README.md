# Echo

KIIT anonymous communication platform.

## Run
1. Copy `.env.example` to `.env`
2. Install dependencies
3. Run Prisma:
   - `npx prisma generate`
   - `npx prisma db push`
4. Start dev server:
   - `npm run dev`

## OTP Email Setup
- Set `RESEND_API_KEY` in `.env`.
- Set `RESEND_FROM` to a verified sender/domain in Resend (for example: `Echo <no-reply@yourdomain.com>`).
- If you do not use Resend, configure SMTP instead:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
   - `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
   - Example for Gmail SMTP: host `smtp.gmail.com`, port `587`, secure `false`.
- In development, if email is not configured, the API still generates an OTP and returns it as `devOtp`.
- In non-development environments, OTP request fails if email service is not configured.

## Features
- OTP login for KIIT email
- Anonymous onboarding
- Threads and messages
- Reactions and reports
- AI moderation and sentiment
- Socket.io realtime layer
- Campus pulse and mini game
