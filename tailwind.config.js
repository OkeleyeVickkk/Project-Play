// /** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {
			backgroundColor: {
				primarySkin: "#23263D",
				secondarySkin: "#161728",
				tertiarySkin: "#111827",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
