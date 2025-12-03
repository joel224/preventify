import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                'top-bar': 'hsl(var(--top-bar))',
                preventify: {
                    blue: '#0F2C59',
                    green: '#2EC4B6',
                    gray: '#757575',
                    'light-blue': '#4A5AC5',
                    'light-green': '#3DD391',
                    'dark-blue': '#1E2665',
                    'dark-green': '#1D9965',
                    'light-gray': '#F1F5F9',
                    'dark-gray': '#4B4B4B',
                    'cta-primary': 'hsl(var(--secondary))',
                },
                'deep-navy-blue': '#0F2C59',
                'soft-teal': '#2EC4B6',
                'warm-coral': '#FF6B6B',
                'off-white': '#F8F9FA',
                'dark-gray': '#333333',
                'light-gray': '#6C757D',
                 'peace-of-mind': {
                    gray: '#F6F6F6',
                    'dark-gray': '#5F5F5F',
                    green: '#3A7D7E',
                    'green-dark': '#2E6465',
                    purple: '#6C63FF',
                    orange: '#F9A826',
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                shimmer: {
                    '0%': {
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        transform: 'translateX(100%)',
                    },
                },
                'shimmer-reveal': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                    '60%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    }
                },
                vibrate: {
                    '0%, 12.5%, 100%': { transform: 'translateX(0)' },
                    '2.5%': { transform: 'translateX(-3px)' },
                    '5%': { transform: 'translateX(3px)' },
                    '7.5%': { transform: 'translateX(-3px)' },
                    '10%': { transform: 'translateX(3px)' },
                },
                'emergency-blink': {
                    '0%, 95%, 100%': { color: 'white' },
                    '96%': { color: 'hsl(var(--primary))' },
                },
                'subtle-move-right': {
                    '5%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(4px)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'shimmer': 'shimmer 1.5s infinite',
                'shimmer-reveal': 'shimmer-reveal 1s ease-out forwards',
                'vibrate': 'vibrate 4s ease-in-out infinite',
                'emergency-blink': 'emergency-blink 2s ease-out infinite',
                'subtle-move-right': 'subtle-move-right 2s ease-in-out infinite',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                display: ['var(--font-poppins)', 'sans-serif'],
                // === New font added here ===
                'stack-sans': ['"Stack Sans Headline"', 'sans-serif'],
                // ===========================
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
