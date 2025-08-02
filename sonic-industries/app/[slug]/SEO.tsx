"use client";

import Head from "next/head";

type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
  children?: React.ReactNode;
};

const SEO = ({ title, description, canonical, children }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {children}
    </Head>
  );
};

export default SEO;
