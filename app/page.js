// app/page.js
"use client";
import { useEffect, useState } from 'react';
import EmailSubscriptionForm from './components/EmailSubscriptionForm';
import Link from 'next/link';

async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/issues`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
}

export default function Home() {
  const [clientData, setClientData] = useState({
    name: 'Loading...',
    author: 'Loading...',
    labels: [],
    url: '#',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setClientData(data);
      } catch (error) {
        console.error(error);
        setClientData({
          name: 'Error',
          author: 'Unknown',
          labels: [],
          url: '#',
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex-1">
        <div className="hero bg-base-200 flex flex-col justify-center items-center text-center py-10">
          <h1 className="text-5xl font-bold mb-4">Github good-first-issues!</h1>
          <p className="text-lg text-gray-600">From Mainak🖤</p>
          <p className="text-lg text-gray-600">SCROLL DOWN TO EXPLORE</p>
        </div>

        <EmailSubscriptionForm />

        <div className="max-w-2xl mx-auto my-8">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-10">
            <ul
              className="flex flex-wrap -mb-px justify-center"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist"
            >
              <li className="mr-8" role="presentation">
                <button
                  className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-lg font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  TITLE
                </button>
              </li>
              <li className="mr-8" role="presentation">
                <button
                  className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-lg font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="true"
                >
                  AUTHOR
                </button>
              </li>
              <li className="mr-8" role="presentation">
                <button
                  className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-lg font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                  id="settings-tab"
                  data-tabs-target="#settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false"
                >
                  LABELS
                </button>
              </li>
              <li role="presentation">
                <button
                  className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-lg font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                  id="contacts-tab"
                  data-tabs-target="#contacts"
                  type="button"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  LINK
                </button>
              </li>
            </ul>
          </div>
          <div id="myTabContent">
            <div
              className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                {clientData.name}
              </p>
            </div>
            <div
              className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800"
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                {clientData.author}
              </p>
            </div>
            <div
              className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden"
              id="settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                {clientData.labels.join(', ')}
              </p>
            </div>
            <div
              className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden"
              id="contacts"
              role="tabpanel"
              aria-labelledby="contacts-tab"
            >
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                <Link href={clientData.url} className="hover:text-blue-700">
                  {clientData.url}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 mt-8 py-8">
        Powered by Open Source and Novu
      </footer>
    </div>
  );
}
