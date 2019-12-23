import React from 'react'
import withAppLayout from '../../components/with/app-layout'

const AppHome = (props) => (
  <div>
    <div className="hero">
      <h1 className="title">{props.title}</h1>
      <pre>{JSON.stringify(props)}</pre>
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
      `}</style>
    </div>
  </div>
)

export default withAppLayout(AppHome);