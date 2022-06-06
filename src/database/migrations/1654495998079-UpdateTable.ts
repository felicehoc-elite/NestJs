import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTable1654495998079 implements MigrationInterface {
    name = 'UpdateTable1654495998079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "token" text NOT NULL, "user_id" integer NOT NULL, "expire_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forgot_password_tokens" ("id" SERIAL NOT NULL, "token" text NOT NULL, "used" boolean NOT NULL DEFAULT false, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_95ad636b36a2b621f78427600a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."room_types_name_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TABLE "room_types" ("id" SERIAL NOT NULL, "name" "public"."room_types_name_enum" NOT NULL DEFAULT 'public', CONSTRAINT "UQ_20180102ff8f034e54c5812f695" UNIQUE ("name"), CONSTRAINT "PK_b6e1d0a9b67d4b9fbff9c35ab69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "thumbnails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "img_path" text NOT NULL, CONSTRAINT "UQ_926eba23b67d5d879b85f57b62b" UNIQUE ("img_path"), CONSTRAINT "PK_306432757731ef0ffcee65c995c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_rooms" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "room_id" integer, "user_id" integer, CONSTRAINT "PK_395639253b97b5f75a0586c627d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."rules_type_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TABLE "rules" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "type" "public"."rules_type_enum" NOT NULL DEFAULT 'public', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "founder" integer, CONSTRAINT "UQ_f1cd852bca01e39336647dee759" UNIQUE ("title"), CONSTRAINT "PK_10fef696a7d61140361b1b23608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "admin_id" integer, "roomType_id" integer, "thumbnail_id" uuid, CONSTRAINT "UQ_48b79438f8707f3d9ca83d85ea0" UNIQUE ("name"), CONSTRAINT "REL_3e2782b1e18a2553e7a9c17fd3" UNIQUE ("thumbnail_id"), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('level1', 'level2', 'level3', 'level4')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" "public"."roles_name_enum" NOT NULL DEFAULT 'level1', CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages_likes" ("id" SERIAL NOT NULL, "likes" boolean NOT NULL, "message_id" uuid, "user_id" integer, CONSTRAINT "PK_ada13ca35a70302634cdab58da1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "email_verified" boolean NOT NULL DEFAULT false, "phone_verified" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT false, "password" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "role_id" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "from_user_id" integer, "to_user_id" integer, "room_id" integer, CONSTRAINT "REL_a659ce2caa1c25f0d9161d0aaa" UNIQUE ("to_user_id"), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" text, "msg_id" uuid, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "room_type_id" integer NOT NULL, "create_permission" boolean NOT NULL, "reflection" boolean NOT NULL, "access_for_anybody" boolean NOT NULL, "invitation_permission" boolean NOT NULL, "request_permission" boolean NOT NULL, "admin" boolean NOT NULL, "admin_limited" boolean NOT NULL, CONSTRAINT "UQ_b4b42b287d62b27a8c219e4ba52" UNIQUE ("room_type_id"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms_categories_categories" ("roomsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_c670fb69f1405afaee5e914a91b" PRIMARY KEY ("roomsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1df30623d16bddcdb1984ef365" ON "rooms_categories_categories" ("roomsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c3630e5e54b147470d0b589cf3" ON "rooms_categories_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE TABLE "rooms_rules_rules" ("roomsId" integer NOT NULL, "rulesId" integer NOT NULL, CONSTRAINT "PK_68107a17fae4a1cfbe71ad7a277" PRIMARY KEY ("roomsId", "rulesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1eded038460e41f62edbc44cb" ON "rooms_rules_rules" ("roomsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_50f79771d0919408aa7504db59" ON "rooms_rules_rules" ("rulesId") `);
        await queryRunner.query(`CREATE TABLE "messages_comment_users" ("messagesId" uuid NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_56ac59839e6601fb7a9a8faf7f1" PRIMARY KEY ("messagesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_626ee584cf33e3d0f93325c36f" ON "messages_comment_users" ("messagesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b29d724877fe3409fc9a3e8629" ON "messages_comment_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forgot_password_tokens" ADD CONSTRAINT "FK_779e5ebc693d8490cdf072f189a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_rooms" ADD CONSTRAINT "FK_374109141a9a2fb38d3601d787e" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_rooms" ADD CONSTRAINT "FK_9e18f21e78dc1f2d0e961a2de9f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rules" ADD CONSTRAINT "FK_097acc0248101e32e37b32fed0b" FOREIGN KEY ("founder") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_64a898e7f1032b25d31377ccc72" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_aacc81649a6d948259731171237" FOREIGN KEY ("roomType_id") REFERENCES "room_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_3e2782b1e18a2553e7a9c17fd37" FOREIGN KEY ("thumbnail_id") REFERENCES "thumbnails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages_likes" ADD CONSTRAINT "FK_57176c4c06c44976ebee10e14c0" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages_likes" ADD CONSTRAINT "FK_45e1967d1e38c22b33a3be144c9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4068260b3a12ab373f70adfcd84" FOREIGN KEY ("from_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_a659ce2caa1c25f0d9161d0aaaa" FOREIGN KEY ("to_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_1dda4fc8dbeeff2ee71f0088ba0" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_928fa5728d0dcd4f88ac16ac13b" FOREIGN KEY ("msg_id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms_categories_categories" ADD CONSTRAINT "FK_1df30623d16bddcdb1984ef365e" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms_categories_categories" ADD CONSTRAINT "FK_c3630e5e54b147470d0b589cf3a" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms_rules_rules" ADD CONSTRAINT "FK_c1eded038460e41f62edbc44cbe" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms_rules_rules" ADD CONSTRAINT "FK_50f79771d0919408aa7504db59d" FOREIGN KEY ("rulesId") REFERENCES "rules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "messages_comment_users" ADD CONSTRAINT "FK_626ee584cf33e3d0f93325c36fb" FOREIGN KEY ("messagesId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "messages_comment_users" ADD CONSTRAINT "FK_b29d724877fe3409fc9a3e86290" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages_comment_users" DROP CONSTRAINT "FK_b29d724877fe3409fc9a3e86290"`);
        await queryRunner.query(`ALTER TABLE "messages_comment_users" DROP CONSTRAINT "FK_626ee584cf33e3d0f93325c36fb"`);
        await queryRunner.query(`ALTER TABLE "rooms_rules_rules" DROP CONSTRAINT "FK_50f79771d0919408aa7504db59d"`);
        await queryRunner.query(`ALTER TABLE "rooms_rules_rules" DROP CONSTRAINT "FK_c1eded038460e41f62edbc44cbe"`);
        await queryRunner.query(`ALTER TABLE "rooms_categories_categories" DROP CONSTRAINT "FK_c3630e5e54b147470d0b589cf3a"`);
        await queryRunner.query(`ALTER TABLE "rooms_categories_categories" DROP CONSTRAINT "FK_1df30623d16bddcdb1984ef365e"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_928fa5728d0dcd4f88ac16ac13b"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_1dda4fc8dbeeff2ee71f0088ba0"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_a659ce2caa1c25f0d9161d0aaaa"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4068260b3a12ab373f70adfcd84"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "messages_likes" DROP CONSTRAINT "FK_45e1967d1e38c22b33a3be144c9"`);
        await queryRunner.query(`ALTER TABLE "messages_likes" DROP CONSTRAINT "FK_57176c4c06c44976ebee10e14c0"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_3e2782b1e18a2553e7a9c17fd37"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_aacc81649a6d948259731171237"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_64a898e7f1032b25d31377ccc72"`);
        await queryRunner.query(`ALTER TABLE "rules" DROP CONSTRAINT "FK_097acc0248101e32e37b32fed0b"`);
        await queryRunner.query(`ALTER TABLE "users_rooms" DROP CONSTRAINT "FK_9e18f21e78dc1f2d0e961a2de9f"`);
        await queryRunner.query(`ALTER TABLE "users_rooms" DROP CONSTRAINT "FK_374109141a9a2fb38d3601d787e"`);
        await queryRunner.query(`ALTER TABLE "forgot_password_tokens" DROP CONSTRAINT "FK_779e5ebc693d8490cdf072f189a"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b29d724877fe3409fc9a3e8629"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_626ee584cf33e3d0f93325c36f"`);
        await queryRunner.query(`DROP TABLE "messages_comment_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_50f79771d0919408aa7504db59"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1eded038460e41f62edbc44cb"`);
        await queryRunner.query(`DROP TABLE "rooms_rules_rules"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3630e5e54b147470d0b589cf3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1df30623d16bddcdb1984ef365"`);
        await queryRunner.query(`DROP TABLE "rooms_categories_categories"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "messages_likes"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "rules"`);
        await queryRunner.query(`DROP TYPE "public"."rules_type_enum"`);
        await queryRunner.query(`DROP TABLE "users_rooms"`);
        await queryRunner.query(`DROP TABLE "thumbnails"`);
        await queryRunner.query(`DROP TABLE "room_types"`);
        await queryRunner.query(`DROP TYPE "public"."room_types_name_enum"`);
        await queryRunner.query(`DROP TABLE "forgot_password_tokens"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
