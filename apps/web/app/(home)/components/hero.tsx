import { blog } from '@repo/cms';
import { Feed } from '@repo/cms/components/feed';
import { Button } from '@repo/design-system/components/ui/button';
import { MoveRight, PhoneCall } from 'lucide-react';
import { draftMode } from 'next/headers';
import Link from 'next/link';

export const Hero = async () => {
  const draft = await draftMode();

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div>
            <Feed queries={[blog.postsQuery]} draft={draft.isEnabled}>
              {/* biome-ignore lint/suspicious/useAwait: "Server Actions must be async" */}
              {async ([data]) => {
                'use server';

                const latestPost = data.blog.posts.items[0];
                if (!latestPost) return null;

                return (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-4"
                    asChild
                  >
                    <Link href={`/blog/${latestPost._slug}`}>
                      Read our latest article <MoveRight className="h-4 w-4" />
                    </Link>
                  </Button>
                );
              }}
            </Feed>
          </div>

          <h1 className="text-balance text-center text-4xl font-bold tracking-tight lg:text-6xl">
            Discover the'Future of font-bold '
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Startup Funding
            </span>
          </h1>

          <p className="text-balance text-center text-lg text-muted-foreground lg:text-xl">
            Streamline your startup&apos;s fundraising process with our
            comprehensive platform. Get started today and take control of your
            fundraising journey.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                <PhoneCall className="mr-2 h-4 w-4" />
                Schedule a Demo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
