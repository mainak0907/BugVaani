// app/api/getRandomIssue/route.js

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { MongoClient } from 'mongodb';
import { Octokit } from 'octokit';
import { NextResponse } from 'next/server';
import { Novu } from '@novu/node';

// ✅ Environment variable checks
if (!process.env.MONGODB_URI || !process.env.NOVU_TOKEN || !process.env.GITHUB_TOKEN) {
  throw new Error("Missing one or more required environment variables.");
}

const novu = new Novu(process.env.NOVU_TOKEN);

export async function GET(req) {
  try {
    // ✅ Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection('subscribers');

    // ✅ Retrieve all users
    const users = await collection.find({}).toArray();
    await client.close();

    // ✅ Use authenticated GitHub client to avoid rate limits
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const q = 'is:open is:issue label:good-first-issue';
    const response = await octokit.request('GET /search/issues', { q });

    const results = response.data.items.map((item) => ({
      name: item.title,
      author: item.user.login,
      labels: item.labels.map((label) => label.name),
      url: item.html_url,
    }));

    if (results.length === 0) {
      return NextResponse.json({ error: "No issues found" }, { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * results.length);
    const issue = results[randomIndex];

    // ✅ Send notification to each subscriber
    for (const user of users) {
      await novu.trigger('digest-workflow-example', {
        to: {
          subscriberId: user._id.toString(),
          email: user.email,
        },
        payload: {
          name: user.name || 'Developer',
          title: issue.name,
          author: issue.author,
          labels: issue.labels.join(', '),
          url: issue.url,
        },
      });
    }

    return NextResponse.json(issue, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
