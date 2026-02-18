// components/shared/SectionHeading.tsx
interface SectionHeadingProps {
    subtitle?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
    lightMode?: boolean; // For dark backgrounds
}

export default function SectionHeading({ subtitle, title, description, align = 'center', lightMode = false }: SectionHeadingProps) {
    return (
        <div className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
            {subtitle && (
                <span className={`block text-sm font-bold uppercase tracking-widest mb-3 ${lightMode ? 'text-accent-400' : 'text-accent-600'}`}>
                    {subtitle}
                </span>
            )}
            <h2 className={`text-4xl lg:text-5xl font-extrabold mb-6 leading-tight ${lightMode ? 'text-white' : 'text-slate-900'}`}>
                {title}
            </h2>
            {description && (
                <p className={`text-xl leading-relaxed ${lightMode ? 'text-brand-100' : 'text-slate-600'}`}>
                    {description}
                </p>
            )}
        </div>
    );
}