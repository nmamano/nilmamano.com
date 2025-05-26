"use client";

import { useState, useTransition } from "react";
import { submitContactForm, type ContactFormData } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    fieldErrors?: Record<string, string[] | undefined>;
  } | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    startTransition(async () => {
      const response = await submitContactForm(formData);
      setResult(response);

      if (response.success) {
        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      }
    });
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific errors when user starts typing
    if (result?.fieldErrors?.[field]) {
      setResult((prev) =>
        prev
          ? {
              ...prev,
              fieldErrors: prev.fieldErrors
                ? {
                    ...prev.fieldErrors,
                    [field]: undefined,
                  }
                : undefined,
            }
          : null
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Get in touch</CardTitle>
        <CardDescription>
          If you need an expert in DS&A or coding interviews, I may be able to
          help! Currently open to interesting projects after writing{" "}
          <em>Beyond Cracking the Coding Interview.</em>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Your first name"
                disabled={isPending}
                className={
                  result?.fieldErrors?.firstName ? "border-red-500" : ""
                }
              />
              {result?.fieldErrors?.firstName && (
                <p className="text-sm text-red-500">
                  {result.fieldErrors.firstName?.[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Your last name"
                disabled={isPending}
                className={
                  result?.fieldErrors?.lastName ? "border-red-500" : ""
                }
              />
              {result?.fieldErrors?.lastName && (
                <p className="text-sm text-red-500">
                  {result.fieldErrors.lastName?.[0]}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@example.com"
              disabled={isPending}
              className={result?.fieldErrors?.email ? "border-red-500" : ""}
            />
            {result?.fieldErrors?.email && (
              <p className="text-sm text-red-500">
                {result.fieldErrors.email?.[0]}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell me about your project or how I can help..."
              rows={5}
              disabled={isPending}
              className={result?.fieldErrors?.message ? "border-red-500" : ""}
            />
            {result?.fieldErrors?.message && (
              <p className="text-sm text-red-500">
                {result.fieldErrors.message?.[0]}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>

          {/* Result Messages */}
          {result && (
            <Alert
              className={
                result.success
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }
            >
              {result.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription
                className={result.success ? "text-green-800" : "text-red-800"}
              >
                {result.success ? result.message : result.error}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
