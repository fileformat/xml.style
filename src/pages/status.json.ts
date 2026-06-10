import type { APIRoute } from "astro";
import { execSync } from 'node:child_process';

const getCommit = () => {
	let retVal = "null";
  try {
    retVal = execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return retVal;
  }

  try {
	const isDirty = execSync('git diff --quiet || echo "dirty"').toString().trim();
	if (isDirty === "dirty") {
		retVal = `${retVal}-dirty`;
	}
  } catch {
	return `${retVal}-error`;
  }
  return retVal;
};

export const GET: APIRoute = async (context) => {
  const payload = {
    success: true,
    message: "OK",
    commit: process.env.GITHUB_SHA?.slice(0, 7) ?? process.env.WORKERS_CI_COMMIT_SHA?.slice(0, 7) ?? getCommit(),
    lastmod: new Date().toISOString(),
    tech: context.generator,
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};