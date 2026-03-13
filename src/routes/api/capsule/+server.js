import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
    try {
        const { 
            email, 
            title, 
            letter, 
            goals, 
            prayer, 
            delivery_date, 
            vision_image 
        } = await request.json();

        // Strict validation: Ensuring the core data exists
        if (!email || !delivery_date || !letter) {
            return json({ message: 'Missing required fields (email, date, or letter)' }, { status: 400 });
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('capsules')
            .insert([{
                email,
                title: title || "Untitled Capsule",
                letter,
                goals,
                prayer,
                delivery_date,
                vision_image,
                sent: false
            }]);

        if (error) {
            console.error('Supabase Error:', error.message);
            return json({ message: 'Database error. Please try again.' }, { status: 500 });
        }

        return json({ message: 'Capsule sealed successfully' }, { status: 201 });

    } catch (err) {
        return json({ message: 'Internal server error' }, { status: 500 });
    }
}