import React from 'react'
import ShopUrl from '../../components/shop-url'
import { redirectToShopifyAuth } from '../../client/shopify-client'
import withAppLayout from '../../components/with/app-layout'

const AppLogin = () => {
  const handleShopUrl = async (shopUrl) => {
    await redirectToShopifyAuth(shopUrl);
  }

  return (
    <div className="hero">
      <h1 className="title">Connect with your Shopify account</h1>

      <div className="row">
        <ShopUrl onSubmit={handleShopUrl} />
      </div>
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}</style>
    </div>
  );
}

export default withAppLayout(AppLogin)