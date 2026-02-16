"use server";

import cloudinary from '@/lib/cloudinary';
import { GovernedAsset } from './types';
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Action: Fetches audited assets using the high-performance Search API.
 * Rule 2.2: Bypasses cache to ensure polling detects MediaFlows updates.
 * @returns {Promise<GovernedAsset[]>}
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
    } catch {
        // Rule 82: Graceful degradation (removed unused error variable)
        return [];
    }
}