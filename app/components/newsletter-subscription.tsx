"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { subscribeToNewsletter } from "../actions";
import { event } from "@/lib/analytics";

export function NewsletterSubscription({
  compact = false,
}: {
  /** Narrow sidebar form for the blog list page. */
  compact?: boolean;
} = {}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address");
      setIsSuccess(false);
      return;
    }

    startTransition(async () => {
      try {
        const result = await subscribeToNewsletter({ email: email.trim() });

        if (result.success) {
          // Track successful newsletter subscription
          event({
            action: "newsletter_subscribe",
            category: "engagement",
            label: "newsletter",
          });

          setMessage(result.message || "Successfully subscribed!");
          setIsSuccess(true);
          setEmail("");
        } else {
          setMessage(result.error || "Something went wrong. Please try again.");
          setIsSuccess(false);
        }
      } catch (error) {
        setMessage("Something went wrong. Please try again.");
        setIsSuccess(false);
      }
    });
  };

  const statusMessage = message && (
    <p
      className={`text-sm ${isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
    >
      {message}
    </p>
  );

  if (compact) {
    return (
      <div className="card-border rounded-lg p-4 bg-card text-card-foreground space-y-3">
        <div className="space-y-1">
          <h2 className="font-semibold">Stay in the loop</h2>
          <p className="text-sm text-muted-foreground">
            I&apos;d love to tell you when I publish a new post.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            required
          />
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Subscribing..." : "Subscribe"}
            </Button>
            <span className="text-xs text-muted-foreground">
              or follow via{" "}
              <Link
                href="/rss.xml"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                RSS
              </Link>
            </span>
          </div>
          {statusMessage}
        </form>
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto card-border">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Stay in the loop</h3>
            <p className="text text-muted-foreground">
              I'd love to tell you when I publish a new post.
            </p>
            <p className="text-sm text-muted-foreground">
              Get notified when I write about DS&A or software engineering.
              Unsubscribe anytime if it's not your vibe.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="flex-1"
                required
              />
              <Button
                type="submit"
                disabled={isPending}
                className="sm:w-auto w-full"
              >
                {isPending ? "Subscribing..." : "Subscribe now"}
              </Button>
            </div>

            {statusMessage}
          </form>
          <p className="text-sm text-muted-foreground">
            Prefer RSS? Subscribe via{" "}
            <Link
              href="/rss.xml"
              className="font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline"
            >
              <span role="img" aria-hidden="true">
                🟧
              </span>{" "}
              rss.xml
            </Link>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
