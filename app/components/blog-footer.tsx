import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";

export default function BlogFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-300 dark:border-white/40">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium tracking-tighter">
            Nil Mamano
          </h2>
          <p className="text-muted-foreground">
            Computer scientist, software engineer, author.
          </p>
        </div>
        <div className="space-x-4">
          <Link href="https://linkedin.com/in/nilmamano/" target="_blank">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <FaLinkedin style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="https://x.com/Nil053" target="_blank">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <FaXTwitter style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">Twitter</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
} 