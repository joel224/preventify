
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import BlogPostCard from "@/components/BlogPostCard";

const BlogPreviewSection = () => {
  // Get the latest 3 blog posts for the homepage
  const latestPosts = blogPosts.slice(0, 3);
  
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-preventify-blue">
            Latest Health Insights
          </h2>
          <p className="text-preventify-gray max-w-3xl mx-auto">
            Evidence-based articles to help you and your family live healthier lives.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog">
            <Button className="bg-preventify-blue hover:bg-preventify-dark-blue text-white">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
