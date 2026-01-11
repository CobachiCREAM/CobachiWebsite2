import { useEffect, useRef } from 'react';

interface ShopifyBuyButtonProps {
  productId: string;
  variantId?: string;
}

export default function ShopifyBuyButton({ productId }: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Shopify Buy Button script
    const script = document.createElement('script');
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.async = true;

    script.onload = () => {
      if (window.ShopifyBuy && containerRef.current) {
        const client = window.ShopifyBuy.buildClient({
          domain: 'YOUR-STORE.myshopify.com', // REPLACE THIS
          storefrontAccessToken: 'YOUR-STOREFRONT-API-TOKEN' // REPLACE THIS
        });

        window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
          ui.createComponent('product', {
            id: productId,
            node: containerRef.current,
            options: {
              product: {
                styles: {
                  button: {
                    'background-color': '#8B4513',
                    ':hover': {
                      'background-color': '#6B3410'
                    }
                  }
                },
                contents: {
                  img: true,
                  title: true,
                  price: true,
                  options: true,
                  quantity: true,
                  button: true
                }
              },
              cart: {
                styles: {
                  button: {
                    'background-color': '#8B4513',
                    ':hover': {
                      'background-color': '#6B3410'
                    }
                  }
                }
              },
              toggle: {
                styles: {
                  toggle: {
                    'background-color': '#8B4513',
                    ':hover': {
                      'background-color': '#6B3410'
                    }
                  }
                }
              }
            }
          });
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [productId]);

  return <div ref={containerRef}></div>;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ShopifyBuy: any;
  }
}
