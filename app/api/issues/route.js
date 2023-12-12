import { Octokit } from "octokit";
import fs from "fs";
import path from "path";
import { Novu } from "@novu/node";
import { NextResponse } from "next/server";
const novu = new Novu(process.env.NOVU_TOKEN);

export async function GET(req) {
      const send  = req.query;
      const q = "is:open is:issue label:good-first-issue";
      const octokit = new Octokit();

      const response = await octokit.request("GET /search/issues", {
        q,
      });

      const results = response.data.items.map((item) => ({
        name: item.title,
        author: item.user.login,
        labels: item.labels.map((label) => label.name),
        url: item.html_url,
      }));
      const random = Math.floor(Math.random() * (results.length + 1));
      const issue = results[random];

      if (true) {
        const files = fs.readdirSync(path.resolve("data"));
        const users = files.map((file) => ({
          ...JSON.parse(fs.readFileSync(path.resolve("data", file), "utf8")),
          file,
        }));

        users.forEach((user) => {
          console.log(user.email)
          novu.trigger("digest-workflow-example", {
            to: {
              subscriberId:"6575c1d62c7e267bc3978fb1",
              email: user.email,
            },
            payload: {
              name: user.name,
              title: issue.name,
              author: issue.author,
              labels: issue.labels.join(", "),
              url: issue.url,
            }
          });
        });
      }
    // const issue={
    //     name: "hello",
    //     title: "hello",
    //     author: "hello",
    //     labels: "good-first-issue",
    //     url: "..."
    // }
    return NextResponse.json(issue, { status: 200 })
}