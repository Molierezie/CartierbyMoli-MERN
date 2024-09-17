# <font color="#00b0f0">1️⃣ - STRUCTURE FOLDER </font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

## <font color="#95b3d7">1 - Code before</font>

🧩 in userController 

```jsx


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩-  Folder</font>

- src
   - redux
        - api
        - features
        - constant.jsx
        - stores.jsx
   - component
   - pages

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 


# <font color="#00b0f0">1️⃣ -  ViteConfig.js</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

`Code Before & Task`

```jsx

```

### <font color="#4f81bd">1  - Solution ✅ </font>


#### <font color="#b2a2c7">🧩 - vite.config.js</font>

##### <font color="#a5a5a5">💻 - Code</font>


```jsx

export default defineConfig({
  plugins: [react()],
  server : {

    proxy : {
      "/api" : "http://localhost:5500",
      "/upload" : "http://localhost:5500"
    }
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  }


})

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `resolve { Alias }`

	- <span style="background:#d3f8b6"><font color="#00b050">Aliases</font></span> ?
      - In a large project, you often end up with deep or repetitive import paths that are hard to manage and read. For example, without aliases, you might have imports like this:
      - ```js
         import { useAllProductsQuery } from '../../../redux/api/productApiSlice';
         import MyComponent from '../../../components/MyComponent';
         `
      - These paths can be cumbersome, especially if you move files around or if the structure changes over time. Aliases provide a way to define a custom, shorter, and more readable path.
   
   -  <span style="background:#fff88f"><font color="#e36c09">How Alias Works</font></span> ?
      - When you define an alias, you're telling the bundler (like Vite) to replace a specific prefix in your import paths with a corresponding absolute path. This helps you avoid long relative paths and makes refactoring easier.
      - <font color="#92d050">Example</font>
      ```css
      src/
      │
      ├── components/
      │        └── Home.jsx
      │
      ├── redux/
      │   └── api/
      │       └── productApiSlice.js
      │
      └── main.js
      ```
      - Then I define aliases in the vite.config.js file. Here’s how you might set it up:

      ```js
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react';

      export default defineConfig({
      plugins: [react()],
      resolve: {
      alias: {
      '@': '/src',
      '@components': '/src/components',
      '@redux': '/src/redux',
            },
         },
      });
      ```

   - Before & After Alias

      - 
      ```js
      // Before (without aliases)
      import { useAllProductsQuery } from '../../../redux/api/productApiSlice';
      import MyComponent from '../../../components/MyComponent';
      // After (with aliases)
      import { useAllProductsQuery } from '@redux/api/productApiSlice';
      import MyComponent from '@components/MyComponent';
         ```


