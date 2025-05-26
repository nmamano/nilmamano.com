"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form validation schema
const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter subscription validation schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(data);

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL!, // Your email
      subject: `Contact Form: Message from ${validatedData.firstName} ${validatedData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555;">Message:</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #007cba;">
              ${validatedData.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: "Failed to send message. Please try again.",
      };
    }

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Please check your form data and try again.",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function subscribeToNewsletter(data: NewsletterData) {
  try {
    // Validate the email
    const validatedData = newsletterSchema.parse(data);

    // Add subscriber to Sender via API
    const response = await fetch("https://api.sender.net/v2/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDER_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: validatedData.email,
        // Add to groups if SENDER_GROUP_ID is provided, otherwise just add to general list
        ...(process.env.SENDER_GROUP_ID && {
          groups: [process.env.SENDER_GROUP_ID],
        }),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Sender API error:", response.status, errorData);

      // Handle specific error cases
      if (
        response.status === 409 ||
        errorData.message?.includes("already exists")
      ) {
        return {
          success: false,
          error: "You're already subscribed to the newsletter!",
        };
      }

      return {
        success: false,
        error: "Failed to subscribe. Please try again later.",
      };
    }

    const result = await response.json();
    console.log("Successfully subscribed:", result);

    return {
      success: true,
      message:
        "Successfully subscribed! You'll hear from me when I publish new content.",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
