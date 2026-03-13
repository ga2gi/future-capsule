<script>
  import { confetti } from '@neoconfetti/svelte';
  import { fly } from 'svelte/transition';
</script>

<section class="success">
  <div class="confetti-container">
    <div use:confetti={{ particleCount: 40, colors: ['#2563eb', '#6366f1', '#10b981'] }}></div>
  </div>

  <div class="card" in:fly={{ y: 20, duration: 600 }}>
    <div class="icon-circle">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>

    <h1>Capsule Sealed & Stored</h1>
    
    <p class="description">
      Your message has been safely vaulted. We’ve sent a confirmation to your email. 
      When the moment arrives, your past self will reach out to you once again.
    </p>

    <div class="next-steps">
      <div class="step">
        <span class="dot"></span>
        <p>Your capsule is encrypted and private</p>
      </div>
      <div class="step">
        <span class="dot"></span>
        <p>Delivery is scheduled via <strong>hello@futurecapsule.app</strong></p>
      </div>
    </div>

    <div class="button-group">
      <a href="/" class="btn-primary">Return Home</a>
      <a href="/create" class="btn-secondary">Write another one</a>
    </div>
  </div>
</section>

<style>
  .success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh; /* Increased slightly for better centering */
    padding: 20px;
    text-align: center;
  }

  .confetti-container {
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 10;
  }

  .card {
    background: white;
    padding: 60px 40px;
    border-radius: 32px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
    max-width: 500px;
    width: 100%;
  }

  .icon-circle {
    width: 80px;
    height: 80px;
    background: #ecfdf5;
    color: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin: 0 auto 30px;
  }

  h1 {
    font-size: 1.75rem;
    color: #111827;
    margin-bottom: 16px;
    font-weight: 800;
  }

  .description {
    color: #4b5563;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  .next-steps {
    background: #f9fafb;
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 40px;
    text-align: left;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #374151;
  }

  .step:last-child { margin-bottom: 0; }

  .dot {
    width: 6px;
    height: 6px;
    background: #2563eb;
    border-radius: 50%;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .btn-primary {
    background: #2563eb;
    color: white;
    padding: 16px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s;
  }

  .btn-secondary {
    background: transparent;
    color: #4b5563;
    padding: 12px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    background: #1d4ed8;
  }

  @media (max-width: 480px) {
    .card { padding: 40px 24px; }
  }
</style>