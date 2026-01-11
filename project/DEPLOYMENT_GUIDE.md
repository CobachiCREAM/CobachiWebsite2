# 🚀 Cobachi Ice Cream - Complete Deployment Guide

## PHASE 1: Deploy Your Custom Website

### Option A: Netlify (Recommended)

1. **Build your site locally:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the `/dist` folder
   - You'll get a URL like: `https://random-name.netlify.app`

3. **Add Environment Variables:**
   - In Netlify: Site settings → Environment variables
   - Add:
     - `VITE_SUPABASE_URL` = (from your .env file)
     - `VITE_SUPABASE_ANON_KEY` = (from your .env file)

4. **Connect to GitHub (for auto-deploy):**
   - Push your code to GitHub
   - In Netlify: Site settings → Build & deploy → Link repository
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Custom Domain:**
   - In Netlify: Domain settings → Add custom domain
   - Enter your domain (e.g., cobachi.com)
   - Update DNS settings at your domain registrar

---

## PHASE 2: Set Up Shopify

### 1. Create Shopify Account
- Go to https://www.shopify.com/free-trial
- Sign up (3-day trial, then $39/mo for Basic)
- Choose store name: `cobachi` or `cobachi-icecream`
- Admin URL: `https://your-store.myshopify.com/admin`

### 2. Configure Multi-Location Inventory

**In Shopify Admin:**
1. Go to **Settings → Locations**
2. Click **"Add location"** for each physical store
3. For each location, add:
   - Location name
   - Full address
   - Phone number
   - Check "Fulfills online orders" (if applicable)

**Example Locations:**
```
Location 1: Cobachi - Downtown
Address: 123 Main St, Phoenix, AZ 85001
Phone: (602) 555-0100

Location 2: Cobachi - Westside
Address: 456 West Ave, Phoenix, AZ 85007
Phone: (602) 555-0200

Location 3: Cobachi - Scottsdale
Address: 789 Fashion Blvd, Scottsdale, AZ 85251
Phone: (480) 555-0300
```

### 3. Add Your Ice Cream Products

**For Each Flavor:**
1. Go to **Products → Add product**
2. Fill in:
   - **Title:** "Chocolate Ice Cream"
   - **Description:** Full description with ingredients, allergens
   - **Media:** Upload 3-5 high-quality photos
   - **Price:** $8.99 (or your price)

3. **Add Variants** (sizes):
   - Pint - $7.99
   - Quart - $13.99
   - Half-Gallon - $24.99

4. **Set Inventory by Location:**
   - Scroll to "Inventory" section
   - Check "Track quantity"
   - Click "Continue selling when out of stock" (optional)
   - For each variant, set quantity at each location:
     ```
     Chocolate Pint:
       Downtown: 50
       Westside: 35
       Scottsdale: 42
     ```

5. **Shipping:**
   - Check "This is a physical product"
   - Weight: 1 lb (for pints)
   - Check if you ship this product

6. **Product Organization:**
   - Type: Ice Cream
   - Vendor: Cobachi
   - Collections: Add to "All Flavors", "Chocolate Flavors", etc.
   - Tags: chocolate, dairy, popular

### 4. Set Up Shopify POS (For Physical Locations)

1. Download **Shopify POS** app (iOS/Android)
2. In admin: **Settings → Locations → [Select location]**
3. Configure POS settings for each location
4. Log in to POS app at each store
5. When you sell in-store, inventory updates automatically

---

## PHASE 3: Integrate Shopify with Your Website

### Method 1: Shopify Buy Button SDK (What We Built)

**Step 1: Get Your Shopify API Credentials**

1. In Shopify Admin: **Apps → Develop apps**
2. Click **"Create an app"** → Name it "Custom Website"
3. Click **"Configure Storefront API"**
4. Check these permissions:
   - ✅ Read products
   - ✅ Read inventory
   - ✅ Read locations
5. Click **"Save"** → **"Install app"**
6. Copy your **Storefront API access token** (starts with `shpat_`)

**Step 2: Update Your Code**

Open `src/components/ShopifyBuyButton.tsx` and replace:
```typescript
domain: 'YOUR-STORE.myshopify.com', // Replace with your store URL
storefrontAccessToken: 'YOUR-STOREFRONT-API-TOKEN' // Replace with token from above
```

**Step 3: Get Product IDs**

1. In Shopify Admin: **Products → [Click any product]**
2. Look at the URL: `...admin/products/1234567890`
3. The number is your product ID
4. Copy product IDs for each product

**Step 4: Add to Your Shop Page**

Update `src/pages/Shop.tsx` to use Shopify products:

```typescript
import ShopifyBuyButton from '../components/ShopifyBuyButton';

// In your Shop component, replace static products with:
<ShopifyBuyButton productId="1234567890" />
<ShopifyBuyButton productId="0987654321" />
```

---

### Method 2: Manual Product Sync (Alternative)

Keep your current Shop page design, but sync data from Shopify:

**Create a Shopify webhook edge function:**

1. This will run whenever products/inventory change in Shopify
2. It updates your Supabase database automatically
3. Your site pulls from Supabase (fast, always current)

**Setup:**
- In Shopify Admin: **Settings → Notifications → Webhooks**
- Create webhook for "Product update" and "Inventory update"
- Point to your edge function URL

---

## PHASE 4: Domain Setup

### If You Don't Have a Domain Yet:

1. **Buy a domain:**
   - Go to Namecheap, Google Domains, or GoDaddy
   - Search for: `cobachi.com` or `cobachiicecream.com`
   - Cost: $10-15/year

2. **Point to Netlify:**
   - In your domain registrar, update nameservers to:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - Or add A record: `75.2.60.5` (Netlify's load balancer)

3. **Configure in Netlify:**
   - Domain settings → Add custom domain
   - Enter: `cobachi.com` and `www.cobachi.com`
   - Enable HTTPS (automatic with Let's Encrypt)

### If You Already Have a Domain:

1. In your domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS settings:
   - Add CNAME: `www` → `your-site.netlify.app`
   - Add A record: `@` → `75.2.60.5`
3. Wait 24-48 hours for DNS propagation

---

## PHASE 5: Connect Everything

### Shopify ↔ Your Website Integration

**Option A: Keep Separate (Simpler)**
- Your site (cobachi.com): STEM, Events, Catering, About, Locations
- Shopify Buy Buttons: Embedded on Shop page
- Users checkout through Shopify modal
- Inventory managed in Shopify only

**Option B: Sync Data (Advanced)**
- Create Supabase edge function to receive Shopify webhooks
- When product/inventory changes in Shopify → updates Supabase
- Your site reads from Supabase (fast, cached)
- Users still checkout through Shopify
- Best of both worlds: speed + Shopify inventory management

---

## PHASE 6: Testing Checklist

Before going live, test:

### ✅ Your Custom Website
- [ ] All pages load correctly
- [ ] Forms submit (STEM, Catering, Events, Contact)
- [ ] User signup/login works
- [ ] Supabase connection works
- [ ] Mobile responsive
- [ ] Fast load times

### ✅ Shopify Integration
- [ ] Buy buttons appear on Shop page
- [ ] Products show correct prices
- [ ] Inventory shows correctly
- [ ] Can add to cart
- [ ] Checkout flow works
- [ ] Test purchase (use Shopify test mode)
- [ ] Multi-location inventory displays

### ✅ Domain & SSL
- [ ] Domain resolves to your site
- [ ] HTTPS works (green lock icon)
- [ ] www and non-www both work
- [ ] No mixed content warnings

---

## PHASE 7: Go Live!

### Launch Day Checklist:

1. **Announcement:**
   - Post on social media
   - Email existing customers
   - Update Google Business listings with new website

2. **Monitor:**
   - Check Netlify analytics for traffic
   - Monitor Shopify orders
   - Watch for error emails from Supabase
   - Check mobile experience on real devices

3. **Shopify Settings:**
   - Remove password protection (if enabled)
   - Set proper shipping rates
   - Configure tax settings
   - Set up payment processor (Shopify Payments or Stripe)

---

## Cost Summary

### Monthly Costs:
- **Netlify:** Free (unless you need advanced features)
- **Supabase:** Free (up to 500MB database, 2GB bandwidth)
- **Shopify Basic:** $39/mo
- **Domain:** ~$12/year (~$1/mo)
- **Total:** ~$40/month

### Optional Add-ons:
- Shopify POS: Included with Basic
- Shopify apps: $15-30/mo each (events, reviews, etc.)
- Advanced Shopify plan: $105/mo (more reports, better shipping)

---

## Support Resources

- **Netlify Docs:** https://docs.netlify.com
- **Shopify Help:** https://help.shopify.com
- **Supabase Docs:** https://supabase.com/docs
- **Your site code:** All in your project folder

---

## Next Steps After Launch

1. **Set up Google Analytics** (track traffic)
2. **Add Shopify Analytics** (track sales)
3. **Connect social media** (Instagram Shopping, Facebook Shop)
4. **SEO optimization** (meta tags, sitemap)
5. **Email marketing** (Klaviyo integration with Shopify)
6. **Review system** (Shopify app like Judge.me)

---

## Need Help?

If you get stuck on any step:
1. Check the specific platform's documentation
2. Most issues are solved in setup guides
3. DNS propagation takes 24-48 hours (be patient)
4. Shopify support is excellent (24/7 chat)

---

**You're ready to launch! 🎉**
