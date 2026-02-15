You are helping build a mobile app called **“Out Of”**, a Letterboxd-style media logging app.

The backend already exists and is production-ready. You must build a React Native Expo frontend that strictly consumes the API without changing backend contracts.

This is a mobile-first app with a monocolor dark theme and a clean Letterboxd-inspired UI.

---

## PRODUCT VISION

Users log movies and series like a personal diary.

The app is minimal, dark, elegant, and typography-driven.

This is NOT a social network yet — social features are future roadmap.

Current version is a personal media tracker with public profiles.

---

## CORE UX FLOW

App launch:

Login/Register → Profile screen

Profile is the main hub.

Navigation tabs (bottom or stack):

1. **Profile** — your stats + top media
2. **Diary** — all logged entries
3. **Search Members** — search users by username
4. **Entry Editor** — add/edit media

Later roadmap:

* friends feed
* trending
* social interactions

Ignore these for now.

---

## VISUAL STYLE

The entire app follows a **monocolor dark theme**:

* black / charcoal background
* white / gray typography
* accent color minimal (used sparingly)
* card-based UI
* strong spacing
* smooth scroll lists
* poster grid layout (future)
* no bright colors

Think: Letterboxd aesthetic, but cleaner and darker.

---

## TECH STACK

Frontend:

* React Native (Expo)
* TypeScript
* React Navigation
* Axios
* expo-secure-store
* reusable components
* modular architecture

Backend:

* Node.js
* Express
* MongoDB
* JWT authentication
* REST API

Do not modify backend assumptions.

---

## API BASE URL (development)

[http://10.0.2.2:3000](http://10.0.2.2:3000)

---

## AUTH MODEL

Login/register returns JWT token.

All protected requests require:

Authorization: Bearer <token>

Token stored securely and auto-attached.

---

## API ENDPOINTS

### Auth

POST /auth/login
POST /auth/register

---

### Entries

POST   /entries
GET    /entries
GET    /entries/:id
PUT    /entries/:id
DELETE /entries/:id

---

### Profile

GET /users/me/profile
GET /users/:username

---

## ENTRY MODEL

{
type: "movie" | "series",
title: string,
ratingOverall: 1–7,
remarks: optional,
dateLogged: date,
seasonWiseEnabled: boolean,
seasonRatings: optional
}

---

## REQUIRED SCREENS

* LoginScreen
* RegisterScreen
* ProfileScreen
* DiaryScreen
* SearchMembersScreen
* EntryEditorScreen
* EntryDetailScreen

---

## REQUIRED COMPONENTS

* EntryCard
* ProfileTopList
* DiaryList
* SeasonCard
* MemberCard

Components must be reusable and styled consistently.

---

## RULES

* Never hardcode mock data
* Always call API
* Handle loading states
* Handle error states
* Keep UI responsive
* Use dark theme consistently
* Prefer composition over duplication
* Avoid inline styling explosion — centralize theme

---

## FUTURE FEATURES (DO NOT IMPLEMENT YET)

* movie posters via scraping/TMDB
* infinite scroll
* friends feed
* trending
* social profiles
* deployment switching

---

Your job is to help build a scalable frontend step-by-step following this architecture and UI direction.
