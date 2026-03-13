import { supabase } from "$lib/supabase";
import { sendCapsuleEmail } from "$lib/email";

export async function GET({ url }) {
  // 1. Authorization check (Optional: ensures only Vercel Crons can trigger this)
  const authHeader = url.searchParams.get('auth');
  // if (authHeader !== process.env.CRON_SECRET) return new Response('Unauthorized', { status: 401 });

  // 2. Get today's date in YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // 3. Fetch unsent capsules for today
  const { data: capsules, error: fetchError } = await supabase
    .from("capsules")
    .select("*")
    .eq("delivery_date", today)
    .eq("sent", false);

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), { status: 500 });
  }

  if (!capsules || capsules.length === 0) {
    return new Response(JSON.stringify({ 
      success: true, 
      message: `Queue empty for ${today}` 
    }));
  }

  const results = { total: capsules.length, sent: 0, failed: 0 };

  // 4. Send emails
  await Promise.allSettled(
    capsules.map(async (capsule) => {
      try {
        const emailResult = await sendCapsuleEmail(capsule);
        
        if (emailResult.success) {
          const { error: updateError } = await supabase
            .from("capsules")
            .update({ 
              sent: true, 
              delivered_at: new Date().toISOString() 
            })
            .eq("id", capsule.id);
          
          if (updateError) throw updateError;
          results.sent++;
        } else {
          throw new Error(emailResult.error);
        }
      } catch (err) {
        console.error(`Error with capsule ${capsule.id}:`, err.message);
        results.failed++;
      }
    })
  );

  return new Response(JSON.stringify({
    success: true,
    summary: results
  }));
}