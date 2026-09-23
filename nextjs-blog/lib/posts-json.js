import fs from 'fs'; // Load Node's file system module so this file can read the JSON data file.
import path from 'path'; // Load Node's path module so the JSON file path works on any operating system.

const postsFilePath = path.join(process.cwd(), 'nextjs-blog', 'data', 'posts.json'); // Store the absolute path to nextjs-blog/data/posts.json.

function getPostsFromFile() { // Read posts.json and return the parsed array of post objects.
  const fileContents = fs.readFileSync(postsFilePath, 'utf8'); // Read the JSON file from disk as a UTF-8 string.
  return JSON.parse(fileContents); // Parse that string into an array and return it to the caller.
} // End the getPostsFromFile function.

export function getSortedPostsData() { // Return every post sorted with the newest date first.
  const allPostsData = getPostsFromFile(); // Load the full post list from the JSON file.
  return allPostsData.sort((a, b) => { // Sort the array so a later date comes before an earlier date.
    if (a.date < b.date) { // Check whether the first post is older than the second post.
      return 1; // Place the older post after the newer post.
    } else { // Handle a newer first post, or two posts that share the same date.
      return -1; // Keep the first post ahead of the second post.
    } // End the date comparison.
  }); // End the sort callback and return the sorted array.
} // End the getSortedPostsData function.

export function getAllPostIds() { // Build the dynamic route params Next.js needs for each post page.
  const allPostsData = getPostsFromFile(); // Load every post so each id can become a path.
  return allPostsData.map((post) => { // Turn each post into the params object getStaticPaths expects.
    return { // Return one path entry for this post.
      params: { // Nest the route parameters inside params for Next.js.
        id: post.id, // Use the post id as the value of the [id] route segment.
      }, // End the params object.
    }; // End the path entry.
  }); // End the map callback and return the path list.
} // End the getAllPostIds function.

export async function getPostData(id) { // Return one post, including contentHtml, for the requested id.
  const allPostsData = getPostsFromFile(); // Load every post from the JSON file.
  const post = allPostsData.find((entry) => { // Search the array for the post with this id.
    return entry.id === id; // Keep the entry whose id matches the route parameter.
  }); // End the find callback.
  if (!post) { // Guard against an id that is not present in the JSON file.
    throw new Error(`Post not found: ${id}`); // Stop the build with an error that names the missing id.
  } // End the missing-post guard.
  return post; // Return the matching post, which already includes contentHtml and topic.
} // End the getPostData function.
