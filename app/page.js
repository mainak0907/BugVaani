import Link from "next/link";
async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/issues`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
}
export default async function Home() {
  let data;
  try {
    data = await getData();
  } catch (error) {
    console.error(error);
    data = { name: "Error", author: "Unknown", labels: [], url: "#" };
  }
  return (
    <>
      <div className="mb-10">

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <h1 className="text-5xl font-bold">Github good-first-issues!</h1>
              <p className="py-6">From A-Issue-A-Day</p>
              <p className="py-6">SCROLL DOWN TO EXPLORE </p>
              <div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto my-4">

          <div className="border-b border-gray-200 dark:border-gray-700 mb-10">
            <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
              <li className="mr-2" role="presentation">
                <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">TITLE</button>
              </li>
              <li className="mr-2" role="presentation">
                <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">AUTHOR</button>
              </li>
              <li className="mr-2" role="presentation">
                <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">LABELS</button>
              </li>
              <li role="presentation">
                <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">LINK</button>
              </li>
            </ul>
          </div>
          <div id="myTabContent">
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <p className="text-gray-500 dark:text-gray-400 text-sm"> {data.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
              <p className="text-gray-500 dark:text-gray-400 text-sm">{data.author}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden" id="settings" role="tabpanel" aria-labelledby="settings-tab">
              <p className="text-gray-500 dark:text-gray-400 text-sm">{data.labels.join(", ")}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
              <p className="text-gray-500 dark:text-gray-400 text-sm"><Link href={data.url} className="hover:text-blue-700">{data.url}</Link></p>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-center align-middle mt-8">Powered by Open Source and Novu</footer>
    </>
  );
}