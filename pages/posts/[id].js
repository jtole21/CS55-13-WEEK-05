import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../nextjs-blog/lib/posts-json';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import postStyles from '../../styles/FirstPost.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={postStyles.article}>
        <p className={postStyles.kicker}>{postData.topic}</p>
        <h1 className={postStyles.title}>{postData.title}</h1>
        <div className={`${utilStyles.lightText} ${postStyles.meta}`}>
          <Date dateString={postData.date} />
        </div>
        <div
          className={postStyles.body}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
