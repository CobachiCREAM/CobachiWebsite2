# How to Update Your Website

This guide explains how to make changes to your Cobachi website after it's live.

## Understanding How It Works

Your website has three connected parts:

1. **Your Code Files** (on your computer or GitHub) - The actual website files
2. **GitHub** - Stores a copy of all your files online
3. **Vercel** - Takes files from GitHub and shows them to visitors

**The Flow:**
```
You Edit Files → Save Changes → Upload to GitHub → Vercel Automatically Updates (2-5 min)
```

---

## What You Can Change Yourself (Easy)

### 1. Text Content
**Examples:** Business hours, phone numbers, descriptions, prices, event details

**Where:** Look in the `src/pages/` folder:
- `Home.tsx` - Homepage content
- `About.tsx` - About page
- `Contact.tsx` - Contact information
- `Locations.tsx` - Store locations and hours
- `Catering.tsx` - Catering information
- `STEM.tsx` - STEM program details
- `Experiences.tsx` - Events and experiences

**How to edit:**
1. Open the file in a text editor (Notepad, VS Code, etc.)
2. Find the text you want to change (it's usually in quotes or between `<>` tags)
3. Change the text
4. Save the file

**Example:** In `Contact.tsx`, you might see:
```
<h1>Contact Us</h1>
<p>Call us at: (555) 123-4567</p>
```
Just change `(555) 123-4567` to your real number.

### 2. Images
**Where:** Put new images in the `public/` folder

**How:**
1. Save your new image with a simple name (like `store-front.jpg`)
2. Put it in the `public/` folder
3. In your code files, reference it as `/store-front.jpg`

### 3. Colors and Simple Styling
**Where:** Look for Tailwind CSS classes in your components

**Examples:**
- `bg-blue-500` - Background color
- `text-red-600` - Text color
- `text-xl` - Text size

You can change these, but test carefully to make sure things still look good.

---

## What Needs Technical Help (Advanced)

These changes require coding knowledge:

- Adding new pages or sections
- Changing how forms work
- Modifying the shopping cart
- Database changes
- Connecting new services
- Complex design changes

For these, you'll want to hire a developer or ask whoever built the site.

---

## Step-by-Step: Making an Update

### Option 1: If You Have GitHub Desktop (Recommended for Beginners)

1. **Download GitHub Desktop** (if you don't have it)
   - Go to https://desktop.github.com
   - Download and install

2. **Clone Your Repository** (first time only)
   - Open GitHub Desktop
   - Click "File" → "Clone Repository"
   - Find your "cobachi-website" repository
   - Choose where to save it on your computer
   - Click "Clone"

3. **Make Your Changes**
   - Open your project folder on your computer
   - Find the file you want to edit
   - Open it in a text editor (Notepad, VS Code, etc.)
   - Make your changes
   - Save the file

4. **Upload Your Changes**
   - Go back to GitHub Desktop
   - You'll see your changes listed on the left
   - In the bottom left, type a brief description (e.g., "Updated phone number")
   - Click "Commit to main"
   - Click "Push origin" at the top

5. **Wait for Update**
   - Vercel automatically detects the change
   - Rebuilds your site (takes 2-5 minutes)
   - Your live site updates automatically!
   - You'll get an email from Vercel when it's done

### Option 2: Directly on GitHub (Quick Small Changes)

1. **Go to GitHub**
   - Log into https://github.com
   - Open your "cobachi-website" repository

2. **Find the File**
   - Click through folders to find the file you want to edit
   - Example: Click `src` → `pages` → `Contact.tsx`

3. **Edit the File**
   - Click the pencil icon (top right of file view)
   - Make your changes in the editor
   - Scroll down, add a description of your change
   - Click "Commit changes"

4. **Wait for Update**
   - Vercel automatically rebuilds (2-5 minutes)
   - Check your live site to see the changes

---

## Common Updates You Might Want to Make

### Update Business Hours
**File:** `src/pages/Locations.tsx`
**Find:** Look for text about hours (probably something like "Mon-Fri: 10am-8pm")
**Change:** Update to your actual hours
**Save and upload to GitHub**

### Update Contact Information
**File:** `src/pages/Contact.tsx`
**Find:** Phone numbers, email addresses
**Change:** Replace with your real contact info
**Save and upload to GitHub**

### Change Homepage Welcome Message
**File:** `src/pages/Home.tsx`
**Find:** The main heading and description text
**Change:** Write your own welcome message
**Save and upload to GitHub**

### Add a New Event
**Option 1 (Easy):** Use your admin dashboard (if set up)
**Option 2 (Manual):** Add to database through Supabase:
1. Log into Supabase
2. Go to Table Editor
3. Find "events" table
4. Click "Insert row"
5. Fill in event details
6. Save

The website will automatically show the new event!

### Update Product Information
Products come from Shopify, so:
1. Log into Shopify
2. Go to Products
3. Edit the product
4. Changes appear automatically on your site

---

## Testing Your Changes

Before visitors see changes, test them:

1. **Preview in Vercel:**
   - Every time you upload to GitHub, Vercel creates a preview
   - Go to Vercel dashboard
   - Click on your deployment
   - Click "Visit" on the preview link
   - Check that everything looks right

2. **Check on Different Devices:**
   - Look on your phone
   - Look on a tablet
   - Look on a computer
   - Make sure text is readable and buttons work

3. **Test Forms:**
   - If you changed a form, try submitting it
   - Make sure you receive the information

---

## The Update Workflow

Here's what a typical update looks like:

**Example: Changing your phone number**

1. You notice the phone number on the Contact page is wrong
2. You open `src/pages/Contact.tsx` on your computer
3. You find the phone number in the code
4. You change it to the correct number
5. You save the file
6. You open GitHub Desktop
7. You see "Contact.tsx" has changes
8. You type "Updated phone number" in the description
9. You click "Commit" then "Push"
10. 3 minutes later, Vercel emails you "Deployment successful"
11. You visit your live site and see the new number

**Total time: About 10 minutes**

---

## What NOT to Change

Be careful with these files - they make the site work:

- `package.json` - Lists all the code libraries
- `vite.config.ts` - Build settings
- `tsconfig.json` - TypeScript settings
- Files in `src/lib/` - Database connections
- Files in `src/context/` - App functionality
- Anything in `node_modules/` - Don't touch this folder!

If you need to change these, get technical help.

---

## Helpful Tools

### Text Editors (Free)
- **Notepad** (Windows) - Built-in, very basic
- **TextEdit** (Mac) - Built-in, very basic
- **VS Code** - Professional, free, highly recommended
  - Download: https://code.visualstudio.com
  - Best for editing code files
  - Shows colors and helps you spot mistakes

### GitHub Desktop
- Makes uploading changes easy
- Visual interface, no command line needed
- Download: https://desktop.github.com

---

## Getting Help

### Before Making Changes:
1. **Make a backup** - Download all your files first
2. **Test on preview** - Don't rush changes to live site
3. **Change one thing at a time** - Easier to fix if something breaks

### If Something Breaks:
1. **Check Vercel deployment logs** - Shows what went wrong
2. **Revert your change in GitHub** - Go back to previous version
3. **Contact your developer** - They can fix technical issues quickly

### If You're Not Sure:
- **Small text changes** - Usually safe to do yourself
- **Adding content** - Usually safe
- **Deleting code** - Be very careful
- **Changing structure** - Get help

---

## Database Updates (Content Management)

Many updates don't require code changes at all! Your database stores:

- Events
- Class bookings
- Flavor suggestions
- Location suggestions
- Catering requests
- STEM inquiries

**To update these:**
1. Log into Supabase (https://supabase.com)
2. Go to "Table Editor"
3. Select the table you want to edit
4. Add, edit, or delete rows
5. Changes appear on your site immediately (no deployment needed!)

**This is the easiest way to:**
- Add new events
- Update locations
- Manage customer inquiries
- View bookings and requests

---

## Quick Reference

| What You Want to Change | Where to Look | Need Help? |
|------------------------|---------------|------------|
| Text content | `src/pages/` files | No |
| Images | `public/` folder | No |
| Business hours | `src/pages/Locations.tsx` | No |
| Contact info | `src/pages/Contact.tsx` | No |
| Products | Shopify dashboard | No |
| Events | Supabase database | No |
| New features | Multiple files | Yes |
| Design changes | CSS/Tailwind classes | Maybe |
| Forms | Component files | Yes |
| Database structure | Supabase migrations | Yes |

---

## Remember

- Changes to code → Upload to GitHub → Auto-updates in 2-5 minutes
- Changes to database → Updates instantly
- Changes to Shopify → Updates automatically
- Always test before sharing with customers
- Keep backups of your files
- When in doubt, ask for help!

Your website is designed to be maintainable. Small updates should be easy, and bigger changes can wait until you have technical help.
