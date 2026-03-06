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

export async function POST(request: Request) {
  try {
    const { email, locale } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 }
      );
    }

    await withRetry(() =>
      resend.contacts.create({
        email,
        unsubscribed: false,
      })
    );

    await wait(1000);

    await withRetry(() =>
      resend.emails.send({
        from: "Sophia Forge <noreply@sophiafoundry.com>",
        to: email,
        subject: "You're on the Sophia Forge waitlist",
        html: `
          <div style="font-family: sans-serif; color: #f5f5f7; background: #0a0a0f; padding: 2rem;">
            <h1 style="color: #12a066; font-size: 1.5rem;">Sophia Forge</h1>
            <p style="color: #a0a0b0; line-height: 1.8;">
              You're on the list. We'll notify you when Sophia Forge is ready for early access.
            </p>
            <p style="color: #606070; font-size: 0.875rem; margin-top: 2rem;">
              &mdash; Sophia Foundry
            </p>
          </div>
        `,
      })
    );

    await wait(1000);

    await withRetry(() =>
      resend.emails.send({
        from: "Sophia Forge <noreply@sophiafoundry.com>",
        to: "jessyka@sophiafoundry.com",
        subject: `New Sophia Forge waitlist signup: ${email}`,
        html: `
          <div style="font-family: sans-serif;">
            <p><strong>New waitlist signup</strong></p>
            <p>Email: ${email}</p>
            <p>Locale: ${locale || "unknown"}</p>
          </div>
        `,
      })
    );

    return NextResponse.json({ success: true, message: "You're on the list." });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
