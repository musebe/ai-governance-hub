/**
 * Represents a Cloudinary asset audited by the AI Governance Agent.
 * @property {string} public_id - The unique identifier for the asset.
 * @property {string} secure_url - The HTTPS URL for the asset.
 * @property {string} created_at - ISO timestamp of upload.
 * @property {string[]} tags - Cloudinary tags (e.g., status_approved).
 */
export interface GovernedAsset {
    public_id: string;
    secure_url: string;
    created_at: string;
    tags: string[];
}