import { Resend } from "resend";
import { env } from '$env/dynamic/private'; // SvelteKit way to handle private env vars

// Use the environment variable set in Vercel/Local .env
const resend = new Resend(env.RESEND_API_KEY);

export async function sendCapsuleEmail(capsule) {
  try {
    // 1. Data Sanitization
    const recipientEmail = String(capsule.email || "").trim().toLowerCase();

    // 2. Validation
    if (!recipientEmail || !recipientEmail.includes('@')) {
      console.error("❌ Invalid email format:", recipientEmail);
      return { success: false, error: "Invalid email address format." };
    }

    // 3. Format Date for the Header
    const dateWritten = new Date(capsule.created_at).toLocaleDateString('en-KE', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    console.log(`📤 Delivering capsule: ${capsule.id} to ${recipientEmail}`);

    // 4. Resend API Call
    const { data, error } = await resend.emails.send({
      from: "FutureCapsule <hello@yourverifieddomain.com>", // Update this once domain is verified
      to: recipientEmail,
      subject: `📜 A message from your past self: ${capsule.title || "Untitled"}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              .body-wrapper { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8f5f0; padding: 40px 10px; }
              .envelope { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; position: relative; overflow: hidden; }
              .airmail-border { height: 10px; background: repeating-linear-gradient(-45deg, #ef4444, #ef4444 20px, #ffffff 20px, #ffffff 40px, #3b82f6 40px, #3b82f6 60px, #ffffff 60px, #ffffff 80px); }
              .content { padding: 40px; }
              .stamp { float: right; width: 60px; height: 80px; border: 2px dashed #cbd5e1; text-align: center; font-size: 10px; color: #94a3b8; padding-top: 10px; margin-left: 20px; transform: rotate(5deg); }
              .letter-body { font-size: 17px; line-height: 1.8; color: #334155; white-space: pre-wrap; margin: 30px 0; border-left: 2px solid #f1f5f9; padding-left: 20px; }
              .meta { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
              .goals-box { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .vision-img { width: 100%; border-radius: 8px; margin-top: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
              .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #9ca3af; padding: 20px; border-top: 1px solid #f1f5f9; }
            </style>
          </head>
          <body>
            <div class="body-wrapper">
              <div class="envelope">
                <div class="airmail-border"></div>
                <div class="content">
                  <div class="stamp">POSTAGE<br>PAID</div>
                  <p class="meta">Sent from the past • ${dateWritten}</p>
                  <h1 style="color: #0f172a; margin-top: 10px;">${capsule.title || "Dear Future Me,"}</h1>
                  
                  <div class="letter-body">${capsule.letter}</div>

                  ${capsule.goals ? `
                    <div class="goals-box">
                      <strong style="font-size: 13px; color: #64748b; text-transform: uppercase;">Your Goals:</strong>
                      <p style="margin-top: 10px; color: #1e293b;">${capsule.goals}</p>
                    </div>
                  ` : ""}

                  ${capsule.prayer ? `
                    <div style="font-style: italic; color: #475569; border-left: 3px solid #cbd5e1; padding-left: 15px; margin: 20px 0;">
                      "${capsule.prayer}"
                    </div>
                  ` : ""}

                  ${capsule.vision_image ? `
                    <div style="margin-top: 30px;">
                      <strong style="font-size: 13px; color: #64748b; text-transform: uppercase;">Vision Board:</strong>
                      <img src="${capsule.vision_image}" class="vision-img" alt="Vision Board">
                    </div>
                  ` : ""}

                  <div class="footer">
                    <p>© 2026 FutureCapsule • A gift for the person you are becoming.</p>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (error) {
      console.error("❌ Resend API Error:", JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }

    console.log("✅ Capsule successfully delivered to:", recipientEmail);
    return { success: true, data };

  } catch (err) {
    console.error("💥 Email System Failure:", err);
    return { success: false, error: err.message };
  }
}