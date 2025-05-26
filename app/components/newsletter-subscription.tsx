"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { subscribeToNewsletter } from "../actions";

export function NewsletterSubscription() {
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

            {message && (
              <p
                className={`text-sm ${isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
