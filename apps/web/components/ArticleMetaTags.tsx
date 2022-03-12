import Head from 'next/head'

function ArticleHeadMetaTags({
  title,
  createdAt,
  updatedAt,
  siteUrl = 'https://jqwerty.com',
  author = '@HoomanOnEarth',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content={author} />
      <meta name="copyright" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="rating" content="general" />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={siteUrl} />

      <meta property="article:published_time" content={createdAt} />
      <meta property="article:modified_time" content={updatedAt} />
      <meta property="article:author" content={author} />
    </Head>
  )
}

export { ArticleHeadMetaTags }
