# ResuMate — Clean Minimalist Portfolio

A highly polished, modern single-screen resume and personal webpage platform. Built with React, Vite, and Tailwind CSS, featuring state-managed sandbox profiles, real-time Firestore database persistence, and Google Authentication.

Designed with a premium **"Clean Minimalism"** aesthetic, utilizing generous negative space, high-contrast typography, and a modern slate preview canvas.

---

## 🚀 Speedrun: Deploying to GitHub Pages

We have pre-configured everything for you! This repository includes a custom **GitHub Actions Workflow** (`.github/workflows/deploy.yml`) and relative path base-mapping (`vite.config.ts`) that builds and deploys your site automatically with zero coding required.

### Step 1: Push your code to GitHub
Initialize your Git repository, commit your files, and push to a new GitHub repository:
```bash
git init
git add .
git commit -m "feat: init minimalist portfolio platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Enable read/write permissions for Actions
For security, GitHub Actions needs permission to write and publish your built app:
1. In your GitHub repository, navigate to **Settings** > **Actions** > **General**.
2. Scroll to the bottom to **Workflow permissions**.
3. Select **"Read and write permissions"** and click **Save**.

### Step 3: Activate GitHub Pages
1. Navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, change from "Deploy from a branch" to **"GitHub Actions"**.
3. That is it! Go to the **Actions** tab to see your pipeline build and publish your portfolio in real time.

---

## 🛠 Features

- **Relative Asset Architecture**: Set up to work flawlessly out of the box regardless of whether your repository is hosted at a subfolder domain (`username.github.io/repo-name/`) or a custom root domain.
- **Client-Bundled Firebase Auth**: Your sandboxed Google sign-in and database permissions build directly with your production assets—no tricky runtime server secrets required.
- **Draft & Share**: Hosts a featured professional presentation by default, while allowing interactive custom drafts for authenticated visitors.
