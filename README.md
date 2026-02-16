# AI Governance Lab: Real-Time Content Auditing with MediaFlows

This project demonstrates a production-grade **Agentic Content Governance** workflow. It bridges the gap between raw user uploads and AI-verified assets using **Next.js 16**, **Cloudinary MediaFlows**, and **Server Actions**.

---

## 🚀 Key Features

* **Real-Time AI Auditing**: Leverages a MediaFlows agent to automatically scan images for compliance, applying `status_approved` or `status_rejected` tags in the background.
* **High-Performance Search**: Transitions from eventually consistent Admin API calls to the **Cloudinary Search API** for sub-second indexing and gallery updates.
* **Auto-Polling Gallery**: A "No-Reload" experience that uses `useTransition` and `router.refresh()` to automatically detect when the AI agent has finished its work.
* **Next.js 16 Architecture**: Optimized with `use cache` (experimental), `noStore()`, and dynamic client-only wrappers to resolve hydration mismatches.

---

## 🛠 Tech Stack

| Feature | Technology |
| --- | --- |
| **Framework** | Next.js 16.1.6 (App Router + Turbopack) |
| **AI Processing** | Cloudinary MediaFlows (AI Vision Agent) |
| **Media Storage** | Cloudinary Assets |
| **Styling** | Tailwind CSS |
| **Components** | `next-cloudinary` (CldImage, CldUploadWidget) |

---

## 📂 Project Structure

Following the **Unified Coding Standard 2026**, this project uses a feature-grouped architecture to isolate domain logic from routing.

```text
src/
├── app/
│   └── page.tsx              # Main Server Component
├── features/
│   └── governance/           # Domain-specific logic
│       ├── actions.ts        # Server Actions (Search API)
│       ├── types.ts          # Strictly typed interfaces
│       ├── UploadCard.tsx    # Upload widget (non-SSR)
│       └── GovernanceGallery.tsx # Real-time polling gallery
└── lib/
    └── cloudinary.ts         # Singleton SDK configuration

```

---

## 🔧 Installation & Setup

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/ai-governance-hub.git
cd ai-governance-hub

```


2. **Install dependencies**:
```bash
npm install

```


3. **Configure Environment Variables**:
Create a `.env.local` file with your Cloudinary credentials:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```


4. **Run Development Server**:
```bash
npm run dev

```



---

## 🧠 Architectural Insights

### The "Ghost Folder" Solution

To prevent the app from crashing when the `governance_lab` folder is empty, the logic implements a graceful degradation pattern in the Server Action that returns an empty array `[]` instead of throwing a 404.

### Hydration Safety

The `CldUploadWidget` is imported using `next/dynamic` with `ssr: false` inside a Client Wrapper. This prevents the `Math.random()` error commonly found in Next.js 16 when third-party widgets generate non-deterministic IDs.

