/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // Text colors
                'black-text': 'var(--black-text)',
                'while-text': 'var(--while-text)',
                'blue-text': 'var(--blue-text)',
                'orange-text': 'var(--orange-text)',
                'green-text': 'var(--green-text)',
                'grey-text': 'var(--grey-text)',

                // Status colors
                'red-status': 'var(--red-status)',
                'blue-status': 'var(--blue-status)',
                'green-status': 'var(--green-status)',

                // Background colors
                'background-1': 'var(--background-1)',
                'background-2': 'var(--background-2)',
                'background-3': 'var(--background-3)',
                'background-4': 'var(--background-4)',
                'background-5': 'var(--background-5)',
                'background-6': 'var(--background-6)',
                'background-7': 'var(--background-7)',
                'background-8': 'var(--background-8)',

                'background-gray': 'var(--background-gray)',
                'background-orange-1': 'var(--background-orange-1)',
                'background-orange-2': 'var(--background-orange-2)',
                'background-orange-3': 'var(--background-orange-3)',
                'background-blue-1': 'var(--background-blue-1)',
                'background-blue-2': 'var(--background-blue-2)',
                'background-blue-3': 'var(--background-blue-3)',
                'background-green': 'var(--background-green)',
                'background-white': 'var(--background-white)',
                'background-input': 'var(--background-input)',

                // Border colors
                'border-orange': 'var(--border-orange)',

                // Icon colors
                'icon-color': 'var(--icon-color)',

                // User colors
                'user-color': 'var(--user-color)',
            },
            backgroundImage: {
                'br-gradient-top-or': 'linear-gradient(to top, var(--background-1), var(--background-2))',
                'br-gradient-right-or': 'linear-gradient(to right, var(--background-2), var(--background-1))',
                'br-gradient-sheet': 'linear-gradient(to right, var(--background-3), var(--background-4))',
                'br-gradient-blue': 'linear-gradient(to right, var(--background-5), var(--background-6))',
                'br-gradient-green': 'linear-gradient(to right, var(--background-8), var(--background-7))',
            },

            // shadow custom
            boxShadow: {
                custom: '4px 4px 25px 4px rgba(154, 202, 245, 0.5)',
            },

            fontFamily: {
                'font-Mulish': 'var(--font-Mulish)',
                'font-Source-Sans-Pro': 'var(--font-Source-Sans-Pro)',
                mulish: ["Mulish", "sans-serif"],
            },
            fontSize: {
                'Mulish-1': 'var(--font-size-Mulish-1)',
                'Mulish-2': 'var(--font-size-Mulish-2)',
                'Mulish-3': 'var(--font-size-Mulish-3)',
                'Mulish-4': 'var(--font-size-Mulish-4)',
                'Source-Sans-Pro-1': 'var(--font-size-Source-Sans-Pro-1)',
                'Source-Sans-Pro-2': 'var(--font-size-Source-Sans-Pro-2)',
            },
            lineHeight: {
                'Mulish-1': 'var(--line-height-Mulish-1)',
                'Mulish-2': 'var(--line-height-Mulish-2)',
                'Mulish-3': 'var(--line-height-Mulish-3)',
                'Mulish-4': 'var(--line-height-Mulish-4)',
                'Source-Sans-Pro-1': 'var(--line-height-Source-Sans-Pro-1)',
                'Source-Sans-Pro-2': 'var(--line-height-Source-Sans-Pro-2)',
                'Source-Sans-Pro-3': 'var(--line-height-Source-Sans-Pro-3)',
            },
            fontWeight: {
                Mulish: 'var(--weight-Mulish)',
                'Source-Sans-Pro-1': 'var(--weight-Source-Sans-Pro-1)',
                'Source-Sans-Pro-2': 'var(--weight-Source-Sans-Pro-2)',
                'Source-Sans-Pro-3': 'var(--weight-Source-Sans-Pro-3)',
            },

        },
    },
    plugins: [],
};
