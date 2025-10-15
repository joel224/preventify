
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/types/blog";
import { Calendar } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPost;
}
 
const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-[16/10] relative overflow-hidden bg-preventify-light-gray/20">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <CardContent className="p-5">
        <div className="flex items-center text-sm mb-2 text-preventify-green">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{post.date}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-display font-semibold text-xl text-preventify-blue mb-2 hover:text-preventify-green transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-preventify-dark-gray mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.categories.map(category => (
            <span 
              key={category}
              className="text-xs bg-preventify-light-gray text-preventify-dark-gray px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
