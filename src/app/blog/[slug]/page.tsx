'use client'
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPostPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
        <Button onClick={() => router.push('/blog')}>
          Return to Blog
        </Button>
      </div>
    );
  }
  
  return (
    <>
      {/* Header Section */}
      <div className="bg-preventify-light-gray py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-preventify-green hover:underline mb-4 inline-flex items-center transition-colors">
            ← Back to all articles
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-preventify-blue leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center mt-4 text-preventify-gray font-medium">
            <Calendar className="h-5 w-5 mr-2 text-preventify-green" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
      
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* UPDATED IMAGE STYLING */}
          {/* Constrained height, object-cover to prevent stretch, shadow for depth */}
          <div className="w-full relative mb-10 group">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full max-h-[450px] object-cover rounded-xl "
            />
          </div>
          
          {/* Blog Content */}
          {/* We added 'custom-prose' class to help target the accordion styles specifically */}
          <div className="prose prose-lg max-w-none custom-prose text-gray-700 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Categories Footer */}
          <div className="mt-12 pt-8 border-t border-preventify-light-gray">
            <h3 className="text-xl font-bold mb-4 text-preventify-blue">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {post.categories.map(category => (
                <Link 
                  key={category} 
                  href={`/blog?category=${category}`}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-preventify-green hover:text-white transition-all duration-200 text-sm font-medium"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;