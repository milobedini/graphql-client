import { makeStyles } from '@mui/styles'
import Header from '../components/Header'

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { gql } from '@apollo/client'
import Link from 'next/link'
import client from './api/apolloClient'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '140%', // 16:9;
  },
}))

function Home({ categories, data }) {
  const classes = useStyles()
  return (
    <>
      <Header categories={categories} />
      <main>
        <Container className={classes.cardGrid} maxwidth="lg">
          <Grid container spacing={2}>
            {data.map((post) => (
              <Link
                key={post.id}
                href={`product/${encodeURIComponent(post.slug)}`}
              >
                {/* using 6 columns for each card when screen extra small - i.e. 2 cards.
            12 column system.
            */}
                <Grid item xs={6} sm={4} md={3}>
                  <Card className={classes.card} elevation={0}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.productImage[0]?.image}
                      alt={post.productImage[0]?.altText}
                    />
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {post.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        £{post.regularPrice}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  )
}
export async function getStaticProps() {
  try {
    // const res = await axios.get('https://peacock-store.herokuapp.com/api/')
    // const posts = res.data

    // This is how to pass data between pages.
    // const ress = await axios.get(
    //   'https://peacock-store.herokuapp.com/api/category/'
    // )
    // const categories = ress.data
    // include it in the props and import it within Home above.

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

    // GraphQL query, simply copy across from iQL:
    const { data } = await client.query({
      query: gql`
        query allProducts {
          allProducts {
            id
            title
            description
            regularPrice
            slug
            productImage {
              id
              image
              altText
            }
          }
        }
      `,
    })

    console.log(categories)
    return {
      props: {
        data: data.allProducts,
        categories: categories.data.allCategories,
      },
    }
  } catch (err) {
    console.log(err)
  }
}

export default Home
