-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "issueId" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "comments" INTEGER NOT NULL,
    "labels" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_issueId_key" ON "Bookmark"("userId", "issueId");
