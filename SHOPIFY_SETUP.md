# Shopify Integration Setup Guide

This guide will help you connect your Cobachi website to Shopify for ecommerce, marketing, and customer management.

## Overview

Your site uses a hybrid approach:
- **Shopify**: Product catalog, inventory, payments, SMS/email marketing, reports, and customer journey tracking
- **Supabase**: Custom features like events, bookings, catering requests, and user authentication

## Prerequisites

1. A Shopify store (Basic plan or higher recommended)
2. Access to your Shopify Admin dashboard
3. Access to Supabase project settings

## Step 1: Create a Shopify Store

1. Go to [shopify.com](https://www.shopify.com) and create an account
2. Choose a plan (Basic $39/month recommended)
3. Complete store setup with your business information

## Step 2: Get Shopify Credentials

### A. Admin API Access Token (for product sync)

1. In your Shopify Admin, go to **Settings** > **Apps and sales channels**
2. Click **Develop apps** (top right)
3. Click **Allow custom app development** (if prompted)
4. Click **Create an app**
5. Name it "Cobachi Website Integration"
6. Click **Configure Admin API scopes**
7. Enable these scopes:
   - `read_products`
   - `write_products`
   - `read_inventory`
   - `write_inventory`
8. Click **Save**
9. Click **Install app**
10. Copy the **Admin API access token** (you'll only see this once!)

### B. Storefront API Access Token (for checkout)

1. In the same app, click **Configure Storefront API scopes**
2. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
3. Click **Save**
4. Copy the **Storefront API access token**

### C. Get Your Shop Domain

Your shop domain is in the format: `your-store-name.myshopify.com`

You can find it in your Shopify Admin URL or in **Settings** > **General**

## Step 3: Create Webhook Secret (Optional but Recommended)

1. In Shopify Admin, go to **Settings** > **Notifications**
2. Scroll to **Webhooks**
3. You'll create webhooks in the next step, but first generate a secret:
   - Use any password generator to create a strong secret (32+ characters)
   - Save this for the environment variables

## Step 4: Configure Supabase Environment Variables

You need to add these environment variables to your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to **Project Settings** > **Edge Functions** > **Environment Variables**
3. Add these variables:

```
SHOPIFY_DOMAIN=your-store-name.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-admin-api-token
SHOPIFY_STOREFRONT_TOKEN=your-storefront-api-token
SHOPIFY_WEBHOOK_SECRET=your-webhook-secret
```

**Important**: Replace the values with your actual credentials from Step 2.

## Step 5: Add Products to Shopify

1. In Shopify Admin, go to **Products**
2. Click **Add product**
3. Add your ice cream products with:
   - Title
   - Description (HTML supported)
   - Price
   - Images
   - Inventory tracking
   - Tags (optional, for filtering)

## Step 6: Sync Products from Shopify to Your Website

After adding products to Shopify, sync them to your Supabase database:

### Option A: Using API Call (Recommended)

Run this command or use a tool like Postman:

```bash
curl -X POST https://ilxmjppqzzyczhkztqpk.supabase.co/functions/v1/shopify-sync
```

### Option B: Using Your Browser

Visit this URL:
```
https://ilxmjppqzzyczhkztqpk.supabase.co/functions/v1/shopify-sync
```

This will sync all products from Shopify to your website database.

**Run this sync whenever you add new products in Shopify.**

## Step 7: Set Up Webhooks (Real-time Inventory Updates)

Webhooks keep your website inventory in sync with Shopify automatically:

1. In Shopify Admin, go to **Settings** > **Notifications**
2. Scroll to **Webhooks** section
3. Click **Create webhook** and add these three webhooks:

### Webhook 1: Product Updates
- **Event**: Product update
- **Format**: JSON
- **URL**: `https://ilxmjppqzzyczhkztqpk.supabase.co/functions/v1/shopify-webhooks`
- **API version**: 2024-01 (latest)

### Webhook 2: Inventory Updates
- **Event**: Inventory levels update
- **Format**: JSON
- **URL**: `https://ilxmjppqzzyczhkztqpk.supabase.co/functions/v1/shopify-webhooks`
- **API version**: 2024-01 (latest)

### Webhook 3: Product Deletion
- **Event**: Product deletion
- **Format**: JSON
- **URL**: `https://ilxmjppqzzyczhkztqpk.supabase.co/functions/v1/shopify-webhooks`
- **API version**: 2024-01 (latest)

## Step 8: Test the Integration

1. **Test Product Display**:
   - Visit your website's Shop page
   - You should see products synced from Shopify

2. **Test Add to Cart**:
   - Click "Add to Cart" on any product
   - Cart should open with the product

3. **Test Checkout**:
   - Click "Proceed to Checkout" in the cart
   - You should be redirected to Shopify's checkout page
   - Complete a test purchase (use Shopify's test mode)

4. **Test Inventory Sync**:
   - Change a product's inventory in Shopify
   - Wait 30 seconds
   - Check your website - it should update automatically (via webhook)

## Using Shopify's Marketing Features

Now that you're connected, you can use Shopify's powerful features:

### Email Marketing
1. Go to **Marketing** > **Campaigns** in Shopify Admin
2. Create email campaigns for your customers
3. Use templates for abandoned cart recovery, promotions, etc.

### SMS Marketing
1. Install **Shopify Inbox** from the Shopify App Store
2. Enable SMS notifications
3. Send promotional messages to customers

### Customer Insights
1. Go to **Analytics** > **Reports**
2. View:
   - Customer lifetime value
   - Repeat purchase rate
   - Customer acquisition costs
   - Sales by channel
   - Popular products

### Customer Journey
1. Go to **Customers**
2. Click on any customer to see:
   - Purchase history
   - Cart value trends
   - Email engagement
   - Marketing attribution

## Maintenance

### Regular Tasks

1. **Sync Products**: Run the sync function whenever you add/update products in Shopify
2. **Monitor Webhooks**: Check webhook delivery status in Shopify Admin > Settings > Notifications
3. **Test Checkout**: Periodically test the checkout flow to ensure it's working

### Troubleshooting

**Products not showing on website?**
- Run the sync function again
- Check that products are "Active" in Shopify
- Verify environment variables are set correctly

**Checkout not working?**
- Verify `SHOPIFY_STOREFRONT_TOKEN` is set
- Check that products have variants with inventory
- Look at browser console for errors

**Inventory not updating automatically?**
- Check webhook status in Shopify Admin
- Verify `SHOPIFY_WEBHOOK_SECRET` matches in both places
- Check Supabase Edge Function logs for errors

## Cost Breakdown

- **Shopify Basic Plan**: $39/month (includes unlimited products, 2 staff accounts, reports)
- **Shopify Payments**: 2.9% + 30¢ per transaction (no monthly fee)
- **SMS Marketing**: Pay per message sent (optional)
- **Email Marketing**: 10,000 free emails/month, then paid

## Support Resources

- Shopify Help Center: https://help.shopify.com
- Shopify Community: https://community.shopify.com
- Your integration uses Shopify API 2024-01: https://shopify.dev/docs

## Next Steps

1. Add all your products to Shopify
2. Configure shipping rates in Shopify
3. Set up payment providers (Shopify Payments recommended)
4. Customize your Shopify checkout page (optional)
5. Set up email marketing campaigns
6. Enable SMS notifications
7. Monitor your analytics dashboard

Your site now has enterprise-level ecommerce capabilities while maintaining custom features for events, catering, and STEM programs!
