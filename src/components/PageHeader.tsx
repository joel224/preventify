
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundClass?: string;
  size?: "default" | "large" | "small";
}

const PageHeader = ({
  title,
  subtitle,
  backgroundClass = "bg-preventify-light-gray",
  size = "default",
}: PageHeaderProps) => {
  const paddingClasses = {
    default: "py-12 md:py-20",
    large: "py-16 md:py-24",
    small: "py-8 md:py-12"
  };

  return (
    <div className={`${backgroundClass} ${paddingClasses[size]}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-preventify-blue">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-center max-w-3xl mx-auto text-preventify-dark-gray">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
