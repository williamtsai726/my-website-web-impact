import Container from "@/app/components/Container";
import { client } from "@/sanity/lib/client";
import BlogPostHeader from "./components/BlogPostHeader";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import { tryGetImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";

export default async function BlogPost({ params }) {
  const post = await getBlogPosts(params.post);

  return (
    <Container>
      <div className="mx-auto max-w-5xl space-y-8 py-8">
        <BlogPostHeader post={post} />
        <hr className="border-primary-200" />
        <article className="prose md:prose-md prose-primary mx-auto">
          <PortableText value={post.content} components={portableTextComponents} />
        </article>
      </div>
    </Container>
  );
}

async function getBlogPosts(slug) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    title,
    description,
    date,
    "slug":slug.current,
    image,
    "content": coalesce(content, [])
  }`;

  const posts = await client.fetch(query, { slug });
  if(!posts){
    return notFound();
  }
  return posts;
}

const portableTextComponents = {
  types: {
    image: ImageComponent,
  },
};

function ImageComponent({ value }) {
  const { width, height } = tryGetImageDimensions(value);

  return (
    <Image
      src={urlForImage(value)}
      width={width}
      height={height}
      loading="lazy"
      className="mx-auto md:max-w-prose rounded-lg"
      style={{
        aspectRatio: width / height,
      }}
    />
  );
}