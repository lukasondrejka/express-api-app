# Configuration

Documentation for configuration options. The majority of essential configuration options are available through environment variables. The rest of the configuration options are available in [`configs`](app/src/configs) directory.

## Application

Configuration options for the application are available in [configs/app.config.ts](app/src/configs/app.config.ts).

### Port

Environment variable: `PORT`

Default: `8000`

### Environment

The environment the application is running in.

Environment variable: `NODE_ENV`

Default: `development`

Valid values: `development`, `production`

### Application name

The name of the application.

Environment variable: `APP_NAME`

Default: `app`

### Admin user email and password

The email address and password of the admin user. This user will be created if it does not exist. If at least one of the variables is not set, the admin user will not be created.

Environment variable: `ADMIN_EMAIL`

Environment variable: `ADMIN_PASSWORD`

### JWT key

The key used to sign JWT tokens.

Environment variable: `JWT_KEY`

### Require email verification

Require email verification for new users. If set to `true`, users will not be able to log in until they verify their email address.

Environment variable: `REQUIRE_VERIFICATION`

Default: `false`

Valid values: `true`, `false`

## Database

Configuration for postgres database connection. Other configuration options are available in [`configs/database.config.ts`](app/src/configs/database.config.ts).

### Host

Environment variable: `DB_HOST`

### Port

Environment variable: `DB_PORT`

### Username

Environment variable: `DB_USER`

### Password

Environment variable: `DB_PASSWORD`

### Name

Environment variable: `DB_NAME`

## Email

Configuration for email sending. Other configuration options are available in [configs/email.config.ts](app/src/configs/email.config.ts).

### Host

Environment variable: `EMAIL_HOST`

### Port

Environment variable: `EMAIL_PORT`

### Username

Environment variable: `EMAIL_USER`

### Password

Environment variable: `EMAIL_PASSWORD`

### Email sender address

Environment variable: `EMAIL_FROM`

## Logger

Configuration options for logging are available in [configs/logger.config.ts](app/src/configs/logger.config.ts).

## Security

Configuration options for security are available in [configs/security.config.ts](app/src/configs/security.config.ts).

## Translations

Configuration options for translations are available in [configs/translations.config.ts](app/src/configs/translations.config.ts).
