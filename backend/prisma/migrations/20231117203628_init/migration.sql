-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects " (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "creation_date " TIME(6) NOT NULL,
    "creator" INTEGER NOT NULL,

    CONSTRAINT "projects _pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "tread" INTEGER NOT NULL,
    "url" VARCHAR(511) NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tread" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER,
    "creator" INTEGER NOT NULL,
    "comment" VARCHAR(255) NOT NULL,
    "project" INTEGER NOT NULL DEFAULT 0,
    "state" INTEGER NOT NULL DEFAULT 1,
    "tag" VARCHAR(255),
    "executor" VARCHAR(255),
    "Title" VARCHAR(255),

    CONSTRAINT "Tread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "link" VARCHAR(255) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_link_link1_key" ON "Users"("link");

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects " ADD CONSTRAINT "projects _creator_fkey" FOREIGN KEY ("creator") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_tread_fkey" FOREIGN KEY ("tread") REFERENCES "Tread"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tread" ADD CONSTRAINT "Tread_creator_fkey" FOREIGN KEY ("creator") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tread" ADD CONSTRAINT "Tread_project_fkey" FOREIGN KEY ("project") REFERENCES "projects "("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tread" ADD CONSTRAINT "Tread_executor_fkey" FOREIGN KEY ("executor") REFERENCES "Users"("link") ON DELETE NO ACTION ON UPDATE NO ACTION;
