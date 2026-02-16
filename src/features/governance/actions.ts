"use server";

import cloudinary from '@/lib/cloudinary';
import { GovernedAsset } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import { revalidatePath } from 'next/cache';

/**
 * Action: Fetches assets with forced cache bypass for production.
 * Rule 2.2: Ensures the "Agentic" loop doesn't serve stale data in Vercel.
 */
export async function fetchGovernedAssets(): Promise<GovernedAsset[]> {
    // Rule 2.2: Force dynamic rendering to bypass aggressive Vercel Edge Caching
    noStore();

    try {
        const response = await cloudinary.search
            .expression('folder:governance_lab')
            .with_field('tags')
            .with_field('context')
            .sort_by('created_at', 'desc')
            .execute();

        /**
         * Rule 26: Purge the path cache.
         * This ensures that every time this action is called by your 
         * auto-polling gallery, it retrieves fresh results from Cloudinary.
         */
        revalidatePath('/');

        return response.resources as GovernedAsset[];
    } catch {
        // Rule 82: Graceful degradation (removed unused _err to fix ESLint)
        return [];
    }
}