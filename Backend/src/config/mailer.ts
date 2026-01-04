import nodemailer from "nodemailer";
import { Resend } from "resend";

interface MailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendMail = async ({
  to,
  subject,
  html,
}: MailOptions): Promise<void> => {
  try {
    await resend.emails.send({
      from: "Sonic Industries <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("❌ Error sending email via Resend:", error);
    throw error;
  }
};
