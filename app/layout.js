import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
})

export const metadata = {
    title: 'Jinto Johnson C - AI/ML Engineer | Deep Learning & NLP Specialist',
    description: 'AI/ML Engineer specializing in deep learning, computer vision, and NLP. Building state-of-the-art models and deploying scalable AI solutions. Open to research roles and collaborations.',
    keywords: ['AI Engineer', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'PyTorch', 'TensorFlow', 'Neural Networks', 'AI Research'],
    authors: [{ name: 'Jinto Johnson C' }],
    creator: 'Jinto Johnson C',
    publisher: 'Jinto Johnson C',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Jinto Johnson C - AI/ML Engineer',
        description: 'AI/ML Engineer specializing in deep learning, computer vision, and NLP. Building cutting-edge machine learning models.',
        siteName: 'Jinto Johnson C Portfolio',
        images: [
            {
                url: '/profile.jpg',
                width: 1200,
                height: 630,
                alt: 'Jinto Johnson C - AI/ML Engineer',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jinto Johnson C - AI/ML Engineer',
        description: 'AI/ML Engineer specializing in deep learning, computer vision, and NLP',
        images: ['/profile.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta name="theme-color" content="#0f172a" />
            </head>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
