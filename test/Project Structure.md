# Project Structure
```bash
.
├── prisma
│   ├── migrations
│   │   ├── 20241226102956_add_product_model
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── src
│   ├── auth
│   │   └── jwt-auth.guard.ts
│   ├── merchants
│   │   ├── dto
│   │   │   ├── create-merchant.dto.ts
│   │   │   └── update-merchant.dto.ts
│   │   ├── merchants.controller.ts
│   │   ├── merchants.module.ts
│   │   └── merchants.service.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── products
│   │   ├── dto
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── users
│   │   ├── dto
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── jwt.strategy.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── uploads
│   └── products
│       └── example.jpg
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```