"use server";

import cloudinary from '@/lib/cloudinary';
import { GovernedAsset } from './types';
import { cacheTag } from 'next/cache'; // Rule 26: Precise revalidation

export async function fetchGovernedAssets(): Promise<GovernedAsset[]> {
    'use cache';
    cacheTag('governance-list'); // Matches the tag in the webhook

    try {
        const response = await cloudinary.search
            .expression('folder:governance_lab')
            .with_field('tags')
            .with_field('context')
            .sort_by('created_at', 'desc')
            .execute();

        return response.resources as GovernedAsset[];
    } catch {
        return [];
    }
}