import { makeStyles } from '@mui/styles'
import Header from '../../components/Header'
import axios from 'axios'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

function Home({ posts }) {
  const classes = useStyles()

  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <main>
        <Container className={classes.cardGrid} maxwidth="lg">
          <Grid container spacing={2}>
            {posts.map((post) => (
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
                      image={post.product_image[0]?.image}
                      alt={post.product_image[0]?.alt_text}
                    />
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {post.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        £{post.regular_price}
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

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'shoes' } }],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(
      `https://peacock-store.herokuapp.com/api/category/${params.slug}`
    )
    const posts = res.data
    return {
      props: {
        posts,
      },
    }
  } catch (err) {
    console.log(err)
  }
}

export default Home
