<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
=======
# CS516-2024-10A-10D-01-Final-Project
## Requirements
1. Develop an Auth application with the following features
* SignUp: Users can use this feature to register an account which contains email (as ID), password, name, profileImage.
* Login: After registering successfully, users can login to the application.
* Upload image: After logging in successfully, users can upload their profile images.
2. Tech stack
* Front End: ReactJS, Angular, or any frontend frameworks you prefer.
* Backend: Your preferred backend technology, such as NodeJS, Python, or Java.
3. Deployment: Serverless architecture
* Frontend: S3, CloudFront
* Backend: Lambda, API gateway
* Database: DynamoDB
4. Implment CloudFormation template (yaml) for the above resources.
5. Implement CI/CD for Frontend and add it to the above template.
## Time
1. Upload the project to GitHub by 10:00 PM of the day before the presentation.
* FrontEnd
* Backend
* Screenshots to demonstrate your project
* CloudFormation template (Yaml)
2. Presentation: You will have 15 minutes to demonstrate your application and answer questions.
3. No need for a PPT: You do not need to prepare any PowerPoint file.
4. I will notify you of the presentation time via email.
>>>>>>> 8c97780946f630874a75794c3ec7a178fa998c23
