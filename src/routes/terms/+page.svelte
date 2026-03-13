<script>
  import { fly } from 'svelte/transition';
</script>

<div class="terms-container" in:fly={{ y: 20, duration: 600 }}>
  <header>
    <h1>Terms of Service</h1>
    <p>Last updated: March 2026</p>
  </header>

  <section class="content">
    <div class="term-block">
      <h2>1. The Service</h2>
      <p>
        Future Capsule provides a digital platform to store messages and images ("Capsules") 
        to be delivered to a recipient's email address at a specified future date.
      </p>
    </div>

    <div class="term-block">
      <h2>2. Privacy & Data</h2>
      <p>
        Your capsules are private. We do not sell your data. Images are stored securely 
        on Supabase Storage, and text is stored in our encrypted database. By using this 
        service, you grant us permission to store this data and send it to the email 
        address provided on the scheduled date.
      </p>
    </div>

    <div class="term-block">
      <h2>3. Delivery Policy</h2>
      <p>
        We rely on third-party providers (Resend and Vercel) for email delivery. While 
        we maintain a 99% success rate, we cannot be held liable for emails blocked by 
        recipient spam filters or incorrect email addresses provided at the time of creation.
      </p>
    </div>

    <div class="term-block">
      <h2>4. Payments</h2>
      <p>
        Access to the capsule creation tool is provided upon verification of manual 
        payment. All payments are final once the capsule has been "Sealed and Stored."
      </p>
    </div>

    <div class="term-block">
      <h2>5. Prohibited Content</h2>
      <p>
        Users may not use Future Capsule to store or send illegal content, harassment, 
        or malicious software. We reserve the right to delete content that violates 
        these standards.
      </p>
    </div>
  </section>

  <footer>
    <a href="/" class="btn-back">Back to Home</a>
  </footer>
</div>

<style>
  .terms-container {
    max-width: 800px;
    margin: 60px auto;
    padding: 0 20px;
    color: #374151;
    line-height: 1.6;
  }

  header {
    text-align: center;
    margin-bottom: 40px;
  }

  h1 {
    font-size: 2.5rem;
    color: #111827;
    margin-bottom: 10px;
  }

  header p {
    color: #9ca3af;
    font-size: 0.9rem;
  }

  .content {
    background: white;
    padding: 40px;
    border-radius: 24px;
    border: 1px solid #f3f4f6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  .term-block {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1.25rem;
    color: #111827;
    margin-bottom: 12px;
    font-weight: 700;
  }

  p {
    margin-bottom: 10px;
  }

  footer {
    margin-top: 40px;
    text-align: center;
  }

  .btn-back {
    display: inline-block;
    padding: 12px 24px;
    background: #f3f4f6;
    color: #4b5563;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
  }

  .btn-back:hover {
    background: #e5e7eb;
    color: #111827;
  }

  @media (max-width: 640px) {
    .content {
      padding: 24px;
    }
    h1 {
      font-size: 1.75rem;
    }
  }
</style>