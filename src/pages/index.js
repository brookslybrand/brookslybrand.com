import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>This is my website</h1>
    <p>There is nothing here. Why are you here?</p>
    <p>Checkout some pages I didn't make:</p>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    <p style={{ marginTop: "2rem" }}>I did make this, it's very nice</p>
    <Link to="/a-post/">Check it out</Link>
  </Layout>
)

export default IndexPage
