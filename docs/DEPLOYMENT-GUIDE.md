# EazyTicks - Deployment Guide

## Table of Contents
1. [Overview](#overview)
2. [Environment Structure](#environment-structure)
3. [Build & Development Scripts](#build--development-scripts)
4. [Development Workflow](#development-workflow)
5. [Deployment Process](#deployment-process)
6. [Cloudflare Deployment](#cloudflare-deployment)
7. [Merging to Production](#merging-to-production)
8. [Troubleshooting](#troubleshooting)

---

## Overview

EazyTicks is deployed on **Cloudflare Pages** with manual deployment configuration. The project uses a branch-based deployment strategy with two primary environments:

| Environment | Branch  | Domain          | Purpose                           |
|-------------|---------|-----------------|-----------------------------------|
| **Testing** | testing | testing domain  | Staging environment for QA        |
| **Live**    | main    | eazyticks.com   | Production environment            |

**Important:** Auto-deployment is **disabled**. All deployments are performed manually through the Cloudflare dashboard.

---

## Environment Structure

### Branch Responsibilities

#### **Testing Branch** (`testing`)
- Used for development and staging
- Connected to the testing domain
- Where all development work is performed and tested
- Safe environment for experimentation and QA

#### **Main Branch** (`main`)
- Connected to the live domain (eazyticks.com)
- Production-ready code only
- Receives merged code from testing after verification
- All commits to this branch should be stable and tested

---

## Build & Development Scripts

All scripts are defined in `package.json` and managed via npm. Below is a detailed breakdown:

### Local Development

#### `npm run dev`
- **Purpose:** Start the Next.js development server with hot-reload
- **Usage:** 
  ```bash
  npm run dev
  ```
- **Output:** Server runs on `http://localhost:3000`
- **When to use:** During active development for real-time feedback

#### `npm run lint`
- **Purpose:** Run ESLint to check code quality and consistency
- **Usage:**
  ```bash
  npm run lint
  ```
- **Output:** Reports linting errors and warnings
- **When to use:** Before committing to ensure code quality standards

### Build & Production Preparation

#### `npm run build`
- **Purpose:** Create an optimized production build of the Next.js application
- **Usage:**
  ```bash
  npm run build
  ```
- **Output:** Creates `.next` directory with compiled assets
- **Duration:** Typically 2-5 minutes depending on project size
- **When to use:** Before deployment or to verify build succeeds

#### `npm run start`
- **Purpose:** Start the production server locally (requires prior build)
- **Usage:**
  ```bash
  npm run build
  npm run start
  ```
- **Output:** Production-ready server on `http://localhost:3000`
- **When to use:** Testing production build locally before deployment

### Cloudflare-Specific Scripts

#### `npm run pages:build`
- **Purpose:** Build the application for Cloudflare Pages environment
- **Command:** `npx @cloudflare/next-on-pages`
- **Usage:**
  ```bash
  npm run pages:build
  ```
- **Output:** Creates `.vercel/output/static` directory optimized for Cloudflare
- **When to use:** Before deploying to Cloudflare (automatically runs in deploy script)

#### `npm run preview`
- **Purpose:** Simulate Cloudflare Pages deployment locally using Wrangler
- **Command:** `npm run pages:build && wrangler pages dev`
- **Usage:**
  ```bash
  npm run preview
  ```
- **Output:** Local Cloudflare environment on `http://localhost:8787`
- **When to use:** Before testing branch deployment—to verify it works in Cloudflare environment

#### `npm run deploy`
- **Purpose:** Build and deploy directly to Cloudflare Pages (requires Wrangler authentication)
- **Command:** `npm run pages:build && wrangler pages deploy`
- **Usage:**
  ```bash
  npm run deploy
  ```
- **Important:** This script deploys to the **currently configured Cloudflare project**
- **When to use:** Only in CI/CD pipelines or when Wrangler is properly authenticated
- **Note:** Manual deployment via Cloudflare dashboard is recommended (see [Cloudflare Deployment](#cloudflare-deployment) section)

### Additional Scripts

#### `npm run build:widget`
- **Purpose:** Compile TypeScript widget for public deployment
- **Command:** `tsc public/widget.ts --outDir public/`
- **Usage:**
  ```bash
  npm run build:widget
  ```
- **Output:** Compiled JavaScript in `public/` directory
- **When to use:** When widget code is updated in `public/widget.ts`

---

## Development Workflow

Follow this step-by-step workflow to ensure smooth development and deployment:

### Step 1: Prepare the Testing Branch

Begin all work on the **testing** branch to keep the main branch stable.

```bash
# Switch to testing branch
git checkout testing

# Sync testing with main to get latest updates
git fetch origin
git merge origin/main

# Install any new dependencies
npm install
```

**Why this matters:** This ensures your testing environment has the latest production code and dependencies, preventing deployment surprises.

### Step 2: Development & Testing

Perform your development work:

```bash
# Start development server
npm run dev

# Code your changes...

# Check code quality
npm run lint

# If lint errors occur, fix them:
# (ESLint may auto-fix many issues with --fix flag)
```

**Testing Checklist:**
- [ ] Code follows project style and conventions
- [ ] No ESLint warnings or errors
- [ ] All features work as expected locally
- [ ] Responsive design verified on mobile devices
- [ ] Forms and validations work correctly
- [ ] API integrations function properly

### Step 3: Commit & Push Changes

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add feature description"
# or
git commit -m "fix: resolve issue description"

# Push to testing branch
git push origin testing
```

**Commit Message Convention:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring without feature changes
- `perf:` - Performance improvements
- `chore:` - Dependency updates, tooling changes

---

## Deployment Process

### Testing Branch Deployment

Deploy the **testing** branch to the staging environment for QA and testing.

#### Prerequisites
- You have access to the Cloudflare account
- Testing branch is ready and pushed to GitHub
- Local testing is complete

#### Deployment Steps

**1. Authenticate with Cloudflare**

```bash
# Login to Cloudflare CLI (if not already authenticated)
wrangler login

# When prompted, open the browser link and authorize
# Email: eazyticks@gmail.com
# Password: [Your Cloudflare password]
```

**2. Verify Testing Branch is Up-to-Date**

```bash
# Ensure you're on testing branch
git checkout testing

# Pull latest changes
git pull origin testing
```

**3. Test Build Locally (Recommended)**

Before deploying to Cloudflare, verify the build works:

```bash
# Build for Cloudflare Pages
npm run pages:build

# This will create optimized assets in .vercel/output/static
```

**If the build fails:**
- Check the error messages carefully
- Ensure all dependencies are installed: `npm install`
- Verify no TypeScript errors: `npm run lint`
- Fix issues locally and re-commit to testing branch

**4. Preview Locally in Cloudflare Environment (Optional)**

To simulate the Cloudflare Pages environment exactly:

```bash
npm run preview
```

Visit `http://localhost:8787` to test the application in the Cloudflare environment.

**5. Deploy to Testing Domain via Cloudflare Dashboard**

Since auto-deployment is disabled, manually deploy through the Cloudflare dashboard:

1. **Log in to Cloudflare** at https://dash.cloudflare.com
   - Email: `eazyticks@gmail.com`
   - Use your Cloudflare password

2. **Navigate to Pages**
   - In the left sidebar, find and click **"Pages"**
   - Select the **EazyTicks project**

3. **Deploy the Testing Branch**
   - Look for the **"Deployments"** tab
   - Click **"Create deployment"** or similar option
   - Select the **`testing`** branch from the dropdown
   - Click **"Deploy"**

4. **Monitor Deployment Progress**
   - Watch the deployment status in real-time
   - The build typically takes 3-5 minutes
   - Once complete, you'll see a success message with a deployment URL

5. **Verify Deployment**
   - Visit the testing domain
   - Test core functionality:
     - [ ] Homepage loads correctly
     - [ ] Events display properly
     - [ ] Search and filtering work
     - [ ] User authentication flows
     - [ ] Ticket purchase flow (if applicable)
     - [ ] Mobile responsiveness
     - [ ] API integrations

**If deployment fails:**
- Check Cloudflare deployment logs for error messages
- Common issues:
  - Missing environment variables (add in Cloudflare Pages Settings)
  - Build failures (fix code locally and re-push to testing)
  - Large bundle size (optimize code/dependencies)

---

## Merging to Production

Once testing is complete and verified, merge the testing branch to main for production deployment.

### Merge Requirements

Before merging to main, ensure:
- ✅ Testing branch is fully tested
- ✅ No known bugs or issues
- ✅ All QA checks passed
- ✅ Performance is acceptable
- ✅ Code review approved (if team process requires it)
- ✅ No breaking changes without documentation

### Merge Process

#### Option A: Merge via GitHub (Recommended for team use)

**1. Create Pull Request from Testing to Main**

```bash
# Ensure testing is up-to-date
git checkout testing
git pull origin testing
```

In GitHub:
1. Go to the repository
2. Click **"Pull requests"** tab
3. Click **"New pull request"**
4. Set:
   - Base: `main`
   - Compare: `testing`
5. Add title: `"Merge testing to main - [Date]"`
6. Add description with summary of changes
7. Click **"Create pull request"**

**2. Review the PR**
- Verify all changes are intentional
- Request team review if required
- Address any feedback

**3. Merge the PR**
- Click **"Merge pull request"** button
- Choose merge strategy:
  - **"Create a merge commit"** (recommended) - Preserves history
  - **"Squash and merge"** - Creates single commit
  - **"Rebase and merge"** - Linear history
- Click **"Confirm merge"**

**4. Delete Testing Branch in GitHub (Optional)**
- After merging, you can delete the remote testing branch
- Click **"Delete branch"** button OR:
  ```bash
  git push origin --delete testing
  ```
  
**Note:** Keep the testing branch for ongoing development; typically only delete temporary feature branches.

#### Option B: Merge via Command Line

```bash
# Switch to main branch
git checkout main

# Pull latest from remote
git pull origin main

# Merge testing into main
git merge testing

# Push to remote
git push origin main
```

### Verify Merge Completion

After successful merge:

```bash
# Verify main branch has the changes
git log --oneline -10

# Should show recent commits from testing branch

# Ensure testing branch is deleted locally if desired
git branch -d testing
```

---

## Cloudflare Deployment (Main/Live)

After merging to main, deploy the production code to the live domain.

### Production Deployment Steps

**1. Ensure Main Branch is Merged and Up-to-Date**

```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Verify the testing commits are present
git log --oneline -5
```

**2. Perform Final Build Verification**

```bash
npm run pages:build
```

Verify no errors appear.

**3. Deploy to Production via Cloudflare Dashboard**

1. **Log in to Cloudflare** at https://dash.cloudflare.com
   - Email: `eazyticks@gmail.com`

2. **Navigate to Pages → EazyTicks Project**

3. **Create Production Deployment**
   - Click **"Deployments"** tab
   - Click **"Create deployment"**
   - Select **`main`** branch
   - Click **"Deploy"**

4. **Monitor Deployment**
   - Watch progress until completion
   - Build should take 3-5 minutes

5. **Final Verification on Live Domain**
   - Visit https://eazyticks.com
   - Perform full regression testing:
     - [ ] All pages load correctly
     - [ ] User flows work end-to-end
     - [ ] Payments process successfully
     - [ ] Email notifications send
     - [ ] Mobile version is responsive
     - [ ] Performance is acceptable
   - Check browser console for JavaScript errors
   - Test on multiple devices/browsers

### Production Rollback (If Issues Occur)

If critical issues are found after production deployment:

**1. Immediate Action: Revert to Previous Deployment**

In Cloudflare Pages:
1. Go to **"Deployments"** tab
2. Find the previous stable deployment
3. Click the **three-dot menu** on that deployment
4. Select **"Rollback to this deployment"**
5. Confirm the rollback

**2. Fix Issues in Testing**

```bash
# Switch to testing branch
git checkout testing

# Pull latest changes
git pull origin testing

# Fix the issue
# Test thoroughly locally
npm run dev

# Commit and push fix
git add .
git commit -m "fix: resolve critical issue"
git push origin testing
```

**3. Redeploy to Production**

Once issue is fixed and retested, deploy the new fix to production following the normal deployment process.

---

## Troubleshooting

### Common Issues and Solutions

#### Build Failure on Cloudflare

**Symptom:** Deployment fails with build error

**Solutions:**
1. Check Cloudflare deployment logs for specific error
2. Verify all dependencies are correct in `package.json`
3. Run `npm run pages:build` locally to replicate issue
4. Ensure no TypeScript errors: `npm run lint`
5. Clear npm cache: `npm cache clean --force`
6. Reinstall dependencies: `rm -rf node_modules && npm install`

#### Environment Variables Missing

**Symptom:** Application works locally but fails on Cloudflare

**Solution:**
1. Go to Cloudflare Pages project settings
2. Find **"Environment variables"** section
3. Add all required variables (API keys, URLs, etc.)
4. Redeploy

#### Performance Issues After Deployment

**Symptom:** Application is slow on live domain

**Solutions:**
1. Check Cloudflare Analytics for bottlenecks
2. Optimize large bundles: `npm run build` and check size
3. Verify images are optimized with Next.js Image component
4. Check for N+1 database queries in API calls
5. Enable Cloudflare caching for static assets

#### Changes Not Appearing After Deployment

**Symptom:** New code not visible on live site

**Solutions:**
1. Hard refresh browser: `Ctrl+Shift+Del` (Windows) or `Cmd+Shift+Del` (Mac)
2. Wait 5-10 minutes for CDN cache to clear
3. Verify deployment completed successfully in Cloudflare
4. Check git that correct branch was deployed
5. Clear browser cache and local cache: `npm cache clean --force`
6. Verify code is actually in the correct branch: `git log --oneline`

#### Merge Conflicts

**Symptom:** Cannot merge testing to main due to conflicts

**Solution:**
```bash
# Create new branch to resolve conflicts
git checkout -b resolve-conflicts

# Merge main into this branch
git merge main

# Resolve conflicts in your editor
# Then commit and push
git add .
git commit -m "resolve: merge conflicts from main"
git push origin resolve-conflicts

# Create PR to merge resolve-conflicts back to testing
# Once tested, merge to main
```

---

## Deployment Checklist

### Before Every Deployment

- [ ] All code changes are committed to appropriate branch
- [ ] Testing branch is merged with latest main (if applicable)
- [ ] `npm install` has been run to ensure dependencies
- [ ] `npm run lint` shows no errors
- [ ] `npm run pages:build` completes successfully
- [ ] Local testing is complete and verified
- [ ] Team review/approval obtained (if required)
- [ ] Deployment window is appropriate (not during peak usage)
- [ ] Database migrations (if any) are complete
- [ ] Third-party API credentials are up-to-date

### After Every Deployment

For deployment-related issues or questions:
- **Cloudflare Account:** eazyticks@gmail.com
- **Primary Contact:** [Team Lead Name]
- **Support Email:** [Support Email]

---

**Last Updated:** March 2026  
**Version:** 1.0  
**Maintained By:** RF Technologies Team
