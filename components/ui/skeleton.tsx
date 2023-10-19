import { cn } from "@/lib/utils";

type Skeleton = React.HTMLAttributes<HTMLElement>;

const Skeleton: React.FC<Skeleton> = ({ className, ...props }) => {
  return <div className={cn("animate-pulse rounded-md bg-neutral-200", className)} {...props} />;
};

export default Skeleton;
