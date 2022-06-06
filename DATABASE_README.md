# Database Instructions

## Migration Instruction

we are using [TypeORM](https://typeorm.io/migrations). It provide us with everything for migrations.

> Note: Before running migrations, you need to understand how it actually tracks the changes.
> Whenever you create a enitity, the command `npm run migration:generate` will generate a migration file, but does not tracks the changes in entity. To acquire changes and be ready for new changes to migration, we need to run `npm run migration:run` command (Because TypeORM is tracks the column and Table changes from database directly).

> Note: We are using [TypeORM-Seeding](https://www.npmjs.com/package/typeorm-seeding) to seed our database.

## Commands to run migration

```bash
# provide file name to generate migration
npm run migration:generate <file_name>

# provide file name to create migration file only
npm run migration:create

# To migrate the migrations to database
npm run migration:run

# To revert back the migration
npm run migration:revert
```
