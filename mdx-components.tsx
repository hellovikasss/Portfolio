import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white", className)}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "scroll-m-20 border-b border-white/10 pb-2 text-3xl font-semibold tracking-tight text-white first:mt-0",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight text-white", className)} {...props} />
    ),
    h4: ({ className, ...props }) => (
      <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight text-white", className)} {...props} />
    ),
    p: ({ className, ...props }) => (
      <p className={cn("leading-7 text-white/80 [&:not(:first-child)]:mt-6", className)} {...props} />
    ),
    ul: ({ className, ...props }) => <ul className={cn("my-6 ml-6 list-disc text-white/80", className)} {...props} />,
    ol: ({ className, ...props }) => (
      <ol className={cn("my-6 ml-6 list-decimal text-white/80", className)} {...props} />
    ),
    li: ({ className, ...props }) => <li className={cn("mt-2", className)} {...props} />,
    blockquote: ({ className, ...props }) => (
      <blockquote className={cn("mt-6 border-l-2 border-white/20 pl-6 italic text-white/70", className)} {...props} />
    ),
    img: ({ className, alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={cn("rounded-md border border-white/10", className)} alt={alt} {...props} />
    ),
    hr: ({ ...props }) => <hr className="my-4 border-white/10 md:my-8" {...props} />,
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn("w-full border-collapse border border-white/10", className)} {...props} />
      </div>
    ),
    tr: ({ className, ...props }) => (
      <tr className={cn("m-0 border-t border-white/10 p-0 even:bg-white/5", className)} {...props} />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border border-white/10 px-4 py-2 text-left font-bold text-white [&[align=center]]:text-center [&[align=right]]:text-right",
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          "border border-white/10 px-4 py-2 text-left text-white/80 [&[align=center]]:text-center [&[align=right]]:text-right",
          className,
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn("mb-4 mt-6 overflow-x-auto rounded-lg border border-white/10 bg-black/50 py-4 px-6", className)}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn("relative rounded bg-white/10 py-[0.2rem] px-[0.3rem] font-mono text-sm text-white", className)}
        {...props}
      />
    ),
    ...components,
  }
}
