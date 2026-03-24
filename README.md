# 🚀 Chattri Waitlist API

A specialized backend service for the **Chattri** pre-launch phase. This service handles early-access signups, status management, and automated email updates.

---

## 🏗️ Architecture

The waitlist is a standalone module designed to isolate marketing traffic from the core social platform's resources.

- **Primary DB:** PostgreSQL
- **ORM:** Prisma
- **Mailing:** Nodemailer (Gmail SMTP)
- **Validation:** TypeScript