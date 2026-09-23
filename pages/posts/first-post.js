import Head from 'next/head'; // Import Head so this post can set a unique browser tab title.
import Layout from '../../components/layout'; // Import the shared layout used by pages that are not the home page.
import postStyles from '../../styles/FirstPost.module.css'; // Import custom CSS module classes that style this post.

const postTitle = 'First Post'; // Store the post heading in a variable used by Head and the page heading.
const publishedOn = 'September 9, 2026'; // Store the display date shown under the title.

export default function FirstPost() { // Export the FirstPost component as the default page for /posts/first-post.
  return (
    <Layout>
      <Head>
        <title>{postTitle}</title>
      </Head>
      <article className={postStyles.article}>
        <p className={postStyles.kicker}>Pages Router</p>
        <h1 className={postStyles.title}>{postTitle}</h1>
        <p className={postStyles.meta}>Published {publishedOn}</p>
        <div className={postStyles.body}>
          <p>
            This page lives at <code>pages/posts/first-post.js</code>, so Next.js
            maps it to the <code>/posts/first-post</code> route automatically.
          </p>
          <p>
            The homepage uses the Next.js <code>Link</code> component to open this
            post with client-side navigation instead of a full browser refresh.
          </p>
        </div>
        <p className={postStyles.quote}>
          File-based routing plus a shared layout is the core of this week&apos;s
          tutorial.
        </p>
      </article>
    </Layout>
  );
}
