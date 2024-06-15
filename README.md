# A-Issue-A-Day
Made with Novu, Next JS 14, GitHub API,MongoDB

A Github good-first-issue finder that sends mail notifications about that issue and repo, so that you keep up your Open Source Journey.

<img width="958" alt="image" src="https://github.com/mainak0907/a-Issue-a-Day/assets/88925745/5dd513a9-4a55-4b38-a209-8f996af042f8">

                      +----------------+
                      | Start          |
                      +----------------+
                             |
                             v
                 +---------------------+
                 | Next.js Frontend    |
                 +---------------------+
                             |
                             v
        +----------------------------------+
        | Email Subscription Form Response |
        |   Stored in MongoDB              |
        +----------------------------------+
                             |
                             v
        +----------------------------------+
        | API Call via Cron Job Console    |
        |   (9 AM daily)                   |
        +----------------------------------+
                             |
                             v
      +-------------------------------------+
      | Trigger Novu Notification &         |
      | Receive Email                       |
      +-------------------------------------+
                             |
                             v
                      +----------------+
                      | End            |
                      +----------------+

    
<img width="293" alt="image" src="https://github.com/mainak0907/a-Issue-a-Day/assets/88925745/11325b20-72c9-41a3-8d61-4eb2c663177a">
