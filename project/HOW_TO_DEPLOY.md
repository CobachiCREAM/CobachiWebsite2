# Complete Guide to Launch Your Cobachi Website

This guide will walk you through every step to get your ice cream shop website live on the internet.

## What You'll Need

Before starting, make sure you have:
- A Vercel account (free - we'll set this up)
- A GitHub account (free - we'll set this up if needed)
- Your Shopify store set up (see SHOPIFY_SETUP.md)
- About 30 minutes

---

## Step 1: Get Your Code on GitHub

Think of GitHub as a storage locker for your website code. Vercel will pull your code from there.

### If you don't have a GitHub account:
1. Go to https://github.com
2. Click "Sign up"
3. Follow the prompts to create a free account

### Upload your code to GitHub:
1. Log into GitHub
2. Click the "+" button in the top right corner
3. Select "New repository"
4. Name it something like "cobachi-website"
5. Click "Create repository"
6. Follow GitHub's instructions to upload your code files

**OR** if someone is helping you with the code, ask them to push the code to GitHub and give you access to the repository.

---

## Step 2: Create a Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub" (easiest option)
4. This will connect your Vercel and GitHub accounts automatically

---

## Step 3: Connect Your Website to Vercel

1. Once logged into Vercel, click "Add New..."
2. Select "Project"
3. You'll see a list of your GitHub repositories
4. Find "cobachi-website" (or whatever you named it)
5. Click "Import"

---

## Step 4: Configure Your Environment Variables

Environment variables are like secret passwords and settings that your website needs to work.

You'll need to enter these values in Vercel:

1. On the import screen, scroll to "Environment Variables"
2. Add each of these one by one:

**Required Variables:**

| Variable Name | Where to Get It | What It Does |
|--------------|-----------------|--------------|
| `VITE_SUPABASE_URL` | Your Supabase project settings | Connects to your database |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase project settings | Allows secure access to database |

**To find your Supabase values:**
1. Log into https://supabase.com
2. Select your Cobachi project
3. Click "Settings" (gear icon on the left)
4. Click "API"
5. Copy the "Project URL" → This is your `VITE_SUPABASE_URL`
6. Copy the "anon public" key → This is your `VITE_SUPABASE_ANON_KEY`

**For Shopify (optional for now, needed for shop to work):**

| Variable Name | Where to Get It |
|--------------|-----------------|
| `VITE_SHOPIFY_DOMAIN` | Your Shopify store URL (example: cobachi.myshopify.com) |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | Shopify Admin → Apps → Create app (see SHOPIFY_SETUP.md) |

3. After adding all variables, click "Deploy"

---

## Step 5: Wait for Deployment

Vercel will now:
1. Download your code from GitHub
2. Build your website
3. Put it on the internet

This takes about 2-5 minutes. You'll see a progress screen with:
- Building (compiling your code)
- Deploying (putting it online)

**If you see errors:**
- Check that all environment variables are entered correctly
- Make sure there are no typos in the values
- Double-check you copied the full URL/key from Supabase

---

## Step 6: Your Website is Live! 🎉

Once deployment succeeds:
1. Vercel will show you a preview image of your site
2. You'll see a URL like: `https://cobachi-website-xyz123.vercel.app`
3. Click "Visit" to see your live website
4. Share this URL with anyone to show them your site!

---

## Step 7: Get a Custom Domain (Optional)

Right now your site has a URL like `cobachi-website-xyz123.vercel.app`. You can use a custom domain like `cobachi.com`:

### If you already own a domain:
1. In Vercel, go to your project
2. Click "Settings"
3. Click "Domains"
4. Type your domain name (e.g., cobachi.com)
5. Vercel will show you instructions to connect it
6. You'll need to log into your domain provider (GoDaddy, Namecheap, etc.)
7. Update the DNS settings as shown by Vercel

### If you need to buy a domain:
1. Go to Namecheap, GoDaddy, or Google Domains
2. Search for your desired name (e.g., cobachi.com)
3. Purchase it (usually $10-15/year)
4. Then follow the steps above to connect it to Vercel

---

## Step 8: Set Up Shopify (If Not Done)

For your online shop to work:
1. Follow the complete guide in `SHOPIFY_SETUP.md`
2. Once set up, add your Shopify variables to Vercel:
   - Go to your project in Vercel
   - Click "Settings"
   - Click "Environment Variables"
   - Add `VITE_SHOPIFY_DOMAIN` and `VITE_SHOPIFY_STOREFRONT_TOKEN`
   - Click "Save"
   - Vercel will automatically redeploy with new settings

---

## Making Updates to Your Site

After your site is live, whenever you want to make changes:

1. Update your code files
2. Push changes to GitHub
3. Vercel automatically detects changes and redeploys (takes 2-5 minutes)
4. Your live site updates automatically!

**You don't have to do anything in Vercel** - it watches GitHub and updates automatically.

---

## Troubleshooting

### Site shows errors or blank pages:
- Check environment variables are correct in Vercel Settings
- Look at deployment logs in Vercel for error messages
- Verify Supabase project is active

### Shop products don't show:
- Confirm Shopify variables are added to Vercel
- Check SHOPIFY_SETUP.md for complete Shopify configuration
- Verify products are published in Shopify

### Changes aren't showing up:
- Check GitHub - are your changes uploaded?
- Check Vercel deployments - did it redeploy?
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## Cost Summary

- **Vercel hosting**: FREE forever
- **GitHub**: FREE
- **Supabase**: FREE (up to 500MB database, 1GB storage)
- **Shopify**: $5-39/month
- **Custom domain**: ~$12/year (optional)

**Total minimum cost: $5/month** (just Shopify Starter)

---

## Need Help?

If you get stuck:
1. Check the deployment logs in Vercel (shows exact errors)
2. Verify all environment variables are correct
3. Make sure your Supabase project is active
4. Check that Shopify is properly configured

The most common issues are:
- Typos in environment variables
- Missing environment variables
- Shopify not fully set up

---

## Quick Checklist Before Going Live

- [ ] Code is on GitHub
- [ ] Vercel account created and connected to GitHub
- [ ] Supabase environment variables added to Vercel
- [ ] Site deploys successfully (no errors)
- [ ] Can visit the site and see homepage
- [ ] Shopify set up (for shop functionality)
- [ ] Shopify variables added to Vercel
- [ ] All pages work (test clicking around)
- [ ] Contact forms work (sends to your email/database)
- [ ] Mobile version looks good (check on phone)

Once all items are checked, you're ready to share your site with the world! 🎉
