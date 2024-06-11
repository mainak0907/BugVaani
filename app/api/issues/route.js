// app/api/getRandomIssue/route.js
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { MongoClient } from 'mongodb';
import { Octokit } from 'octokit';
import { NextResponse } from 'next/server';
import { Novu } from '@novu/node';

const novu = new Novu(process.env.NOVU_TOKEN);

export async function GET(req) {
  try {
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db();
    const collection = db.collection('subscribers');

    // Retrieve all users from MongoDB
    const users = await collection.find({}).toArray();

    // Close MongoDB connection
    await client.close();

    // Retrieve a random issue from GitHub
    const octokit = new Octokit();
    const q = 'is:open is:issue label:good-first-issue';
    const response = await octokit.request('GET /search/issues', { q });
    const results = response.data.items.map((item) => ({
      name: item.title,
      author: item.user.login,
      labels: item.labels.map((label) => label.name),
      url: item.html_url,
    }));
    const randomIndex = Math.floor(Math.random() * results.length);
    const issue = results[randomIndex];

    // Send emails to all users
    for (const user of users) {
      novu.trigger('digest-workflow-example', {
        to: {
          subscriberId: user._id.toString(), // Convert ObjectId to string
          email: user.email, // Access the email field from the user document
        },
        payload: {
          name: user.name,
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
    return NextResponse.error(error);
  }
}
