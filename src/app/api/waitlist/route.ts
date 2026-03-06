import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  const delays = [600, 1200, 2400];
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === delays.length) throw error;
      await new Promise((r) => setTimeout(r, delays[attempt]));
    }
  }
  throw new Error("Unreachable");
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function sanitize(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const emailHtml = () => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0f;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0f;">
    <tr>
      <td align="center" style="padding:32px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:32px;background-color:#0f1f1a;border-radius:8px;">
              <h1 style="color:#12a066;font-family:sans-serif;font-size:24px;margin:0 0 16px 0;">Sophia Forge</h1>
              <p style="color:#a0a0b0;font-family:sans-serif;line-height:1.8;margin:0 0 32px 0;">
                You're on the list. We'll notify you when Sophia Forge is ready for early access.
              </p>
              <p style="color:#606070;font-family:sans-serif;font-size:14px;margin:0;">
                &mdash; Sophia Foundry
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const notificationHtml = (email: string, locale: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0f;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0f;">
    <tr>
      <td align="center" style="padding:32px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:32px;background-color:#0f1f1a;border-radius:8px;">
              <h1 style="color:#a84de0;font-family:sans-serif;font-size:24px;margin:0 0 16px 0;">New Waitlist Signup</h1>
              <p style="color:#a0a0b0;font-family:sans-serif;line-height:1.8;margin:0 0 8px 0;">
                <strong style="color:#f5f5f7;">Email:</strong> ${sanitize(email)}
              </p>
              <p style="color:#a0a0b0;font-family:sans-serif;line-height:1.8;margin:0;">
                <strong style="color:#f5f5f7;">Locale:</strong> ${sanitize(locale || "unknown")}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const { email, locale } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 }
      );
    }

    // Check if already on the list
    const existing = await resend.contacts.get({ email });
    if (existing.data) {
      return NextResponse.json({
        success: true,
        message: "You're already on the list.",
      });
    }

    // Return immediately, run the rest in background
    const response = NextResponse.json({
      success: true,
      message: "You're on the list.",
    });

    (async () => {
      await withRetry(() =>
        resend.emails.send({
          from: "Sophia Forge <noreply@sophiafoundry.com>",
          to: email,
          subject: "You're on the Sophia Forge waitlist",
          html: emailHtml(),
        })
      );
      await wait(1000);
      await withRetry(() =>
        resend.emails.send({
          from: "Sophia Forge <noreply@sophiafoundry.com>",
          to: "jessyka@sophiafoundry.com",
          subject: `New Sophia Forge waitlist signup: ${email}`,
          html: notificationHtml(email, locale),
        })
      );
      await wait(1000);
      await withRetry(() =>
        resend.contacts.create({
          email,
          unsubscribed: false,
        })
      );
    })().catch((err) => console.error("Background waitlist error:", err));

    return response;
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}