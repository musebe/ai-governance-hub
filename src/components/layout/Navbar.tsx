import { ShieldCheck, Github } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2 group'>
          <ShieldCheck className='text-blue-500 w-8 h-8 group-hover:scale-110 transition-transform' />
          <span className='text-white font-bold text-xl tracking-tight'>
            Guardia AI
          </span>
        </Link>

        <div className='flex items-center gap-6'>
          <a
            href='https://cloudinary.com/documentation/mediaflows_powerflows'
            target='_blank'
            rel='noreferrer'
            className='text-slate-400 hover:text-white text-sm transition-colors'
          >
            Documentation
          </a>

          <a
            href='https://github.com/musebe/ai-governance-hub'
            target='_blank'
            rel='noreferrer'
            className='p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-all'
          >
            <Github className='w-5 h-5 text-white' />
          </a>
        </div>
      </div>
    </nav>
  );
}
