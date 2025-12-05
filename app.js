// app.js
import axios from "axios";
import { writeFileSync, existsSync, readFileSync } from "fs";

// Cache storage file
const CACHE_FILE = "cache.json";

// Fetch data from two endpoints
async function fetchData() {
    try {
        const [posts, users] = await Promise.all([
            axios.get("https://jsonplaceholder.typicode.com/posts", { timeout: 5000 }),
            axios.get("https://jsonplaceholder.typicode.com/users", { timeout: 5000 }),
        ]);

        const data = { posts: posts.data, users: users.data };

        writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
        console.log("Data cached successfully.");
        return data;
    } catch (error) {
        handleError(error);
        return null;
    }
}

// Load cache file
function loadCache() {
    if (!existsSync(CACHE_FILE)) return null;
    try {
        return JSON.parse(readFileSync(CACHE_FILE));
    } catch (err) {
        console.error("Cache read error:", err.message);
        return null;
    }
}

// Get list with filtering
function listPosts(filter = {}) {
    const cache = loadCache();
    if (!cache) return console.log("No cached data found.");

    let posts = cache.posts;

    if (filter.userId) {
        posts = posts.filter(p => p.userId == filter.userId);
    }
    if (filter.title) {
        posts = posts.filter(p => p.title.includes(filter.title));
    }

    console.log("Filtered Posts:");
    console.log(posts.slice(0, 10)); // showing first 10 for readability
}

// Show item by ID
function showPost(id) {
    const cache = loadCache();
    if (!cache) return console.log("No cached data found.");

    const post = cache.posts.find(p => p.id == id);
    if (!post) {
        console.log("Post not found.");
        return;
    }

    console.log("Post Details:");
    console.log(post);
}

// Error handling
function handleError(err) {
    if (err.code === "ECONNABORTED") {
        console.error("Request timeout (took too long).");
    } else if (err.response) {
        console.error(`Invalid response (${err.response.status}).`);
    } else if (err.request) {
        console.error("Network failure: No response received.");
    } else {
        console.error("Error:", err.message);
    }
}

// CLI Interface
async function start() {
    const command = process.argv[2];
    const option = process.argv[3];
    const value = process.argv[4];

    switch (command) {
        case "fetch":
            await fetchData();
            break;

        case "list":
            const filter = {};
            if (option === "--user") filter.userId = value;
            if (option === "--title") filter.title = value;
            listPosts(filter);
            break;

        case "show":
            showPost(option);
            break;

        default:
            console.log(`
Usage:
  node app.js fetch                  → Fetch & cache data
  node app.js list                   → List all posts
  node app.js list --user 1          → Filter posts by userId
  node app.js list --title lorem     → Filter posts by title keyword
  node app.js show 5                 → Show post details by ID
            `);
    }
}

start();
