import { makeStyles } from '@mui/styles'
import Header from '../components/Header'
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

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}))

function Home({ posts }) {
  const classes = useStyles()
  return (
    <>
      <Header />
      <main>
        <Container className={classes.cardGrid} maxwidth="lg">
          <Grid container spacing={2}>
            {console.log(posts)}

            {posts.map((post) => (
              <Link key={post.id} href={'/'}>
                {/* using 6 columns for each card when screen extra small - i.e. 2 cards.
            12 column system.
            */}
                <Grid item xs={6} sm={4} md={3}>
                  <Card className={classes.card} elevation={0}>
                    <CardMedia></CardMedia>
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
export async function getStaticProps() {
  try {
    const res = await axios.get('https://peacock-store.herokuapp.com/api/')
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
