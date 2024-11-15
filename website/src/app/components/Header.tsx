// import Link from 'next/link'
// import Image from 'next/image'
// import { NavLink } from '@/app/components/NavLink'

// export default function Header() {
//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/docs', label: 'Documentation' },
//     { href: '/whos_using', label: "Who's using" },
//     { href: 'https://explore.albumentations.ai', label: 'Explore', external: true },
//     { href: '/people', label: 'People' },
//   ]

//   return (
//     <header className="fixed top-0 w-full bg-white border-b z-50">
//       <div className="container mx-auto px-4">
//         <nav className="flex items-center justify-between h-16">
//           <Link href="/" className="flex items-center">
//             <Image
//               src="/assets/img/custom/albumentations_logo.png"
//               alt="Albumentations logo"
//               width={54}
//               height={54}
//               className="h-14 w-auto"
//             />
//             <span className="ml-4 text-gray-700 font-bold text-2xl">
//               Albumentations
//             </span>
//           </Link>

//           {/* Mobile menu button */}
//           <button className="md:hidden">
//             <span className="sr-only">Open menu</span>
//             {/* Add hamburger icon */}
//           </button>

//           {/* Navigation links */}
//           <div className="hidden md:flex items-center space-x-4">
//             {navLinks.map((link) => (
//               <NavLink key={link.href} {...link} />
//             ))}

//             {/* Action buttons */}
//             <a
//               href="https://github.com/sponsors/albumentations-team"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn-outline-success"
//             >
//               <i className="fa fa-heart" /> Sponsor
//             </a>
//             <a
//               href="https://github.com/albumentations-team/albumentations"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn-outline-primary"
//             >
//               <i className="fab fa-github" /> GitHub
//             </a>
//           </div>
//         </nav>
//       </div>
//     </header>
//   )
// }

export {}
