import React from 'react'

const Home:React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to Our Home Page!</h1>
      <p style={{ fontSize: '1.5rem' }}>
        We hope you're ready for some laughs and light-hearted fun. 😊
      </p>
      <div style={{ margin: '2rem 0' }}>
        {/* <img
          src={funnyImage1}
          alt="Funny Illustration 1"
          style={{ width: '300px', borderRadius: '15px', margin: '1rem' }}
        /> */}
        {/* <img
          src={funnyImage2}
          alt="Funny Illustration 2"
          style={{ width: '300px', borderRadius: '15px', margin: '1rem' }}
        /> */}
      </div>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>
        Enjoy exploring the site and remember to keep smiling!
      </p>
    </div>

  )
}

export default Home;