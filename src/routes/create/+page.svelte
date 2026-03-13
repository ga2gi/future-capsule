<script>
  import { supabase } from "$lib/supabase";
  import { fade, fly } from 'svelte/transition';

  let email = "";
  let title = "";
  let letter = "";
  let goals = "";
  let prayer = "";
  let delivery_date = "";
  let imageFile = null;
  
  let isLoading = false;
  let errorMessage = "";

  // Get today's date in YYYY-MM-DD format to prevent past-date selection
  const today = new Date().toISOString().split('T')[0];

  async function uploadImage() {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `capsules/${fileName}`;

    const { data, error } = await supabase.storage
      .from("visionboards")
      .upload(filePath, imageFile);

    if (error) throw new Error("Image upload failed: " + error.message);

    const { data: { publicUrl } } = supabase
      .storage
      .from("visionboards")
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async function submitCapsule() {
    if (!email || !delivery_date || !letter) {
      errorMessage = "The letter, delivery date, and your email are essential.";
      return;
    }

    isLoading = true;
    errorMessage = "";

    try {
      const imageUrl = await uploadImage();

      const res = await fetch("/api/capsule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          title: title || "Untitled Capsule",
          letter,
          goals,
          prayer,
          delivery_date,
          vision_image: imageUrl
        })
      });

      if (res.ok) {
        window.location.href = "/success";
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to seal capsule.");
      }
    } catch (err) {
      console.error(err);
      errorMessage = err.message || "An unexpected error occurred.";
    } finally {
      isLoading = false;
    }
  }
</script>

<main in:fly={{ y: 20, duration: 800 }}>
  <header>
    <h1>Future Capsule</h1>
    <p>A message to the person you are becoming.</p>
  </header>

  <div class="envelope-content">
    <div class="stamp">POSTAGE<br>PAID</div>

    <div class="input-group">
      <label for="email">To (Your Email)</label>
      <input id="email" type="email" placeholder="email@example.com" bind:value={email} required />
    </div>

    <div class="input-group">
      <label for="title">Subject/Title</label>
      <input id="title" type="text" placeholder="e.g., Reflections at 25" bind:value={title} />
    </div>

    <div class="input-group">
      <label for="letter">Dear Future Me,</label>
      <textarea id="letter" rows="8" placeholder="Write your heart out..." bind:value={letter}></textarea>
    </div>

    <div class="grid-fields">
      <div class="input-group">
        <label for="goals">Ambitions & Goals</label>
        <textarea id="goals" rows="3" placeholder="What will you have achieved?" bind:value={goals}></textarea>
      </div>
      <div class="input-group">
        <label for="prayer">A Prayer or Wish</label>
        <textarea id="prayer" rows="3" placeholder="Your hopes for the future..." bind:value={prayer}></textarea>
      </div>
    </div>

    <div class="grid-fields">
      <div class="input-group">
        <label for="image">Attach a Vision (Image)</label>
        <input id="image" type="file" accept="image/*" class="file-input" on:change={(e) => imageFile = e.target.files[0]} />
      </div>
      <div class="input-group">
        <label for="date">Delivery Date</label>
        <input id="date" type="date" min={today} bind:value={delivery_date} required />
      </div>
    </div>

    {#if errorMessage}
      <div class="error" transition:fade>{errorMessage}</div>
    {/if}

    <button on:click={submitCapsule} disabled={isLoading}>
      {#if isLoading}
        Sealing the Vault...
      {:else}
        Seal Capsule
      {/if}
    </button>
  </div>
</main>

<style>
  main {
    max-width: 700px;
    margin: 40px auto;
    background: white;
    position: relative;
    padding: 60px 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    
    /* Airmail border effect */
    border: 12px solid transparent;
    border-image: repeating-linear-gradient(
      -45deg,
      #ef4444, #ef4444 20px,
      #ffffff 20px, #ffffff 40px,
      #3b82f6 40px, #3b82f6 60px,
      #ffffff 60px, #ffffff 80px
    ) 12;
  }

  header {
    text-align: center;
    margin-bottom: 40px;
  }

  h1 { 
    font-size: 2.2rem; 
    color: #0f172a; 
    margin-bottom: 8px; 
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  header p { color: #64748b; font-style: italic; }

  .stamp {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 70px;
    height: 85px;
    border: 2px dashed #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 10px;
    font-weight: 900;
    color: #94a3b8;
    transform: rotate(4deg);
    line-height: 1.2;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 24px;
  }

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #94a3b8;
    letter-spacing: 0.05em;
  }

  input:not(.file-input), textarea {
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid #e2e8f0;
    background: transparent;
    font-size: 1.1rem;
    font-family: inherit;
    transition: all 0.3s ease;
    border-radius: 0;
  }

  input:focus, textarea:focus {
    outline: none;
    border-bottom-color: #0f172a;
  }

  .file-input {
    font-size: 0.9rem;
    margin-top: 5px;
  }

  .grid-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .error {
    color: #b91c1c;
    background: #fef2f2;
    padding: 14px;
    border-radius: 8px;
    font-size: 0.95rem;
    text-align: center;
    margin-bottom: 20px;
    border: 1px solid #fee2e2;
  }

  button {
    background: #0f172a;
    color: white;
    padding: 18px;
    border: none;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
    margin-top: 20px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  button:hover:not(:disabled) {
    background: #334155;
    letter-spacing: 0.2em;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    main { padding: 40px 20px; margin: 10px; border-width: 8px; }
    .grid-fields { grid-template-columns: 1fr; gap: 0; }
    .stamp { display: none; } /* Hide stamp on mobile to save space */
  }
</style>