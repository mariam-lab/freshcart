# FreshCart | E-commerce | Store

## Packages

[1] Design [UI] style => TailwindCSS
[2] Icons => Font Awesome
[3] Routing => ReactRouter
[4] API => Axios
[5] Forms => Formik
[6] Validation => Yup
[7] Fonts => Font Source "Poppins"

how to install or setup my project ?

# npm i axios react-router formik yup

//\* install tilwindcss

# npm i tailwindcss @tailwindcss/vite --save

# then add in vite.config.js ==>import tailwindcss from "@tailwindcss/vite"

# then add in vite.config.js ==> plugins: [react(), tailwindcss()],

# then add in index.css ==> @import "tailwindcss";

//\* install specific font

# npm install @fontsource/poppins ==> from font source website

# add import in main.jsx ==>import "@fontsource/poppins";

# add import in index.css ==>@layer base{bodyfont-family: "Poppins", sans-serif; }

//\* install fontawesome

# npm i --save @fortawesome/fontawesome-svg-core

#npm i --save @fortawesome/free-solid-svg-icons
#npm i --save @fortawesome/free-regular-svg-icons
#npm i --save @fortawesome/free-brands-svg-icons

#npm i --save @fortawesome/react-fontawesome@latest
