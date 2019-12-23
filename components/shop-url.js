import React, { useState } from 'react'
import { Button, Form, TextField } from '@shopify/polaris'

const ShopUrl = ({ onSubmit }) => {
  const [shopUrl, setShopUrl] = useState('');

  return (<div>
    <Form onSubmit={() => onSubmit(shopUrl)}>
      <div className='shop-url'>
        <TextField
          label='Store shopUrl'
          type='text'
          placeholder='my-shop.myshopify.com'
          value={shopUrl}
          onChange={setShopUrl}
        />
      </div>
      <Button primary submit size="large">Login</Button>
    </Form>
  </div>
  )
}

export default ShopUrl
