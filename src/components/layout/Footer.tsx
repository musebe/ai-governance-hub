/**
 * Global footer component.
 * Extracting static strings outside the function to avoid recreation on re-render.
 */
const FOOTER_TEXT = `© ${new Date().getFullYear()} Guardia AI. Powered by Cloudinary MediaFlows.`;

export default function Footer() {
  return (
    <footer className='border-t border-slate-800 py-12 bg-slate-950'>
      <div className='max-w-7xl mx-auto px-4 text-center'>
        <p className='text-slate-500 text-sm'>{FOOTER_TEXT}</p>
      </div>
    </footer>
  );
}
