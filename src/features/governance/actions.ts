"use server";

import cloudinary from '@/lib/cloudinary';
import { GovernedAsset } from './types';
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Action: Fetches assets with forced cache bypass for production.
 * Rule 2.2: Ensures the "Agentic" loop doesn't serve stale data in Vercel.
 */
export async function fetchGovernedAssets(): Promise<GovernedAsset[]> {
    noStore();

    try {
        const response = await cloudinary.search
            .expression('folder:governance_lab')
            .with_field('tags')
            .with_field('context')
            .sort_by('created_at', 'desc')
            .execute();

        return response.resources as GovernedAsset[];
    } catch (err) {
        // Rule 84: Log the specific error so we can see it in Vercel Logs
        console.error("Cloudinary Fetch Error:", err);
        return [];
    }
}