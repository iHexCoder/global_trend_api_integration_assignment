# GLOBAL TREND – API Integration Internship Assignment

## Overview
This is a Node.js application that:
- Fetches data from two public API endpoints
- Stores the data in a local cache file (cache.json)
- Provides CLI commands to list and filter data
- Shows detailed view of any item by ID
- Handles network errors, timeouts, invalid responses, and malformed fields

---

## Setup

### 1. Install Required Packages
```js
mkdir global_trend_api_integration_assignment
cd global_trend_api_integration_assignment
npm insall express axios
node app.js
```

### 2. Run Commands to Fetch and cache data
```js
Usage:
  node app.js fetch                  → Fetch & cache data
  node app.js list                   → List all posts
  node app.js list --user 1          → Filter posts by userId
  node app.js list --title lorem     → Filter posts by title keyword
  node app.js show 5                 → Show post details by ID
```

---

## API Endpoints Used
- `/posts`
- `/users`

From: https://jsonplaceholder.typicode.com/

---

## Filters Implemented
- `--user <id>` → Filter posts by userId  
- `--title <keyword>` → Filter posts by title substring

---

## Error Handling
Handles:
- Network failures
- Timeout errors
- Invalid responses
- Missing/malformed fields
- Cache file read/write errors

---

## Assumptions
- JSONPlaceholder data is static
- Cache file is stored locally as `cache.json`
- Display trimmed post listing for readability

