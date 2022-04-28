import { makeStyles } from '@mui/styles'
import React from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Head from 'next/head'
import { Box, Container, Grid, Hidden, Paper } from '@mui/material'
import { gql } from '@apollo/client'
import client from '../api/apolloClient'

// Note file name to signify dynamic page.

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
  },
  paperImagePreview: {
    paddingTop: 30,
  },
  paperImage: {
    padding: theme.spacing(0),
    marginLeft: 25,
    ['@media (max-width:600px)']: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  paperRight: {
    padding: theme.spacing(0),
    paddingLeft: 40,
    paddingTop: 30,
    ['@media (max-width:600px)']: {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  img: {
    maxWidth: '100%',
  },
}))

const Product = ({ categories, data }) => {
  const classes = useStyles()
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Header categories={categories} />
      <Container maxWidth="md">
        <Grid container spacing={0}>
          <Hidden only={['xs', 'sm']}>
            <Grid item sm={1}>
              <Paper className={classes.paperImagePreview} elevation={0}>
                {data.productImage.map((image, id) => (
                  <div key={id}>
                    <Paper className={classes.paperImage} elevation={0}>
                      <img
                        src={image.image}
                        alt={image.altText}
                        className={classes.img}
                      />
                    </Paper>
                  </div>
                ))}
              </Paper>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperImage} elevation={0}>
              <img
                src={data.productImage[0].image}
                alt={data.productImage[0].altText}
                className={classes.img}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paperRight} elevation={0}>
              <Box component="h1" fontSize={18} fontWeight={400}>
                {data.title}
              </Box>
              <Box component={'p'} fontSize={22} fontWeight={900} m={0}>
                £{data.regularPrice}
              </Box>
              <Box component={'p'} fontSize={14} m={0}>
                Free Delivery for Peacock Members
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

/* 
As NextJS is a server side rendering framework,when we make a dynamic page it is unable to prebuild it as it doesn't 
know what to build. This is where we use getStaticPaths(). You only need to put one path in manually.
*/

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'matthias' } }],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  try {
    // const res = await axios.get(
    //   `https://peacock-store.herokuapp.com/api/${params.slug}`
    // )
    // const post = res.data
    // This is how to pass data between pages.
    // const ress = await axios.get(
    //   'https://peacock-store.herokuapp.com/api/category/'
    // )
    // const categories = ress.data
    // include it in the props and import it within Home above.

    // specifies that slug is a variable and must be a string, and then uses it in the query.

    const productData = gql`
      query ($slug: String!) {
        allProductsByName(slug: $slug) {
          id
          title
          description
          regularPrice
          productImage {
            id
            image
            altText
          }
        }
      }
    `

    const categories = await client.query({
      query: gql`
        query Categories {
          allCategories {
            id
            name
            slug
          }
        }
      `,
    })
    console.log(categories)

    const slug = params.slug
    const { data } = await client.query({
      query: productData,
      variables: {
        slug,
      },
    })

    return {
      props: {
        data: data.allProductsByName,
        categories: categories.data.allCategories,
      },
    }
  } catch (err) {
    console.log(err)
  }
}

export default Product
