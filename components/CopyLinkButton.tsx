"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyLinkButtonProps {
  className?: string;
  slug?: string;
}

export default function CopyLinkButton({
  className,
  slug,
}: CopyLinkButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const urlToCopy = useMemo(() => {
    if (typeof window === "undefined") return "";
    if (slug) {
      const origin = window.location.origin;
      return `${origin}/blog/${slug}`;
    }
    return window.location.href;
  }, [slug]);

  const handleCopy = useCallback(async () => {
    if (!urlToCopy) return;

    const successToast = () => {
      setCopied(true);
      toast({
        title: "Link copied",
        description: "The post URL is now in your clipboard.",
      });
      setTimeout(() => setCopied(false), 900);
    };

    const fallbackCopy = (): boolean => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = urlToCopy;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.top = "-1000px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        return successful;
      } catch {
        return false;
      }
    };

    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(urlToCopy);
        successToast();
        return;
      }
    } catch {}

    const fallbackOk = fallbackCopy();
    if (fallbackOk) {
      successToast();
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url: urlToCopy });
        toast({ title: "Share", description: "Share sheet opened." });
        return;
      } catch {}
    }

    toast({
      title: "Copy unavailable",
      description: "Long‑press the button or address bar to copy the link.",
    });
  }, [toast, urlToCopy]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={cn(
        "transition-all duration-100 active:scale-95",
        // Make border more visible and background subtly different from page bg
        "border-2 border-primary/50 hover:border-primary/70 dark:border-primary/60 dark:hover:border-primary/80",
        // Light mode: subtle accent; Dark mode: explicitly lighter than page bg
        "bg-accent/40 hover:bg-accent/60 text-accent-foreground",
        "dark:bg-white/10 dark:hover:bg-white/15",
        // Brief ring flash when copied
        copied && "ring-2 ring-primary/50",
        className
      )}
      aria-label="Share post"
      title="Share post"
    >
      {copied ? (
        <Check className="mr-1 transition-transform duration-100" />
      ) : (
        <LinkIcon className="mr-1 transition-transform duration-100" />
      )}
      Share Post
    </Button>
  );
}
