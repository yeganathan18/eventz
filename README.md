<div align="center">

<h1 align="center"><b>Eventz</b></h1>
<p align="center">
  A college event management system
  </p>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</div>

---

## Introduction

This is an event management system for colleges, now magically manage all your events in one place.

Check out the project [demo](https://drive.google.com/drive/folders/11A8xXl6z22Q8nHaOSsushtc03nerV15X?usp=share_link).

## Built with 

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase Auth](https://supabase.io/)

## Features

The features that are currently supported and implemented in the project at the moment.

### Supported

- [x] Roles: Admin and Participant
- [x] Authentication UIs including sign in and sign up
- [x] Profile page with read and update functionality
- [x] CRUD functionalities of events for Admin
- [x] Participant can register or unregister for events
- [x] Search filter of events
- [x] app is responsive and works on tablet and mobile
- [x] Event details page i.e `event/:id`
- [x] Each event has a fixed number of seats and participants can register for the event only if seats are available
- [x] Generate unique code for registeration
- [x] verify whether the unique code is not used before
- [x] Admin can now verify the unique code and mark the participant as verified


### In-progress

- [ ] Map integration for events ([partially done](./components/Map.tsx), need to add the map to the event details page and fix the bug)
- [ ] Event markers should be clustered together with details
- [ ] clean up the code and make it more readable


## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yeganathan18/eventz
```

Note: You need to have env variables set up for the project to work. You can find the env variables in the `.env.example` file.

Install dependencies:

```bash
yarn install
```

Run the development server:
```bash
yarn dev
```

To login as *admin*, use the credentials below (they are prepopulated into the db):
```bash
Email: yeganathan18@gmail.com
Password: password
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

[MIT](./LICENSE)
