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
      <div className="bg-preventify-light-gray py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-preventify-green hover:underline mb-4 inline-flex items-center">
            ← Back to all articles
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-preventify-blue">{post.title}</h1>
          <div className="flex items-center mt-4 text-preventify-gray">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
      
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto rounded-lg mb-8"
          />
          
          <div className="prose prose-lg max-w-none">
            {/* In a real implementation, you would render the content from a CMS or markdown */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <div className="mt-12 pt-8 border-t border-preventify-light-gray">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {post.categories.map(category => (
                <Link 
                  key={category} 
                  href={`/blog?category=${category}`}
                  className="bg-preventify-light-gray text-preventify-dark-gray px-3 py-1 rounded-full hover:bg-preventify-green hover:text-white transition-colors"
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
